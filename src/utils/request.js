import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getRequestKey, removePending, checkPending, pending } from './requestOptimize'

const service = axios.create({
  baseURL: 'http://localhost:8080/admin',
  timeout: 100000
})

// 请求拦截器：在发送请求之前进行处理
service.interceptors.request.use(
  config => {
    // 将请求数据转换为 JSON 格式
    config.headers['Content-Type'] = 'application/json'
    config.data = JSON.stringify(config.data)

    // 配置token
    const authToken = localStorage.getItem('authToken')
    // console.log('token' + authToken)
    if (authToken) {
      config.headers.authToken = authToken
    }

    if (config.url !== '/login' && !store.state.user.token) {
      router.push('/login')
      // 返回一个Promise，确保拦截器返回一个有效的配置对象
      // !!!此处要加上 config 不然报错 Cannot read properties of undefined (reading 'cancelToken')
      return Promise.resolve(config)
    }

    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?'
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName]
        const part = encodeURIComponent(propName) + '='
        if (value || value === false) {
          if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
              const params = propName + '[' + key + ']'
              const subPart = encodeURIComponent(params) + '='
              url += subPart + encodeURIComponent(value[key]) + '&'
            }
          } else {
            url += part + encodeURIComponent(value) + '&'
          }
        }
      }
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }

    // 计算当前请求key值
    const key = getRequestKey(config)
    if (checkPending(key)) {
      // 重复请求则取消当前请求
      return Promise.reject(new Error('重复请求'))
    } else {
      // 加入请求字典
      pending[key] = true
    }

    return config
  },
  error => {
    // 处理请求错误
    return Promise.reject(error)
  })

// 响应拦截器：在收到响应之后进行处理
service.interceptors.response.use(
  response => {
    // 请求完成，删除请求中状态
    const key = getRequestKey(response.config)
    removePending(key)

    // 处理响应数据
    if (response.data.code === 1) {
      return response
    }

    return response
  },
  error => {
    // 处理网络错误
    if (error.request.timeout >= 100000) {
      router.push('/500')
      error.message = '请求超时'
    }
    // 请求完成，删除请求中状态
    if (error.config) {
      const key = getRequestKey(error.config)
      removePending(key)

      // 请求响应中的config的url会带上代理的api需要去掉
      if (error.config.url) {
        error.config.url = error.config.url.replace('/api', '') // 确保去掉代理的部分
      }
    }

    // 处理错误
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          router.push('/login')
          break
        case 405:
          error.message = '请求错误'
          break
        case 500:
          error.message = '服务器错误'
          break
        default:
          error.message = '未知错误'
      }
    }

    return Promise.reject(error)
  })

export default service

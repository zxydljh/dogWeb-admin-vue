import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8080/admin',
  timeout: 600000
})

// 请求拦截器：在发送请求之前进行处理
service.interceptors.request.use(config => {
  // 将请求数据转换为 JSON 格式
  config.headers['Content-Type'] = 'application/json'
  config.data = JSON.stringify(config.data)
  return config
}, error => {
  // 处理请求错误
  console.error('request 请求失败:', error)
  return Promise.reject(error)
})

export default service

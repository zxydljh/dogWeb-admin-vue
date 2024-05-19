import { login, logout, updateEmployeePassword } from '@/api/employee'
import { ElMessage } from 'element-plus'

const state = {
  token: localStorage.getItem('authToken') || '',
  id: '',
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  async login ({ commit }, userInfo) {
    return await login(userInfo)
      .then((res) => {
        const data = res.data
        // console.log(data)
        if (data.code === 1) {
          commit('SET_TOKEN', data.data.token)
          localStorage.setItem('authToken', data.data.token)
          // console.log('login:' + state.token)

          commit('SET_ID', data.data.id)
          commit('SET_NAME', data.data.name)
          commit('SET_AVATAR', data.data.avatar)
          commit('SET_ROLES', data.data.roles)
          return true
        } else {
          ElMessage.error('登录失败：' + data.msg)
          return false
        }
      })
  },
  async logout ({ commit }) {
    return await logout()
      .then(res => {
        const data = res.data
        if (data.code === 1) {
          commit('SET_TOKEN', '')
          localStorage.removeItem('authToken')

          commit('SET_ID', '')
          commit('SET_NAME', '')
          commit('SET_AVATAR', '')
          commit('SET_ROLES', [])
          return true
        } else {
          ElMessage.error('退出失败')
          return false
        }
      })
  },
  async updatePassword ({ commit }, userInfo) {
    return await updateEmployeePassword(state.id, userInfo)
      .then(res => {
        const data = res.data
        if (data.code === 1) {
          ElMessage.success('密码修改成功')
          return true
        } else {
          ElMessage.error('密码修改失败：' + data.msg)
          return false
        }
      })
  }
}
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}

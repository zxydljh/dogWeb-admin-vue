import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8080/admin',
  timeout: 600000
})

export default service

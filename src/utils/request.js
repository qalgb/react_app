import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
});
// 拦截器
request.interceptors.request.use(
  (config) => {
    // config: 请求的所有信息
    /* if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    } */
    return config
  }
)
request.interceptors.response.use(
  // 响应成功 200-299
  (response) => {
    // 请求成功、响应成功不代表功能成功
    if (response.code === 20000) {
      return response.data.data
    } else {
      return Promise.reject(response.data.message)
    }
  },
  // 响应失败 非2xx
  (error) => {
    if (error.message) {
      // 服务器返回响应，但是响应失败
      // 401(未授权) 403(禁止访问) 404(请求地址写错，未找到)
      if (error.message.status === 401) {}
    } else {
      // 服务器不返回响应：请求超时或网络错误
    }
  }
)

export default request;
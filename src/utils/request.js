import axios from 'axios'

const messages = {
  401: '没有权限',
  403: '禁止访问',
  404: '找不到地址'
}

const request = axios.create({
  baseURL: '/',
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
    if (response.data.code === 20000) {
      return response.data.data
    } else {
      return Promise.reject(response.data.message)
    }
  },
  // 响应失败 非2xx
  (error) => {
    let message = '未知错误，请联系管理员解决~'
    if (error.response) {
      // 服务器返回响应，但是响应失败
      // 401(未授权) 403(禁止访问) 404(请求地址写错，未找到)
      if (messages[error.response.status]) {
        message = messages[error.response.status]
      }
    } else {
      // 服务器不返回响应：请求超时或网络错误
      if (error.message.indexOf('NetWork Error')) {
        message = '暂无网络，请连接网络'
      } else if (error.message.indexOf('timeout')) {
        message = '网络延迟，请连接wifi'
      }
    }
    return Promise.reject(message)
  }
)

export default request;
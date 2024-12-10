import request from '../request'
// 当前登录用户信息
export function getUserInfo(params) {
  return request.get('/account/info', params)
}
// 全局 调用api方式
export function apiFc(parameters) {
  return request.apiFc(parameters)
}
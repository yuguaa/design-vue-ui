import service from './axios'
import { jsonToFormData } from '@/utils/util'
export default {
  get: function(url, params) {
    return service.get(url, {
      params: params
    })
  },
  post: function(url, params, headers) {
    return service.post(url, params, {
      headers: headers || { 'Content-Type': 'application/json;charset=UTF-8' }
    })
  },
  put: function(url, params) {
    return service.put(url, params)
  },
  delete: function(url, params) {
    return service.delete(url, params)
  },
  postForm(url = '', params = undefined) {
    const parameters = {
      url,
      method: 'post'
    }
    parameters['data'] = params
    parameters['headers'] = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
    return service(parameters)
  },
  // 常规的，不一定是这个，等后台固定了，我们这个上传文件和postForm就可以设置固定好了，暂定义这样
  uploadFile(url = '', params = undefined) {
    params = params ? jsonToFormData(params) : null
    const parameters = {
      url,
      method: 'post'
    }
    parameters['data'] = params
    parameters['headers'] = {
      'Content-Type': 'multipart/form-data;charset=utf-8'
    }
    return service(parameters)
  },
  apiFc(parameters) {
    return service(parameters)
  }
}

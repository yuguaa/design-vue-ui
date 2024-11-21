import axios from 'axios'
import Vue from 'vue'
// 创建axios实例

const service = axios.create({
  baseURL: '/demo/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

/* request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return errorFc(error.response)
  }
)
/* request拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  (response) => {
    return resultFc(response)
  },
  (error) => {
    return errorFc(error.response)
  }
)
// 节后统一数据结构返回
function resultFc(res = {}) {
  const errorCodes = [404, 500, 502]
  const loginCode = [403, 401]
  if (errorCodes.includes(res.data?.code)) {
    errorTips(res.data?.message || '网络开小差了')
  }

  if (loginCode.includes(res.data?.code)) {
    loginTip(res.data?.message)
  }
  var _data = {
    ...res?.data,
    code: res.data?.code || '',
    data: res.data?.data || '',
    message: res.message || res.data?.message || '网络开小差了',
  }
  return _data
}

function errorFc(res = {}) {
  const defaultMessage = '网络开小差了，请重试'
  if (res.status === 401 || res.status === 403) {
    loginTip(res.data?.message || defaultMessage)
  } else errorTips(res.data?.message || defaultMessage)
  return {
    code: res.status || '',
    message: res.message || res.data?.message || res.statusText,
    data: '',
  }
}

function errorTips(message) {
  destroyAll()
  Vue.prototype.$resSubmit(200, 'error', message)
}
// 未登录提示
function loginTip(message) {
  destroyAll() // 销毁所有的弹框  原因在于可能同时两个或多个接口在调用进入该方法
  Vue.prototype.$warning({
    title: '该用户暂无权限',
    content: (h) => (
      <div>
        <p style="color: red;">{message}</p>
      </div>
    ),
    icon: (h) => <a-icon type="exclamation-circle" />,
    okText: '重新登录',
    onOk: () => {},
  })
}

function destroyAll() {
  Vue.prototype.$destroyAll()
}
export default service

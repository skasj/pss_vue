// 配置API接口地址
var root = 'http://localhost:8090/bysj/pss'
// 引用axios
var axios = require('axios')
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/*
  接口处理函数
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios (method, url, params, headers, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    headers: headers,
    url: url,
    data: method === 'POST' || method === 'PUT' ? JSON.stringify(params) : null,
    params: method === 'GET' || method === 'DELETE' ? JSON.stringify(params) : null,
    baseURL: root,
    withCredentials: false,
    emulateJSON: false
  })
    .then(function (res) {
      if (res.data.success === true) {
        if (success) {
          success(res.data)
        }
      } else {
        if (failure) {
          failure(res.data)
        } else {
          window.alert('error: ' + JSON.stringify(res.data))
        }
      }
    })
    .catch(function (err) {
      let res = err.response
      if (err) {
        window.alert('api error, HTTP CODE: ' + res.status)
      }
    })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, headers, success, failure) {
    return apiAxios('GET', url, params, headers, success, failure)
  },
  post: function (url, params, headers, success, failure) {
    return apiAxios('POST', url, params, headers, success, failure)
  },
  put: function (url, params, headers, success, failure) {
    return apiAxios('PUT', url, params, headers, success, failure)
  },
  delete: function (url, params, headers, success, failure) {
    return apiAxios('DELETE', url, params, headers, success, failure)
  }
}

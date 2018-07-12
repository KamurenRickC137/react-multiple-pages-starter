/**
 * http ajax post方法
 * @author zido
 * @since 2017/6/3 0003
 */
import objToQuery from './objToQuery'
import HttpHeader from './HttpHeader'
import loadScript from './loadScript'
export const defaultReject = (err, showError) => {
  let msg
  switch (err.code) {
    case -1:
      msg = '服务器异常'
      break
    default:
      msg = '未知错误，code:' + err.code
      break
  }
  if (process
    .env
    .NODE_ENV.trim() == 'development') {
    console.error(err)
  }
  if (msg && showError) {
    alert(msg) //TODO change it
  }
  return msg
}
/**
 * create http promise.
 * @param {string | object} url the url or options
 * @param {object} param1 options 
 */
export const createHttpPromise = async (url, {
  data, //请求体
  headers, //http请求头
  method, //http请求方式
  errorHandler, //错误处理器，非必须
  expectedCodes, //某些code可能包含特殊行为，代码中可写入这些code自行处理
  showError,
  sync,
}) => {
  if (window.fetch) {
    await loadScript('https://cdn.bootcss.com/fetch/2.0.4/fetch.min.js')
  }
  if (window.Promise) {
    await loadScript('https://cdn.bootcss.com/es6-promise/4.1.1/es6-promise.auto.min.js')
  }
  if (typeof url !== 'string') {
    data = url.data
    headers = url.headers || HttpHeader
    method = url.method || 'POST'
    url = url.url
    errorHandler = url.errorHandler || defaultReject
    expectedCodes = url.expectedCodes || []
    sync = url.sync || false
  } else {
    headers = headers || HttpHeader
    method = method || 'POST'
    errorHandler = errorHandler || defaultReject
    expectedCodes = expectedCodes || []
    sync = url.sync || false
  }
  if (headers['Content-Type'] && headers['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1) {
    data = objToQuery(data)
  } else if (!(data instanceof FormData)) {
    data = data && JSON.stringify(data)
  }
  showError = showError === false ? false : true
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      headers: headers,
      body: data,
      credentials: 'include',
    }).then((response) => {
      const contentType = response.headers.get('content-type')
      if (response.ok && contentType && contentType.indexOf('application/json') !== -1)
        return response.json()
      if (!response.ok) {
        return {
          success: false,
          code: -response.status,
        }
      }
      return {
        success: false,
        code: -1, //服务器异常
      }
    }).then((json) => {
      /**
       * response body data like {
       *  success:true/false,
       *  code:number,
       *  data:object //this data will return for u
       * }
       */
      if (json.success) {
        resolve(json.data)
      } else if (expectedCodes.some(value => value == json.code)) {
        reject(json)
      } else {
        //TODO 默认异常处理
        json.msg = errorHandler(json, showError)
        reject(json)
      }
    }).catch(err => {
      errorHandler(err, showError)
    })
  })
}
export default createHttpPromise
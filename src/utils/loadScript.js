import { resolve } from "uri-js";

export default (url, callback) => {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  if (typeof (callback) != 'undefined') {
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null
          callback()
        }
      }
    } else {
      script.onload = function () {
        callback()
      }
    }
  } else {
    return new Promise(resolve => {
      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState == 'loaded' || script.readyState == 'complete') {
            script.onreadystatechange = null
            resolve()
          }
        }
      } else {
        script.onload = function () {
          resolve()
        }
      }
    })
  }
  script.src = url
  document.body.appendChild(script)
}
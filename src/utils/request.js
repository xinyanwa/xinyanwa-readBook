import { showToast } from '../api/wechat'

function CreateFly() {
  if (mpvuePlatform === 'wx') {
    /* const Fly = require('flyio/dist/npm/wx') */
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  }
  return null
}

function handleError(err) {
  console.log(err)
}

export function get(url, param = {}) {
  const fly = new CreateFly()
  if (fly) {
    return new Promise((resolve, reject, showError = true) => {
      fly.get(url, param).then(response => {
        if (response && response.data && response.data.error_code === 0) {
          console.log(response)
          resolve(response)
        } else {
          if (showError) {
            const msg = (response && response.data && response.data.msg) || '请求失败'
            showToast(msg)
          }
          reject(response)
        }
      }).catch(err => {
        handleError(err)
        reject(err)
      })
    })
  }
}

export function post(url, param = {}) {
  const fly = new CreateFly()
  if (fly) {
    return new Promise((resolve, reject, showError = true) => {
      fly.post(url, param).then(response => {
        if (response && response.data && response.data.error_code === 0) {
          console.log(response)
          resolve(response)
        } else {
          if (showError) {
            const msg = (response && response.data && response.data.msg) || '请求失败'
            mpvue.showToast({
              title: msg,
              duration: 2000
            })
          }
          reject(response)
        }
      }).catch(err => {
        handleError(err)
        reject(err)
      })
    })
  }
}

/**
 * flyio的小程序版本，作为一个http请求！flyio能够进行全局请求监听和拦截
 * 1、获取fly实列，然后进行引用
 * 2、handleError表示调用出错时候的信息！！异常处理
 * 3、处理get请求，返回的是一个promise对象！
 * 4、下面的post请求和get请求一样
 * 5、有个点，我们可以直接在这里判断确保一定得到请求结果！就不用在组件中引用的时候做code校验
 * @param url
 * @param param
 * @returns {Promise<unknown>}
 */

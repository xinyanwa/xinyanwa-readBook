/**
 * 1、首先我们是export一个函数，函数里面有三个参数，但是两个回调参数一个饥饿收参数
 * 2、我们先调用小程序的getsetting方法来判断小程序是否被授权，是我么就成功，成功时候会回调onsuccess方法
 * 3、失败会调用fail方法，此时以经发生异常，所以会进入1全局异常处理，
 * 4、但是登入失败我们会回调onFail方法！！！
 * @param auth
 * @param onSuccess
 * @param onFail
 */
import { getOpenId } from './index'

export function getSetting(auth, onSuccess, onFail) {
  mpvue.getSetting({
    success(res) {
      console.log(res)
      if (res.authSetting[`scope.${auth}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail(res) {
      console.log(res) // 直接抛出全局异常处理
    }
  })
}

/**
 * 1、函数是获取用户信息函数，有两个方法回调，，成功会执行onsuccess方法，失败执行onFail方法
 * 2、函数里调用的是微信官方提供的获取用户信息方法
 * 3、会在onsuccess里面获取到一个userinfo字段
 * @param onSuccess
 * @param onFail
 */
export function getUserInfo(onSuccess, onFail) {
  mpvue.getUserInfo({
    success(res) {
      // console.log(res)
      const {userInfo} = res
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail(res) {
      console.log(res) // 进入全局异常处理页面
    }
  })
}

export function authorize(onSuccess, onFail) {
  mpvue.authorize({
    scope: 'scope.userInfo',
    success(res) {
      console.log(res)
      if (res) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail(res) {

    }
  })
}

/**
 * 1、缓存指定的key中的对应的data数据
 * @param key
 * @param data
 */
export function setStorageSync(key, data) {
  mpvue.setStorageSync(key, data)
}

/**
 * 1、这里调用了getstorageSync方法，返回了对应的key中的data数据
 * @param key
 * @returns {*}
 */
export function getStorageSync(key) {
  return mpvue.getStorageSync(key)
}

/**
 * 1、调用微信的login方法，来进行获取到用户code，进一步获取到openid
 */
export function getUserOpenId(callback) {
  mpvue.login({
    success(res) {
      if (res.code) {
        const {code} = res
        // console.log(code)
        getOpenId(code).then(response => {
          // console.log(response)
          const {data: {data: {openid}}} = response
          setStorageSync('openId', openid)
          callback && callback(openid)
        }).catch(err => {
          console.log(err) // 进入全局异常处理
        })
      } else {
        console.log(res)
      }
    },
    fail(res) {
      console.log(res) // 进入全局处理状态
    }
  })
}

/**
 * 1、两个方法都是有关交互的，第一个是数据没有显示的时候，有一个数据正在加载中的样式
 * 2、第二个是数据加载完成后，会进行隐藏第一个提示消息！
 * @param title
 */
export function showLoading(title) {
  mpvue.showLoading({
    title,
    mask: true
  })
}

export function hideLoading() {
  mpvue.hideLoading()
}

/**
 * 用来显示弹层，我认为可以继续完善一下这里
 * @param title
 */
export function showToast(title) {
  mpvue.showToast({
    title: title,
    duration: 2000
  })
}

/**
 * 动态显示上面微信的标题的api
 * @param title
 */
export function setNavigationBarTitle(title) {
  mpvue.setNavigationBarTitle({title})
}

/*
export function showModal(title, content){
  mpvue.showModal({
    title: '提示',
    content: '这是一个模态弹窗',
    success (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
} */

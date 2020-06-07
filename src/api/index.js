import { get, post } from '../utils/request'

const API_URL = 'https://test.youbaobao.xyz:18081'
const APP_ID = 'wx720575a61cfff989'
const APP_SECRET = '48eb67b8d19980bd90a45e4752b4bf56'

export function getHomeData(param) {
  return get(`${API_URL}/book/home/v2`, param)
}

export function recommend() {
  return get(`${API_URL}/book/home/recommend/v2`)
}

export function freeRead() {
  return get(`${API_URL}/book/home/freeRead/v2`)
}

export function hotBook() {
  return get(`${API_URL}/book/home/hotBook/v2`)
}

/**
 * 1、首先引入get方法，我们之前编辑好的
 * 2、创建一个常量，便于我们管理地址！
 * 3、进行获取，因为get方法返回的是一个promise对象，所以我们可以直接将他返回出去！
 * 4、定义三个方法，分别是get去请求，然后获取到的数据进行返回
 */

export function getOpenId(code) {
  return get(`${API_URL}/openId/get`, {
    appId: APP_ID,
    secret: APP_SECRET,
    code
  })
}

/**
 * 1、这个函数用来注册用户信息，在数据库中形成一条记录，并且进行查询
 * @param openId
 * @param userInfo
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function register(openId, userInfo) {
  return post(`${API_URL}/user/register`, {
    openId,
    platform: mpvuePlatform,
    ...userInfo
  })
}

/**
 * 这里是获取关键词搜索的aip请求
 * @param param
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function search(param) {
  return get(`${API_URL}/book/search`, param)
}

/**
 * 获取热门关键词api
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function hostSearch() {
  return get(`${API_URL}/book/hot-search`)
}

/**
 * 这个api是获取书籍的数据的
 * @param param
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function bookDetail(param) {
  return get(`${API_URL}/book/detail`, param)
}

/**
 * 这个api是获取书籍评分的
 * @param param
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function bookRankSave(param) {
  return get(`${API_URL}/book/rank/save`, param)
}

/**
 * 获取图书目录的api
 * @param param
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function bookContents(param) {
  return get(`${API_URL}/book/contents`, param)
}

/**
 * 这个是获取书架存储状态的api
 * @param param
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function bookShelfGet(param) {
  return get(`${API_URL}/book/shelf/get`, param)
}

/**
 * 这个api是加入书架的api
 * @param param
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function bookShelfSave(param) {
  return get(`${API_URL}/book/shelf/save`, {
    shelf: JSON.stringify(param)
  })
}

/**
 * 请求移除书架调用的api接口
 * @param param
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function bookShelfRemove(param) {
  return get(`${API_URL}/book/shelf/remove`, {
    shelf: JSON.stringify(param)
  })
}

/**
 * 这个api用来获取图书分类里面的书籍的接口的
 * @param param
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function bookSearchList(param) {
  return get(`${API_URL}/book/search-list`, param)
}

/**
 * 这个是用来获取全部图书分类的接口
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function categoryList() {
  return get(`${API_URL}/book/category/list/v2`)
}

/**
 * 用来获取用户加入天数
 * @param param
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function getUserDay(param) {
  return get(`${API_URL}/user/day`, param)
}

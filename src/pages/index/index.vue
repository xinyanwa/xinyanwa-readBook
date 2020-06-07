<template>
    <div>
        <div v-if="isAuth">
            <SearchBar
                    :hot-search="hotSearch"
                    @onClick="onSearchBarClick"
                    disable
            />
            <home-card @onClick="onHomeBookClick" :data="homeCard"/>
            <home-banner
                    @onClick="onBannerClick"
                    img="http://www.youbaobao.xyz/book/res/bg.jpg"
                    sub-title="点击查看"
                    title="心言哇小程序读书准备上线啦！"
            />
            <div style="margin-top: 23px">
                <home-book
                        :col="3"
                        :data="recommend"
                        :row="1"
                        @onBookClick="onBookClick"
                        @onMoreClick="recommendChange('recommend')"
                        btn-text="换一批"
                        mode="col"
                        title="为你推荐"
                />
            </div>
            <div style="margin-top: 23px">
                <home-book
                        :col="2"
                        :data="freeRead"
                        :row="2"
                        @onBookClick="onBookClick"
                        @onMoreClick="recommendChange('freeRead')"
                        btn-text="换一批"
                        mode="row"
                        title="免费阅读"
                />
            </div>
            <div style="margin-top: 23px">
                <home-book
                        :col="4"
                        :data="hotBook"
                        :row="1"
                        @onBookClick="onBookClick"
                        @onMoreClick="recommendChange('hotBook')"
                        btn-text="换一批"
                        mode="col"
                        title="当前最热"
                />
            </div>
            <div style="margin-top: 23px">
                <home-book
                        :col="2"
                        :data="category"
                        :row="4"
                        @onBookClick="onCateroryClick"
                        @onMoreClick="onCategoryMoreClick"
                        btn-text="查看全部"
                        mode="category"
                        title="分类"
                />
            </div>
        </div>
        <Auth v-if="!isAuth" open-type="getUserInfo"/>
    </div>
</template>

<script>
    import SearchBar from '../../components/home/SearchBar'
    import HomeCard from '../../components/home/HomeCard'
    import HomeBanner from '../../components/home/HomeBanner'
    import HomeBook from '../../components/home/HomeBook'
    import { freeRead, getHomeData, hotBook, recommend, register } from '../../api/index'
    import {
      getSetting,
      getUserInfo,
      authorize,
      setStorageSync,
      getStorageSync,
      getUserOpenId,
      showLoading, hideLoading
    } from '../../api/wechat'
    import Auth from '../../components/base/Auth'

export default {
      data() {
        return {
          hotSearch: '',
          homeCard: {},
          shelf: [],
          banner: {},
          recommend: [],
          freeRead: [],
          hotBook: [],
          category: [],
          isAuth: true
        }
      },
      components: {
        Auth,
        HomeBook,
        HomeBanner,
        SearchBar,
        HomeCard
      },
      methods: {
        onCateroryClick(book) {
          this.$router.push({
            path: '/pages/list/main',
            query: {
              key: 'categoryId',
              title: book.category,
              text: book.categoryText
            }
          })
        },
        onHomeBookClick(book) {
          this.$router.push({
            path: '/pages/detail/main',
            query: {
              fileName: book.fileName
            }
          })
        },
        init() {
          this.getSetting()
        },
        getAuthorize() {
          authorize()
        },
        getUserInfo() {
          const onOpenIdComplete = (openId, userInfo) => {
            this.getHomeData(openId, userInfo)
            register(openId, userInfo)
          }
          getUserInfo((userInfo) => {
            // console.log(userInfo)
            setStorageSync('userInfo', userInfo)
            const openId = getStorageSync('openId')
            // console.log(openId)
            if (!openId || openId.length === 0) {
              getUserOpenId(openId => onOpenIdComplete(openId, userInfo))
            } else {
              onOpenIdComplete(openId, userInfo)
            }
          },
          () => {
            console.log('onFaile....')
          })
        },
        getSetting() {
          getSetting('userInfo',
            () => {
              // console.log('成功')
              this.isAuth = true
              showLoading('正在加载中')
              this.getUserInfo()
            },
            () => {
              // console.log('失败')
              this.isAuth = false
              this.getSetting()
            }
          )
        },
        getHomeData(openId, userInfo) {
          getHomeData({openId}).then(response => {
            const {
              data: {
                hotSearch: {
                  keyword
                },
                shelf,
                banner,
                recommend,
                freeRead,
                hotBook,
                category,
                shelfCount
              }
            } = response.data
            console.log(keyword, shelf, banner, recommend, freeRead, hotBook, category, shelfCount)
            this.hotSearch = keyword
            this.shelf = shelf
            this.banner = banner
            this.recommend = recommend
            this.freeRead = freeRead
            this.hotBook = hotBook
            this.category = category
            this.homeCard = {
              bookList: shelf,
              num: shelfCount,
              userInfo
            }
            hideLoading()
          }
          ).catch(error => {
            console.log('捕获异常', error)
            hideLoading()
          })
        },
        onSearchBarClick() {
          // 跳转到搜索页面
          this.$router.push({
            path: '/pages/search/main',
            query: {
              hotSearch: this.hotSearch
            }
          })
        },
        onBannerClick() {
          console.log('Banner Click....')
        },
        onBookClick(book) {
          console.log('Book Click...')
          this.$router.push({
            path: '/pages/detail/main',
            query: {
              fileName: book.fileName
            }
          })
        },
        onCategoryMoreClick() {
          // console.log('MoreClick...')
          this.$router.push({
            path: '/pages/categoryList/main'
          })
        },
        recommendChange(key) {
          switch (key) {
            case 'recommend': recommend().then((response) => {
              this.recommend = response.data.data
            })
              break
            case 'freeRead': freeRead().then((response) => {
              this.freeRead = response.data.data
            })
              break
            case 'hotBook': hotBook().then((response) => {
              this.hotBook = response.data.data
            })
              break
          }
        }
      },
      mounted() {
        // this.init()
        this.getSetting()
      }
    }
</script>

<style lang="scss" scoped>

</style>
<!--
    1、这里由于没有提前去做文稿的解释，所以可能讲的没有那么详细
    2、首先是引入组件，然后再去使用组件，
    3、由于我们从组件中传递了值进去，所以组件也要相应的接受那些值
    4、我们在组件中调用了this.$emit()方法把组件中的事件传递给父组件，父组件就要相应的去接受那个值，然后在进行处理
    5，这里我们通过一个getHomeData方法进行获取到的值，然后在将值逐步赋值到各个数据里面，就完成了首页的渲染
    6、我们进行登入的时候，封装了一个函数getSetting；这个函授用来判断是否登入状态的；
    7.这个函数我们写在了wechat里面！！！
    8、言而总之，总而言之；学习是没有限度的；
    9、判断登录状态没有登录后，进行让用户登录；
    10、登录后我们会调用getuserinfo方法进行获取用户数据，并且使用缓存getStorageSync将他缓存下来
    11、之后我们在获取用户的openid，通过wx。loading方法进行获取唯一的code，在通过code在获取到用户的openid；
    12、获取到用户的信息后，我们会发起一个register请求，请求去在服务器上注册自己的信息，下次登录的时候就可以进行查询
    13、之后我们再进行一个交互，让他在加载数据的时候显示正在加载中
    14、我认为这个地方有点难度，有时候一个点弄不清，后面的理都理不顺
    15、还有一个很重要的问题，就是写代码的时候，经常单词拼写错误，这也造成了有时候会有bug
    16、里面的getaauthorize本来是用来获取用户授权，但发现api中介绍，如果button写了open-type="getUserInfo"就是默认为授权，所以后面我就没有加上去
    17、至于那个init，本来是想初始化的时候调用，然后getstting里面不进行在调用，但是发现，如果你点授权后，并不会调用ssuccess方法，不知道是不是我的问题，所以我对代码进行了一些需要消耗cpu的操作；
    18、这种操作会造成死循环，所以，如果有大佬解决了，可以和我说下！！！
-->

<!--
<template>
  <div>
    <span class="span">
      Hello Word
    </span>
    <van-button @click="handleClickGet" type="primary">发起get请求按钮</van-button>
    <van-button @click="handleClickPost" type="primary">发起post请求按钮</van-button>
    <van-button @click="handle" type="primary">按钮</van-button>
  </div>
</template>

<script>
  import { get, post } from '../../utils/request'

  /**
   * push这种方法会保存访问记录
   * replace方法不会保存访问记录
   */
  export default {
    methods: {
      handle() {
        this.$router.push('/pages/index/main')
      },
      handleClickGet() {
        get('https://www.baidu.com').then(response => {
          console.log('我发起的是get请求')
        })
      },
      handleClickPost() {
        post('https://www.baidu.com').then(response => {
          console.log('我发起的是post请求')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .span {
    color: deepskyblue;
    font-size: 20px;
    font-weight: bold;
  }
</style>
-->

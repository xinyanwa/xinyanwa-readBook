<template>
    <div>
        <SearchBar ref="searchBar" :focus="searchFocus" :hot-search="hotSearchKeyword" @onConfirm="onConfirm" @onChange="onChange" @onClear="onClear"/>
        <TagGroup :value="historySearch" @onBtnClick="clearHistorySearch" @onTagClick="searchKeyWord" btn-text="清空"
                  header-text="历史记录" v-if="historySearch.length > 0 && !showList"/>
        <TagGroup :value="hotSearchArray" @onBtnClick="changeHotSearch" @onTagClick="showBookDetail" btn-text="换一批"
                  header-text="热门搜索" v-if="hotSearchArray.length > 0 && !showList"/>
        <SearchList :data="searchList" v-if="showList"/>
    </div>
</template>

<script>
    import SearchBar from '../../components/home/SearchBar'
    import TagGroup from '../../components/base/TagGroup'
    import SearchList from '../../components/search/SearchList'
    import { getStorageSync, setStorageSync, showToast } from '../../api/wechat'
    import { hostSearch, search } from '../../api'

    const KEY_HISTORY_SEARCH = 'historySearch'

export default {
      name: '',
      computed: {
        /**
         * 判断是都为空，使用键值的方式来判断
         * @returns {boolean}
         */
        showList() {
          const keys = Object.keys(this.searchList)
          return keys.length > 0
        },
        hotSearchArray() {
          const _hotSearch = []
          this.hotSearch.forEach(o => {
            _hotSearch.push(o.title)
          })
          return _hotSearch
        }
      },
      data() {
        return {
          hotSearch: [],
          historySearch: [],
          searchList: {},
          searchFocus: true,
          openId: '',
          hotSearchKeyword: [],
          page: 1
        }
      },
      components: {
        SearchList,
        TagGroup,
        SearchBar
      },
      methods: {
        onConfirm(keyword) {
          // 判断是否有关键词，没有获取关键词
          // 通过热门词发起请求，或者发起关键词请求
          if (!keyword || keyword.trim().length === 0) {
            keyword = this.hotSearchKeyword
            this.$refs.searchBar.setValue(keyword)
          } else {}
          this.onSearch(keyword)
          if (!this.historySearch.includes(keyword)) {
            this.historySearch.push(keyword)
            setStorageSync(KEY_HISTORY_SEARCH, this.historySearch)
          }
          this.searchFocus = false
          // console.log('11111', this.searchFocus)
        },
        onClear() {
          this.searchList = {}
        },
        changeHotSearch() {
          this.hostSearch()
        },
        showBookDetail(text, index) {
          console.log('showBookDetail', text, index)
        },
        clearHistorySearch() {
          this.historySearch = []
          setStorageSync(KEY_HISTORY_SEARCH, [])
        },
        searchKeyWord(text) {
          this.$refs.searchBar.setValue(text)
          this.onSearch(text)
        },
        onChange(keyWord) {
          this.searchFocus = true
          this.page = 1
          if (!keyWord || keyWord.trim().length === 0) {
            this.searchList = {}
            return
          }
          this.onSearch(keyWord)
        },
        onSearch(keyWord) {
          search({
            keyword: keyWord, openId: this.openId, page: this.page
          }).then(response => {
            this.searchList = response.data.data
          }).catch((err) => {
            console.log(err)
          })
        },
        hostSearch() {
          hostSearch().then(response => {
            this.hotSearch = response.data.data
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      mounted() {
        this.openId = getStorageSync('openId')
        this.hostSearch()
        this.hotSearchKeyword = this.$route.query.hotSearch
        this.historySearch = getStorageSync(KEY_HISTORY_SEARCH) || []
      },
      onPageScroll() {
        if (this.searchFocus) {
          this.searchFocus = false
        }
        const keyword = this.$refs.searchBar.getValue()
        if (!this.historySearch.includes(keyword)) {
          this.historySearch.push(keyword)
          setStorageSync(KEY_HISTORY_SEARCH, this.historySearch)
        }
      },
      onReachBottom() {
        if (this.showList) {
          this.page++
          const searchWord = this.$refs.searchBar.getValue()
          search({
            keyword: searchWord, openId: this.openId, page: this.page
          }).then(response => {
            const {book} = response.data.data
            if (book && book.length > 0) {
              this.searchList.book.push(...book)
            } else {
              showToast('已加载全部')
            }
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
</style>

<!--
    1、此组件是集成搜索组件，所以有一个搜索框，还有一个历史搜索和热门搜索
    2、还有一个展示图书的组件
    3、showList是判断serachList对象是否为空
    4、有一个搜索框关键词组件，会实时获取关键词
    5、调用了一个获取书记的api，然后将searchlist赋值
    6、调用了一个热门关键词aip、，hostSearch；然后将绑定的到的值赋值给组件value
    7、有一个参数，就是通过路由的方法冲地址中取到值，换我来思考，就是、通过vuex全局状态管理来获取到值
    8、没有想过还可以通过路由的方法来获取到传入参数的值
    9、判断一个对象是不是为空，通过Object。keys的方法来判断
    10、showList是展示list表是否为空
    11、hotSearchArray是用来获取热门关键词，通过对hotSearch的循环，来尽情push到新的一个数组里进行返回
    12、这里定义了七个数值，hotSearch是用来储存热门关键词的，historySearch是用来存储历史记录的，searchList是用来存储图书列表页面，searchFocus是用来点击进入获取光标，openId用来获取openid，hotSearchKeyWord，用来获取热门关键词的意思，page是请求图书api时候进行翻页
    13、onConfirm中接受了一个keyword，用来发起请求，想判断是不是为空，然后发起请求，通过Dom对象动态设置1搜索框的值，其中还会调用onSearch组件，并将值传入，然后会判断搜索框的值是不是存在，不存在会写入到历史记录中，存在会不写入，这里调用的是我们在微信里面的定义的setStorageSync；
    14、onCliear是将页面图书的数据清空，
    15、changeHotSearch会直接调用hostSearch，也就是发起请求，然后更换图书
    16、showBookDetail方法，是会点击图书然后进入到图书详情页
    17、clearHistorySearch是清除历史记录，这里会做两件事，一件事是将现在的历史记录置空，还有一件事就是将缓存中的数据进行清空
    18、searchKeyWord是当手机按下搜索键盘的时候，会将手机上的字通过dom来绑定到搜索框中，然后在发起获取图书请求
    19、onChange是单机的时候，然后会把光标置为true，让page初始化，在判断keyword是不是为空，初始化图书列表页面，在掉调用onSearch发起获取图书请求
    20、onSearch不用说了把，他就是发起图书请求，然后将searchList赋值
    21、hostSearch是发起热门关键词请求
    22、生命周期mounted中，主要是获取openid，还有获取热门关键词，在将主页的热门关键词通过路由的方式传递进来，在获取到历史关键词，会调用一个微信的api，叫做onPageScroll，判断用户是否下滑，判断光标是不是true状态是的话我们会将光标置为false，判断历史关键词是不是包含这个关键词，不是我们会将她写入到历史关键词中
    23、还会调用一个微信的api，onReachBottom是用来判断用户是不是滑倒1最底下，是的话进行触发，并且将searchlist进行扩展吗，然后如果调用的api请求不到数据的时候我们就会调用一个弹窗组件，展示已加载全部
    24、整体逻辑就是这样，不过，大的框架好做，但是有些意细节要慢慢的去感受，这样才能更完美
-->

<template>
    <div>
        <SearchTable :data="data"/>
    </div>
</template>

<script>
    import SearchTable from '../../components/search/SearchTable'
    import { bookSearchList } from '../../api'
    import { setNavigationBarTitle, showToast } from '../../api/wechat'
export default {
      name: 'list',
      components: {SearchTable},
      data() {
        return {
          data: [],
          page: 1
        }
      },
      methods: {
        getBookCategory() {
          const {title, key} = this.$route.query
          console.log(key, title)
          const param = {}
          if (key && title) {
            param[key] = title
          }
          param.page = this.page
          // console.log(param)
          bookSearchList(param).then(response => {
            const {data} = response.data
            // console.log(response)
            if (data.length === 0) {
              showToast('已加载全部书籍')
            } else {
              this.data.push(...data)
            }
          })
        }
      },
      mounted() {
        this.page = 1
        this.getBookCategory()
        const {text} = this.$route.query
        setNavigationBarTitle(text)
      },
      onReachBottom() {
        this.page++
        this.getBookCategory()
      }
    }
</script>

<style lang="scss" scoped>

</style>

<!--
    1、这个列表复用了1searchTable组件
    2、通过路由取出标题和键值，然后在加入到param中去请求获取图书分类api
    3、通过触底函数onReachBottom来触发page自动增加，再去请求图书api
    4、在通过浅拷贝的方式，去判断是否还能得到数据，在进行拷贝到自己上，进行展示
    5、要是没有数据，则会进行调用微信的api方法，进行提示
-->

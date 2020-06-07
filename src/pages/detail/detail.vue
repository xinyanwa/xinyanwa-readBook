<template>
    <div>
        <DetailBook :book="getBookDateList"/>
        <DetailStat v-if="getBookDateList" :bookData="getBookDateList"/>
        <DetailRate :onRateChange="onRateChange" :book-data="getBookDateList"/>
        <DetailContents :contents="this.detailContent" @readBook="readBook"/>
        <DetailBottom :is-in-shelf="isInShelf" @readBook="readBook" @handleShelf="handleShelf"/>
    </div>
</template>

<script>
    import DetailBook from '../../components/detail/DetailBook'
    import { getStorageSync } from '../../api/wechat'
    import { bookContents, bookDetail, bookRankSave, bookShelfGet, bookShelfRemove, bookShelfSave } from '../../api'
    import DetailStat from '../../components/detail/DetailStat'
    import DetailRate from '../../components/detail/DetailRate'
    import DetailContents from '../../components/detail/DetailContents'
    import DetailBottom from '../../components/detail/DetailBottom'
export default {
      components: {DetailBottom, DetailContents, DetailRate, DetailStat, DetailBook},
      data() {
        return {
          bookDate: {},
          detailContent: Array,
          isInShelf: false
        }
      },
      computed: {
        getBookDateList() {
          if (Object.keys(this.bookDate).length) {
            return this.bookDate
          }
        }
      },
      methods: {
        getBookData() {
          const openId = getStorageSync('openId')
          const {fileName} = this.$route.query
          // console.log('11111', openId, fileName)
          if (openId && fileName) {
            bookDetail({
              openId,
              fileName
            }).then(response => {
              this.bookDate = response.data.data
            }).catch((err) => {
              console.log(err)
            })
          }
        },
        onRateChanage(value) {
          const openId = getStorageSync('openId')
          const {fileName} = this.$route.query
          bookRankSave({openId, fileName, value}).then(() => {
            this.getBookData()
          })
        },
        getBookContents() {
          const {fileName} = this.$route.query
          bookContents({fileName}).then(response => {
            this.detailContent = response.data.data
            return this.detailContent
            // console.log(2333333, this.detailContent)
          })
        },
        readBook(value) {
          const query = {
            fileName: this.bookDate.fileName,
            opf: this.bookDate.opf
          }
          if (value) {
            const index = value.indexOf('/')
            if (index >= 0) {
              query.navigation = value.slice(index + 1)
            } else {
              query.navigation = value
            }
            query.navigation = value
          }
          if (this.bookDate && this.bookDate.fileName) {
            this.$router.push({
              path: '/pages/read/main',
              query
            })
          }
          console.log(value)
        },
        handleShelf() {
          const openId = getStorageSync('openId')
          const {fileName} = this.$route.query
          if (!this.isInShelf) {
            bookShelfSave({openId, fileName}).then(() => {
              this.getBookShelf()
            }).catch((err) => {
              console.log(err)
            })
          } else {
            const vue = this
            mpvue.showModal({
              title: '提示',
              content: `确定要从书架中移除《${this.bookDate.title}》这本书吗`,
              success (res) {
                if (res.confirm) {
                  bookShelfRemove({openId, fileName}).then(() => {
                    vue.getBookShelf()
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            /* bookShelfRemove({openId, fileName}).then(() => {
              this.getBookShelf()
            }).catch(err => {
              console.log(err)
            }) */
          }
        },
        getBookShelf() {
          const openId = getStorageSync('openId')
          const {fileName} = this.$route.query
          bookShelfGet({fileName, openId}).then(response => {
            const {data} = response.data
            data.length === 0 ? this.isInShelf = false : this.isInShelf = true
          })
        }
      },
      mounted() {
        this.getBookData()
        this.getBookContents()
        this.getBookShelf()
      }
    }
</script>

<style lang="scss" scoped>
</style>

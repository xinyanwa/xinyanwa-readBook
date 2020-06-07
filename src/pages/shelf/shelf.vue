<template>
    <div>
        <ShelfUserInfo :user-info="userInfo" :read-day="userDay" :num="bookList.length-1"/>
        <ShelfList :shelf-list="bookList"/>
    </div>
</template>

<script>
    import ShelfUserInfo from '../../components/shelf/shelfUserInfo'
    import { getStorageSync } from '../../api/wechat'
    import { bookShelfGet, getUserDay } from '../../api'
    import ShelfList from '../../components/shelf/shelfList'
export default {
      name: 'shelf',
      data() {
        return {
          userInfo: Object,
          userDay: 0,
          bookList: Array
        }
      },
      onShow() {
        this.userInfo = getStorageSync('userInfo')
        const openId = getStorageSync('openId')
        getUserDay({openId}).then(response => {
          this.userDay = response.data.data.day
          // console.log(123456, response)
        })
        bookShelfGet({openId}).then(response => {
          this.bookList = response.data.data
          this.bookList.push({})
        })
      },
      components: {ShelfList, ShelfUserInfo}
    }
</script>

<style lang="scss" scoped>

</style>

<template>
    <div>
        <HomeBook
                :show-title="false"
                :show-btn="false"
                :row="category.length/2"
                :col="2"
                :data="category"
                mode="category"
                @onBookClick="onBookClick"
        />
    </div>
</template>

<script>
    import HomeBook from '../../components/home/HomeBook'
    import { categoryList } from '../../api'
export default {
      name: 'categoryList',
      components: {HomeBook},
      data() {
        return {
          category: []
        }
      },
      methods: {
        getCategoryList() {
          categoryList().then(response => {
            this.category = response.data.data
          })
        },
        onBookClick(book) {
          this.$router.push({
            path: '/pages/list/main',
            query: {
              key: 'categoryId',
              title: book.category,
              text: book.categoryText
            }
          })
        }
      },
      mounted() {
        this.getCategoryList()
      }
    }
</script>

<style lang="scss" scoped>

</style>

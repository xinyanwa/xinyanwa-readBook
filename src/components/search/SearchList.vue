<template>
    <div class="search-list-wrapper">
        <SearchItem icon="apps-o" :title="category" sub-title="Category" v-if="category" @onClick="showList(category, 'category')"/>
        <SearchItem icon="user-o" :title="author" sub-title="Author" v-if="author" @onClick="showList(author, 'author')"/>
        <SearchItem icon="newspaper-o" :title="publisher" sub-title="Publisher" v-if="publisher" @onClick="showList(publisher, 'publisher')"/>
        <SearchTable :data="data.book" @onClick="onBookClick"/>
    </div>
</template>

<script>
    import SearchItem from './SearchItem'
import SearchTable from './SearchTable'
export default {
      name: 'SearchList',
      props: {
        data: {
          type: Object
        }
      },
      components: {SearchTable, SearchItem},
      computed: {
        category() {
          if (this.data && this.data.category && this.data.category.length > 0) {
            return this.data.category[0].categoryText
          } else {
            return null
          }
        },
        author() {
          if (this.data && this.data.author && this.data.author.length > 0) {
            return this.data.author[0].author
          } else {
            return null
          }
        },
        publisher() {
          if (this.data && this.data.publisher && this.data.publisher.length > 0) {
            return this.data.publisher[0].publisher
          } else {
            return null
          }
        }
      },
      methods: {
        showList(title, key) {
          console.log(title, key)
          this.$router.push({
            path: '/pages/list/main',
            query: {
              title,
              key,
              text: title
            }
          })
          console.log(title, key)
        },
        onBookClick(book) {
          console.log(book)
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>

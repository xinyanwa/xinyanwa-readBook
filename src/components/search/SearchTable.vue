<template>
    <div class="search-table-wrapper">
        <div class="search-table-inner" v-for="(book, index) in data" :key="index" @click="onClick(book)">
            <div class="search-table-book">
                <div class="search-table">
                    <div class="book-img-wrapper">
                        <div class="book-img">
                             <ImageView :src="book.cover"/>
                        </div>
                    </div>
                </div>
                <div class="book-info-wrapper">
                    <div class="book-title">{{book.title}}</div>
                    <div class="book-author">{{book.author}}</div>
                    <div class="book-category">{{book.categoryText}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ImageView from '../base/ImageView'
export default {
      name: 'SearchTable',
      components: {ImageView},
      props: {
        data: {
          type: Array,
          default: []
        }
      },
      methods: {
        onClick(book) {
          this.$emit('onClick', book)
          this.$router.push({
            path: '/pages/detail/main',
            query: {
              fileName: book.fileName
            }
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
    .search-table-wrapper{
        padding: 0 16px;
        .search-table-inner{
            .search-table-book {
                margin: 14.5px 0;
                display: flex;
                align-items: center;
                .search-table {
                    .book-img-wrapper {
                        .book-img{
                            width: 47px;
                            height: 68.5px;
                        }
                    }
                }
            }
            .book-info-wrapper{
                margin-left: 14.5px;
                width: 70%;
                .book-title{
                    width: 100%;
                    color: #333;
                    font-size: 16px;
                    line-height: 22.5px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 500;
                }
                .book-author{
                    color: rgba(0,0,0,.65);
                    font-size: 13px;
                    margin-top: 5px;
                    line-height: 18px;
                }
                .book-category{
                    color: rgba(0,0,0,.45);
                    font-size: 13px;
                    line-height: 18px;
                }
            }
        }
    }
</style>

<!--
    1、首先是定义了一个书的图片
    2、之后就是书名，作者，还有就是分类
    3、点击后有个事件，向外传递书名
    4、还有就是用到了flex布局
    5、从外接受一个数组，数组用for循环输出！！！
-->

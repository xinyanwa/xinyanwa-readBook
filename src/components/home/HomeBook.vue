<template>
    <div class="home-book">
        <div class="home-book-header" v-if="showTitle">{{title}}</div>
        <div class="home-book-content">
            <div :key="index" class="home-book-row" v-for="(item,index) in bookData">
                <div :key="bookIndex" :style="{flex:'0 0 '+ (100/col) + '%'}" class="home-book-col"
                     v-for="(book,bookIndex) in item"
                >
                    <div
                            class="book-wrapper"
                            :style="{flexDirection: mode === HOME_BOOK_MODE.COL ? 'column' : 'row'}"
                            @click="onBookClick(book)"
                            v-if="mode === HOME_BOOK_MODE.COL || mode === HOME_BOOK_MODE.ROW"
                    >
                        <ImageView :src="book.cover"/>
                        <div class="book-title-wrapper book-title-col" v-if="mode === HOME_BOOK_MODE.col">
                            <div class="book-title">{{book.title}}</div>
                        </div>
                        <div class="book-title-wrapper book-title-row" v-else>
                            <div class="book-title">{{book.title}}</div>
                            <div class="book-title-author-wrapper">
                                <div class="book-title book-author">{{book.author}}</div>
                                <div class="book-title book-author">{{book.categoryText}}</div>
                            </div>
                        </div>
                    </div>
                    <div
                            v-else
                            class="category-wrapper"
                            @click="onBookClick(book)"
                    >
                        <div class="category-text">{{book.text}}</div>
                        <div class="category-num">{{book.num}}本书</div>
                        <div class="category-img-wrapper">
                            <div class="category-img1">
                                <ImageView :src="book.cover"/>
                            </div>
                            <div class="category-img2">
                                <ImageView :src="book.cover2"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-book-footer" v-if="showBtn" @click="onMoreClick">
            <van-button round custom-class="home-book-btn">{{btnText}}</van-button>
        </div>
    </div>
</template>

<script>
    import { HOME_BOOK_MODE, CATEGORY } from '../../utils/const'
    import ImageView from '../base/ImageView'

    export default {
      components: {ImageView},
      mounted() {
        // console.log(this.bookData)
      },
      name: 'HomeBook',
      props: {
        title: {
          type: String,
          default: ''
        },
        data: {
          type: Array,
          default: []
        },
        btnText: {
          type: String,
          default: ''
        },
        row: {
          type: Number,
          default: 0
        },
        col: {
          type: Number,
          default: 1
        },
        mode: {
          type: String,
          default: HOME_BOOK_MODE.ROW
        },
        showTitle: {
          type: Boolean,
          default: true
        },
        showBtn: {
          type: Boolean,
          default: true
        },
        linearBg: {
          type: Boolean,
          default: true
        }
      },
      computed: {
        HOME_BOOK_MODE() {
          return HOME_BOOK_MODE
        },
        bookData() {
          const {row, col, data} = this
          if (data && data.length > 0) {
            data.forEach(book => {
              book.text = CATEGORY[book.categoryText.toLowerCase()]
            })
            const number = row * col
            const _bookData = data.slice(0, number)
            const _bookDataRow = []
            let _row = 0
            while (_row < row) {
              _bookDataRow.push(_bookData.slice(_row * col, _row * col + col))
              _row++
            }
            return _bookDataRow
          } else {
            return []
          }
        }
      },
      methods: {
        onMoreClick() {
          // 点击换一批按钮事件
          this.$emit('onMoreClick')
          // console.log('1111')
        },
        onBookClick(book) {
          // 点击图书事件
          this.$emit('onBookClick', book)
          // console.log('2222')
        }
      }
    }
</script>

<style lang="scss" scoped>
    .home-book {
        .home-book-header {
            padding: 13px 0 0 20.5px;
        }

        .home-book-content {
            padding: 0 20px;
            margin-top: 10.5px;
            .home-book-row {
                display: flex;
                flex-flow: nowrap;
                margin-top: 12px;
                .home-book-col {
                    padding: 0 8px;
                    box-sizing: border-box;
                    .book-wrapper {
                        display: flex;
                        .book-title-wrapper {
                            &.book-title-col {
                                .book-title {
                                    font-size: 12px;
                                    color: #212731;
                                    line-height: 16.5px;
                                    max-height: 33px;
                                    font-weight: 500;
                                    word-break: break-word;
                                    overflow: hidden;
                                }
                            }
                            &.book-title-row{
                                flex: 0 0 50%;
                                padding: 10px;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                .book-title{
                                    font-size: 14px;
                                    color: #1f1f1f;
                                    line-height: 18px;
                                    max-height: 36px;
                                    overflow: hidden;
                                    word-break: break-word;
                                }
                                .book-author{
                                    font-size: 12px;
                                    color: #868686;
                                    line-height: 14px;
                                    max-height: 14px;
                                }
                            }
                        }
                    }
                    .category-wrapper{
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        background: #F8F9FB;
                        border-radius: 10px;
                        height: 96px;
                        padding: 13px 0 14.5px 16px;
                        box-sizing: border-box;
                        justify-content: space-between;
                        .category-text{
                            color: #212832;
                            width: 150px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-size: 16px;
                            line-height: 22.5px;
                        }
                        .category-num{
                            color: #868686;
                            font-size: 12px;
                            line-height: 16.5px;
                        }
                        .category-img-wrapper{
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            .category-img1{
                                position: absolute;
                                width: 48px;
                                right: 0;
                                bottom: -5px;
                                z-index: 100;
                            }
                            .category-img2{
                                position: absolute;
                                width: 36px;
                                right: 30px;
                                bottom: -5px;
                                z-index: 90;
                            }
                        }
                    }
                }
            }
        }

        .home-book-footer {
            padding: 12px 20px 20px;
        }
    }
</style>
<style lang="scss">
    .category-img1{
        img{
            border-radius: 0 0 10px 0;
        }
    }
    .home-book-footer {
        .home-book-btn{
            width: 100%;
            font-size: 14px;
            color: #3696EF;
            border: 1px solid #edeeee;
        }
    }
</style>

<!--
    1、这个东西内容有点多
    2、首先是定义好了大体框架，homebookheader是定义好了标题
    3、害定义了一个映射管理组件
    4、还动态的计算要放书的数量，一开始还有点懵逼！！
    5、发现那个算法就是选择书，然后算出要基本书，然后进行截取和存放，实话实说，这个算法有覅你东西！！
    6、title是标题
    7、data是书的数据
    8、btntext是按钮文本
    9、row是指定的行数
    10、col是指定的列数
    11、mode是指定的显示模式；值有row，按行显示；col，按列显示，category按分类显示
    12、showTitle是否显示标题
    13、showBtn 是否显示按钮
    14、linearBg是否显示背景图片
    15，这里面主要难的就是那个计算属性，让我懵逼
    16、这此主要是对样式的编写以及对怎样去适应列和行布局进行了判断1
    17、判断之后在进行编写样式，注意
    18、注意，抽空找个时间真正学习flex布局
    19、flex布局真的有用！！！！！
    20、通过这次学学习，我似乎还是啥都没学到！！！
    21、首页正式开发完全，下一个就是api授权开发了
    22、准备期待！！！

-->

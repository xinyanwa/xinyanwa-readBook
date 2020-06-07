<template>
    <div class="home-card">
        <div class="home-card-inner">
            <div class="user-info">
                <div class="avatar-wrapper">
                    <ImageView
                            :src="avatar"
                            round
                    />
                </div>

                <div class="nickname">{{nickname}}</div>
                <div class="shelf-text">书架共有{{bookList.length}}本好书</div>
                <div class="round-item"></div>
                <div class="shelf-text">特别精选</div>
            </div>
            <div class="book-info">
                <div class="book-wrapper">
                    <div :key="index" class="book-img-wrapper" v-for="(item,index) of bookList"  @click="onBookClick(item)" >
                        <ImageView
                                :src="item.cover"/>
                    </div>
                </div>
                <div class="shelf-wrapper" @click="gotoShelf">
                    <div class="shelf">书架</div>
                    <van-icon
                            class="arrow"
                            color="#828489"
                            name="arrow"
                            size="11px"
                    />
                </div>
            </div>
            <div @click="onFeedBackClick" class="feedback-wrapper">反馈</div>
        </div>
        <van-dialog id="van-dialog"/>
    </div>
</template>

<script>
    import ImageView from '../base/ImageView'
    import Dialog from 'vant-weapp/dist/dialog/dialog'

export default {
      name: 'HomeCard',
      components: {ImageView},
      props: {
        data: Object,
        hasSign: {
          type: Boolean,
          default: false
        },
        signDay: {
          type: Number,
          default: 0
        }
      },
      computed: {
        avatar() {
          return (this.data && this.data.userInfo && this.data.userInfo.avatarUrl) || ''
        },
        nickname() {
          return (this.data && this.data.userInfo && this.data.userInfo.nickName) || ''
        },
        bookList() {
          return (this.data && this.data.bookList) || []
        }
      },
      methods: {
        gotoShelf() {
          this.$router.push('/pages/shelf/main')
        },
        onBookClick(book) {
          this.$emit('onClick', book)
        },
        sign() {
        },
        onFeedBackClick() {
          Dialog.confirm({
            title: '反馈',
            message: '你确认提交反馈信息吗？',
            confirmButtonText: '是',
            cancelButtonText: '否'
          }).then(() => {
            // console.log('点击是之后的事件')
          }).catch(() => {
            // console.log('点击否的事件')
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
    .home-card {
        background-image: linear-gradient(-90deg, #54575F 0%, #595B60 100%);
        border-radius: 15px;
        margin: 22px 20px 0;

        .home-card-inner {
            position: relative;
            padding: 21.5px 17px 20px 20px;
            box-sizing: border-box;

            .user-info {
                display: flex;
                align-content: center;

                .avatar-wrapper {
                    width: 20px;
                    height: 20px;
                }

                .nickname, .shelf-text {
                    font-size: 12px;
                    color: #fff;
                }

                .nickname {
                    margin: 0 8.5px;
                }

                .shelf-text {
                    opacity: .7;
                }

                .round-item {
                    width: 4px;
                    height: 4px;
                    background: #a2a2a2;
                    border-radius: 50%;
                    margin: 6px 8px 0px 8px;
                }
            }

            .book-info {
                display: flex;
                margin-top: 16.5px;

                .book-wrapper {
                    display: flex;
                    flex: 1;
                    justify-content: space-around;

                    .book-img-wrapper {
                        width: 72px;
                        height: 101px;
                    }
                }

                .shelf-wrapper {
                    display: flex;
                    align-items: center;

                    .shelf {
                        width: 11px;
                        font-size: 11px;
                        word-break: break-word;
                        color: #fff;
                        opacity: .8;
                    }
                }
            }

            .feedback-wrapper {
                position: absolute;
                top: 19.5px;
                right: 0;
                border-radius: 100px 0 0 100px;
                width: 44.5px;
                height: 23.5px;
                line-height: 23.5px;
                text-align: center;
                // opacity: .3;
                background: #707070;
                font-size: 11px;
                color: #fff;
            }
        }
    }
</style>


<!--
    1、home-card-inner是用来撑开这个div，这个div据上一个div有边距
    2、user-info是用来写用户信息；book-info是用来写图书信息；feedback-wrapper是用来写八分反馈组件，准备使用绝对定位！！
    3、data是界面需要展示的信息，其中包括userinfo（用户信息），booklist（图书列表），num（书架图书数量）
    4、hasSign今天是否签到！！！！signDay连续签到天数
    5、gotoShelf是跳转到书架页面
    6、onBookClick是点击图书事件，跳转图书详情页
    7、sign签到的事件
    8、关于引用图片地址，需要在前面加上斜杠。。。。
    9、这个flex布局不是很理想，回去可以加强练习！
    10、css这方面不是很精通!!!
    11、word-break: break-word；用来换行
    12、两端对齐，justify-content；然后可以选值
    13、dialog是确认弹出框，有标题，内容，还有确认和取消
-->

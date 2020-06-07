<template>
    <div class="home-banner" @click="onClick">
        <div
                class="bg-img"
                :style="{backgroundImage: onBannerImg}"
        >
            <div class="title">{{title}}</div>
            <div class="sub-title">{{subTitle}}</div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'HomeBanner',
      computed: {
        onBannerImg() {
          return 'url(' + this.img + ')'
        }
      },
      props: {
        title: {
          type: String,
          default: ''
        },
        subTitle: {
          type: String,
          default: ''
        },
        img: {
          type: String,
          default: ''
        }
      },
      methods: {
        onClick() {
          this.$emit('onClick')
        }
      }
    }
</script>

<style lang="scss" scoped>
    .home-banner{
        margin-top: 20px;
        padding: 0 20px;
        .bg-img{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 125px;
            border-radius: 10px;
            background-size: cover;
            // background-size: 100% 100%;
            // background-repeat: no-repeat;
            .title{
                font-size: 18px;
                font-weight: 500;
                color: #fff;
            }
            .sub-title{
                padding: 5px 15px;
                background: #4585ff;
                border: 1px solid #ccc;
                border-radius: 50px;
                margin-top: 10px;
                font-size: 14px;
                color: #fff;
            }
        }
    }
</style>


<!--
    1、首先，要明白这个组件要传啥值进去，进行编写！！
    2、有title：标题；subTitle副标题还有img图片
    3、要明白向外传递一个事件,由外城调用！！！
    4、动态绑定的时候加字符串不好用，就可以用计算属性先进行计算！！
    5、背景的backgeround可以直接用cover来撑开全屏
    6、我啦肚子了！！！！！
-->

<template>
    <div class="image-view">
        <img
                :class="round ? 'round image' : 'image' "
                :style="{ height }"
                :src="src"
                :mode="mode"
                :lazy-load="lazyLoad"
                @load="onLoad"
                @error="onError"
                v-show="!isLoading && !error"
        />
        <img
                :class="round ? 'round image' : 'image'"
                :style="{ height }"
                src="/static/tggdsb.jpg"
                :mode="mode"
                :lazy-load="lazyLoad"
                v-show="isLoading || error"
        />
    </div>
</template>

<script>
    export default {
      name: 'ImageView',
      props: {
        src: {
          type: String,
          default: ''
        },
        mode: {
          type: String,
          default: 'widthFix'
        },
        lazyLoad: {
          type: Boolean,
          default: true
        },
        round: {
          type: Boolean,
          default: false
        },
        height: {
          type: String,
          default: 'auto'
        }
      },
      watch: {
        src(newValue, preValue) {
          if (newValue && newValue.length > 0 && newValue !== preValue) {
            this.$nextTick(() => {
              this.isLoading = true
              this.error = false
            })
          }
        }
      },
      data() {
        return {
          isLoading: true,
          error: false
        }
      },
      methods: {
        onClick() {
          this.$emit('onClick')
        },
        onLoad() {
          this.isLoading = false
          this.error = false
          // console.log('onLoad')
        },
        onError() {
          this.isLoading = false
          this.error = true
          // console.log('onError')
        }
      }
    }
</script>

<style lang="scss" scoped>
    .image-view{
        width: 100%;
        .image{
            width: 100%;
            &.round{
                border-radius: 50%;
            }
        }
    }
</style>

<!--
    1、src为图片地址
    2、mode为图片伸缩模式，默认值给的是自适应宽度
    3、lazyload为是否开启图片懒加载
    4、round为是否为圆形图片
    5、图片高度，听说炒鸡重要
    5、watch监听src的变化
    6、isLoading：图片是否处于加载中；error：图片加载失败
    7、onClick事件是点击图片触发；onLoad事件是图片加载完成调用函数；onErron是图片出错时候调用的函数
    8、图片占位符是下面一个img标签，大体和上面的img标签一样，就是图片的地址是一个相同的图片
    9、子组件要父组件传值，就直接写，我刚刚错写成绑定的形式；
    10、组件要变圆形，只要有round标签，都给设置bord-radius  &。round
    11、展现用v-show，而不用v-if。这里用v-if似乎展现不出来！！
-->

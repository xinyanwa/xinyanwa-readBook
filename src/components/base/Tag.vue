<template>
    <div class="tag-wrapper" @click="onClick">
        <div class="tag">
            {{text}}
        </div>
    </div>
</template>

<script>
    export default {
      name: 'Tag',
      props: {
        text: {
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
    .tag-wrapper{
        display: flex;
        justify-content: center;
        background: #f7f7f9;
        border-radius: 16px;
        width: 100%;
        box-sizing: border-box;
        .tag{
            font-size: 14px;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #21273e;
        }
    }
</style>

<!--
    1、这个组件是用来写文字的，就是搜索里面的热门文字
    2、里面会有一个点击事件，触发的时候，会向外传递一个onclick方法
    3、里面接受一个从外面传进来的参数
-->

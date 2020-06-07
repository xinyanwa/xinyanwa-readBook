<template>
    <div class="tag-group-wrapper">
        <div class="tag-group-header">
            <div class="header-text">{{headerText}}</div>
            <div class="header-btn" @click="onBtnClick">{{btnText}}</div>
        </div>
        <div class="tag-group">
            <div class="tag-group-inner" v-for="(text,index) in value" :key="index" @click="onTagClick(text,index)">
                <Tag :text="text"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Tag from './Tag'
export default {
      name: 'TagGroup',
      components: {Tag},
      props: {
        headerText: String,
        btnText: String,
        value: Array
      },
      methods: {
        onTagClick(text, index) {
          this.$emit('onTagClick', text, index)
        },
        onBtnClick() {
          this.$emit('onBtnClick')
        }
      }
    }
</script>

<style lang="scss" scoped>
    .tag-group-wrapper{
        margin-top: 35px;
        padding-bottom: 10px;
        width: 100%;
        .tag-group-header{
            display: flex;
            justify-content: space-between;
            padding: 0 16px;
            font-size: 14px;
            line-height: 20px;
            .header-text{
                color: #333;
            }
            .header-btn{
                color: #3696EF;
            }
        }
        .tag-group{
            display: flex;
            width: 100%;
            box-sizing: border-box;
            flex-flow: row wrap;
            padding: 4px 10px 0 10px;
            .tag-group-inner{
                max-width: 100%;
                box-sizing: border-box;
                padding: 12px 6px 0 6px;
            }
        }
    }
</style>
<!--
    1、首先是最先看到的混一批和热门关键词
    2、接受父组件传递的参数，并且使用
    3、定于了点击热门关键词事件和点击换一批事件
    4、然后布局使用到了弹性盒子flex
    5、说实话，flex我并不是很懂
-->

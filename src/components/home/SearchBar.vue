<template>
    <div class="seach-bar">
        <div class="seach-bar-wrapper" @click="onSearchBarClick">
            <van-icon
                    class="search"
                    color="#858C96"
                    name="search"
                    size="16px"
            />
            <input
                    :disabled="disable"
                    :focus="focus"
                    :maxlength="limit"
                    :placeholder="hotSearch.length === 0 ? '搜索' : hotSearch "
                    @input="onChange"
                    class="seach-bar-input"
                    v-model="searchWord"
                    confirm-type="search"
                    @confirm="onConfirm"
                    placeholder-style="color: #ADB4BE;font-size='15px'"
            />
            <van-icon
                    @click="onClearClick"
                    class="clear"
                    color="#ccc"
                    name="clear"
                    size="16px"
                    v-if="searchWord.length > 0"
            />
        </div>
    </div>
</template>

<script>
    export default {
      props: {
        focus: {
          type: Boolean,
          default: true
        },
        disable: {
          type: Boolean,
          default: false
        },
        limit: {
          type: Number,
          default: 50
        },
        hotSearch: {
          type: String,
          default: ''
        }
      },
      data() {
        return {
          searchWord: ''
        }
      },
      methods: {
        onSearchBarClick() {
          this.$emit('onClick')
        },
        onClearClick() {
          this.searchWord = ''
          this.$emit('onClear')
        },
        onChange(e) {
          // console.log(e)
          const { value } = e.mp.detail
          this.$emit('onChange', value)
        },
        onConfirm(e) {
          const { value } = e.mp.detail
          this.$emit('onConfirm', value)
        },
        setValue(v) {
          this.searchWord = v
        },
        getValue() {
          return this.searchWord
        }
      }
    }
</script>

<style lang="scss" scoped>
    .seach-bar {
        padding: 15px 15.5px;

        .seach-bar-wrapper {
            display: flex;
            align-content: center;
            height: 40px;
            box-sizing: border-box;
            background: #F5F7F9;
            border-radius: 20px;
            padding: 12px 17px;

            .seach-bar-input {
                flex: 1;
                margin: -3px 8px 0;
                font-size: 15px;
                color: #333;
            }

            .search, .clear {
                display: flex;
                align-content: center;
                height: 100%;
            }
        }

    }
</style>

<!--
    1、定义div，确定搜索框由三个大框架构成
    2、引入vanticon图标库，进行使用
    3、使用flex布局，align-content：center表示居中
    4、在window上的editor tabs上可以进行分屏！！！
    5、我现在还没弄懂为啥有些地方可以创建vue，有些地方不可以！！
    6、focus是input用来获取焦点的，默认值为false就会输入一个字符后了立马关闭，默认值为true就不会，disable是用来禁用搜索框的
    7、limit是用来控制input最大输入值的,小程序中是maxlength
    8、hotSearch和placeholder是热门关键词，类似于web里面的提示
    9、searchWord是搜索关键字，用来实时获取搜索框中的文字
    10、onSearchBarClick事件用来向外界传递一个函数，用来跳转窗口
    11、onClearClick事件用来置空input中的
    12、onChange事件是点击每输入一个字，用来获取到的值
    13、onConfirm事件是点击键盘发送按钮获取到的值
    14、setValue和getValue是允许他们的父组件直接操作子组件，进行赋值和取值
    15、placeholder-style指定input框中那个提示文字的颜色
-->

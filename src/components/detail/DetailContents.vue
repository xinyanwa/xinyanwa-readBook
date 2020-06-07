<template>
    <div class="detail-contents-wrapper">
        <div class="detail-contents-title">
            目录
        </div>
        <div @click="()=>readBook(item.href)" class="detail-contents" v-for="(item, index) in contents" :key="index">
            <div :style="{marginLeft:(15*item.lable)+'px'}" class="detail-contents-lable">
                {{item.label}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'DetailContents',
      props: {
        contents: Array
      },
      methods: {
        readBook(nav) {
          this.$emit('readBook', nav)
        }
      },
      mounted() {
        // console.log(2222222, this.contents)
      }
    }
</script>

<style lang="scss" scoped>
    .detail-contents-wrapper {
        padding: 0 0 60px 15px;
        margin-top: 15px;

        .detail-contents-title {
            font-size: 22px;
            color: #333;
        }

        .detail-contents {
            padding: 20px 15px 20px 0;
            border-bottom: 1px solid #EBEBEB;

            &:last-child {
                border-bottom: none;
            }

            .detail-contents-lable {
                font-size: 15px;
                color: #868686;
                line-height: 18px;
                max-height: 18px;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
</style>

<!--
    1、调用了获取图书目录api，这里主要的问题就是进行编写的时候，那个目录是动态计算的，这点值得我们学习
    2、也能进行flex编写，这是难点
    3、还有传值的时候看清楚值，然后进行传送
-->

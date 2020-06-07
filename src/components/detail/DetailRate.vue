<template>
    <div class="detail-rate">
        <span class="detail-rate-text">
           轻点评分
        </span>
        <div class="detail-rate-wrapper">
            <van-rate
                    :value="2"
                    :size="25"
                    color="#1D89EE"
                    void-color="#DEE0E2"
                    void-icon="star"
                    @change="onratechange"
            />
        </div>
    </div>
</template>

<script>
    export default {
      name: 'DetailRate',
      props: {
        bookData: Object
      },
      methods: {
        onratechange(e) {
          this.$emit('onRateChange', e)
        }
      }
    }
</script>

<style lang="scss" scoped>
    .detail-rate{
        display: flex;
        padding: 10px 0;
        margin: 0 15px;
        align-items: center;
        border-bottom: 1px solid #EDEDED;
        .detail-rate-text{
            font-size: 14px;
            color: #909090;
        }
        .detail-rate-wrapper{
            flex: 1;
            height: 100%;
            text-align: right;
        }
    }
</style>

<!--
    1、这两节课都显示不出来rate组件，我也找不到bug，难搞
    2、大概内容都是传值和进行flex布局
-->

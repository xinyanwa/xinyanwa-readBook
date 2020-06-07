<template>
    <div class="auth-wrapper">
        <div class="auth">
            <div class="auth-info">
                <div class="auth-img">
                    <ImageView src="/static/tggdsb.jpg" round/>
                </div>
                <div class="sub-title">登录xinyan书屋</div>
                <div class="title">全球好书免费读</div>

            </div>
            <button
                    class="auth-btn"
                    open-type="getUserInfo"
            >
                授权登录</button>
        </div>
    </div>
</template>

<script>
    import ImageView from './ImageView'
export default {
      name: 'Auth',
      components: {ImageView}
      /* methods: {
        getuserinfo() {
          this.$emit('getUserInfo')
        }
      } */
    }
</script>

<style lang="scss" scoped>
    .auth-wrapper{
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #999;
        z-index: 10000;
        .auth{
            position: relative;
            width: 270px;
            height: 248px;
            background: #f5f5f5;
            border-radius: 18px;
            .auth-info{
                display: flex;
                flex-direction: column;
                // justify-content: center;
                align-items: center;
                margin-top: 22.5px;
                .auth-img{
                    width: 74px;
                    height: 74px;
                }
                .sub-title{
                    font-size: 13px;
                    color: #999;
                    line-height: 18.5px;
                    margin-top: 18px;
                }
                .title{
                    font-size: 16.5px;
                    color: #333;
                    line-height: 22.5px;
                    font-weight: 400;
                    margin-top: 3.5px;
                }
            }
            .auth-btn{
                position: absolute;
                bottom: 0;
                width: 100%;
                 background-image: linear-gradient(90deg,#1EA3F5 0%,#0F87FC 100%);
                 border-radius: 0 0 18px 18px;
                color: #fff;
                height: 49px;
                line-height: 49px;
             }
        }
    }
</style>

<template>
    <div class="user-info-wrapper">
        <div class="user-info">
            <div class="user-nick-name">
                {{userInfo.nickName}}
            </div>
            <div class="user-read-time">你已经加入xinyan读书{{readDay}}天</div>
            <div class="user-avatar-wrapper">
                <img class="user-avarat" :src="userInfo.avatarUrl" mode="widthFix"/>
            </div>
        </div>
        <div class="user-extra">
            <div class="user-extra-text">你的书架中共有{{num}}本好书</div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'shelfUserInfo',
      props: {
        userInfo: Object,
        num: Number,
        readDay: Number
      }
    }
</script>

<style lang="scss" scoped>
    .user-info-wrapper{
        margin: 15px 25px;
        background: #F8F9FB;
        border-radius: 12px;
        padding: 15px 20px;
        border: 1px solid #e0e1e2;
        .user-info{
            position: relative;
            height: 60px;
            border-bottom: 1px solid #e9e9e9;
            .user-nick-name{
                font-size: 17px;
                font-weight: 500;
                color: #333;
            }
            .user-read-time{
                font-size: 12px;
                color: #868686;
            }
            .user-avatar-wrapper{
                position: absolute;
                top: 0;
                right: 0;
            }
            .user-avarat{
                width: 40px;
                border-radius: 50%;
            }
        }
        .user-extra{
            margin-top: 15px;
            .user-extra-text{
                font-size: 12px;
                color: #666;
                font-weight: 500;
            }
        }
    }
</style>

<template>
    <div class="detail-stat-wrapper">
        <div class="detail-stat-left">
            <div class="detail-stat-rate-wrapper">
                <span class="detail-stat-rate">{{bookData.rankAvg}}</span>
                <van-rate
                        class="vanrate"
                        v-model="bookData.rankAvg"
                        :size="16"
                        allow-half
                        color="#717882"
                        void-color="#DEE0E2"
                        void-icon="star"
                ></van-rate>
            </div>
            <div class="detail-stat-rate-hint">{{bookData.rankNum}}人点评</div>
        </div>
        <div class="detail-stat-right">
            <div class="detail-stat-num-wrapper">
                <span class="detail-stat-num">{{bookData.readerNum}}</span>人在读此书
            </div>
            <div class="detail-stat-readers">
                <div class="detail-stat-readers-avatar" v-for="(reader, index) in bookData.readers" :key="index">
                    <ImageView :src="reader.avatarUrl" round/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ImageView from '../base/ImageView'
export default {
      name: 'DetailStat',
      components: {ImageView},
      props: {
        bookData: Object
      },
      mounted() {
        console.log(1111111, this.bookData.rankAvg)
      }
    }
</script>

<style lang="scss" scoped>
    .detail-stat-wrapper{
        display: flex;
        padding: 10px 15px;
        .detail-stat-left{
            flex: 0 0 50%;
            width: 50%;
            .detail-stat-rate-wrapper{
                display: flex;
                align-items: center;
                .vanrate{
                    flex: 2;
                    height: 20px;
                }
                .detail-stat-rate{
                    flex: 1;
                    font-size: 24px;
                    color: #5E5E5E;
                    margin-right: 10px;
                }
            }
            .detail-stat-rate-hint{
                margin-top: 5px;
                font-size: 11px;
                color: #99a0aa;
            }
        }
        .detail-stat-right{
            flex: 0 0 50%;
            width: 50%;
            .detail-stat-num-wrapper{
                display: flex;
                align-items: center;
                font-size: 12px;
                color: #868686;
                .detail-stat-num{
                    font-size: 24px;
                    color: #5E5E5E;
                    margin-right: 5px;
                }
            }
            .detail-stat-readers{
                display: flex;
                font-size: 12px;
                color: #909090;
                .detail-stat-readers-avatar{
                    width: 25px;
                    height: 25px;
                    margin-left: -8px;
                    border-radius: 50%;
                    border: 1px solid #ccc;
                    box-shadow: 0 4px 4px rgba(0,0,0,0.3);
                }
                &:first-child{
                    margin-left: 0;
                }
            }
        }
    }
</style>
<!--
    1、这里使用的心表组件并不能出来，所以不知道怎么用
-->

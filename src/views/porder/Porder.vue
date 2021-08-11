<template>
  <div class="p-order">
    <section>
      <div class="order-title">
        <div class="icon">✔</div>
        <div class="word">
          <p>订单提交成功！去付款咯~</p>
          <p>请在0小时15分钟内完成支付，超时后将取消订单</p>
        </div>
        <div class="pay-amount">
          实付金额：<span>
            <i>￥{{ orderDetailInfo.totalPrice }}</i> 元</span
          >
        </div>
      </div>
      <div class="goods-info">
        <div class="goods-info-title">商品信息</div>
        <div class="goods-info-detail">
          <p>订单号： {{ orderDetailInfo.number }}</p>
          <p>
            收货信息： &nbsp;<span v-if="orderDetailInfo.addressInfo">
              {{ orderDetailInfo.addressInfo.userName }}&nbsp;&nbsp; {{ orderDetailInfo.addressInfo.phone }}&nbsp;&nbsp; {{ orderDetailInfo.addressInfo.provinceName }}&nbsp;&nbsp;
              {{ orderDetailInfo.addressInfo.cityName }}&nbsp;&nbsp; {{ orderDetailInfo.addressInfo.countyName }}&nbsp;&nbsp; {{ orderDetailInfo.addressInfo.streetName }}&nbsp;&nbsp;
              {{ orderDetailInfo.addressInfo.address }}
            </span>
          </p>
          <div>
            商品名称： <span v-for="(item, index) in orderDetailInfo.orderDetailList" :key="index"> {{ item.productName }}&nbsp;&nbsp;&nbsp;×{{ item.count }}</span>
          </div>
        </div>
      </div>
      <!-- 支付方式 -->
      <div class="pay-methods">
        <div class="pay-methods-head">支付方式</div>
        <div class="pay-methods-list">
          <div class="method-item">
            <img src="~assets/img/zfb.png" alt="" />
            <span>支付宝</span>
          </div>
          <div class="method-item">
            <img src="~assets/img/wx.png" alt="" />
            <span>微信支付</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { orderDetail } from 'network/order_data.js'
export default {
  name: 'Porder',
  data() {
    return {
      // 订单详情
      orderDetailInfo: {},
      // 订单id
      orderID: null,
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      this.orderID = this.$route.query.id
      orderDetail(this.orderID).then((res) => {
        this.orderDetailInfo = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
.p-order {
  overflow: hidden;
  background-color: #f0f2f5;
  section {
    max-width: 1230px;
    margin: 20px auto;
    background-color: #fff;
    .order-title {
      display: flex;
      padding: 48px;
      align-items: center;
      justify-content: space-between;
      .icon {
        font-weight: 700;
        font-size: 36px;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        text-align: center;
        line-height: 60px;
        color: #fff;
        background-color: #0378fd;
      }
      .word {
        flex: 1;
        margin-left: 20px;
        p {
          &:first-child {
            font-size: 21px;
            font-weight: 700;
          }
          &:last-child {
            color: #f63440;
            font-size: 18px;
            font-weight: 700;
          }
        }
      }
      .pay-amount {
        span {
          color: #ff5d4c;
          i {
            font-size: 20px;
          }
        }
      }
    }
    .goods-info {
      .goods-info-title {
        font-size: 20px;
        color: #555;
        font-weight: 700;
        padding-left: 50px;
      }
      .goods-info-detail {
        padding: 0 48px 48px 100px;
      }
    }
    .pay-methods {
      padding: 50px;
      margin-top: 20px;
      margin-bottom: 20px;
      .pay-methods-head {
        margin-bottom: 15px;
        font-size: 23px;
        font-weight: 700;
      }
      .pay-methods-list {
        display: flex;
        .method-item {
          display: flex;
          padding: 5px 20px;
          margin-right: 30px;
          height: 60px;
          width: 200px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          justify-content: center;
          align-items: center;
          img {
            width: 30px;
            height: 30px;
          }
          span {
            margin-left: 10px;
            font-size: 18px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
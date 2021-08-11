<template>
  <div class="o-detail">
    <div class="page-title">订单详情</div>
    <div class="btns">
      <el-button size="medium">取消订单</el-button>
      <el-button size="medium" type="danger" @click="goPay">立即支付</el-button>
    </div>
    <div class="order-list">
      <div class="order-item">
        <el-row>
          <el-col :span="6">订单号：{{ orderDetailInfo.number }}</el-col>
          <el-col :span="8">{{ orderDetailInfo.createTime }}</el-col>
          <el-col :span="6">推荐人：{{ orderDetailInfo.recommenderName }}</el-col>
        </el-row>
        <div class="order-content">
          <div class="order-content-left">
            <div class="order-content-show" v-for="(item_2, index_2) in orderDetailInfo.orderDetailList" :key="index_2">
              <img :src="item_2.thumbnailUrl" alt="" />
              <div>
                <span>{{ item_2.productName }}</span>
              </div>
              <span>￥{{ item_2.price }}×{{ item_2.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 收货信息 -->
    <div class="receive-address" v-if="orderDetailInfo.addressInfo">
      <div class="title">收货地址</div>
      <p>姓 名：{{ orderDetailInfo.addressInfo.userName }}</p>
      <p>联系电话：{{ orderDetailInfo.addressInfo.phone }}</p>
      <p>
        收货地址：{{ orderDetailInfo.addressInfo.provinceName }} {{ orderDetailInfo.addressInfo.cityName }}{{ orderDetailInfo.addressInfo.countyName }}{{ orderDetailInfo.addressInfo.streetName }}
        {{ orderDetailInfo.addressInfo.address }}
      </p>
    </div>
    <!-- 付款金额 -->
    <div class="payment">
      <div>
        总计：<span>￥{{ orderDetailInfo.totalPrice }}</span>
      </div>
      <div>
        运费：<span>￥{{ orderDetailInfo.trafficPay }}</span>
      </div>
      <div>
        应付金额：<span>￥{{ orderDetailInfo.totalPrice + orderDetailInfo.trafficPay }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { orderDetail } from 'network/order_data.js'
export default {
  name: 'Odetail',
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
    // 跳转支付页面
    goPay() {
      this.$router.push(`/front/porder?id=${this.orderID}`)
    },
  },
}
</script>

<style lang="less" scoped>
.o-detail {
  .page-title {
    margin: 20px 0;
    font-size: 28px;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
  .order-list {
    font-size: 14px;

    .order-item {
      margin-top: 20px;
      .order-content {
        display: flex;
        margin-top: 10px;
        border-top: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        padding: 10px 40px;
        align-items: center;

        .order-content-left {
          .order-content-show {
            display: flex;
            align-items: center;
            img {
              width: 120px;
              height: 70px;
              border-radius: 10px;
            }
            div {
              margin-left: 10px;
              width: 230px;
            }
            > span {
              color: #888;
            }
          }
        }
      }
    }
  }
  .receive-address {
    padding: 20px 0;
    border-bottom: 1px solid #e0e0e0;
    p {
      font-size: 14px;
    }
  }
  .payment {
    margin-top: 40px;
    font-size: 14px;
    text-align: right;
    border-top: 1px solid #e0e0e0;
    div {
      span {
        display: inline-block;
        width: 200px;
      }
      &:last-child {
        font-size: 20px;
        span {
          color: #ff5d4c;
        }
      }
    }
  }
}
</style>
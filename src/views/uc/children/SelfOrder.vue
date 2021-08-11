<template>
  <div class="self-order">
    <div class="page-title">我的订单</div>
    <div class="order-category-list">
      <div>
        <span @click="changeOrderType(null)" :class="{ activeClass: orderQueryInfo.status === null }">全部订单</span>
        <span @click="changeOrderType(1)" :class="{ activeClass: orderQueryInfo.status === 1 }">待支付</span>
        <span @click="changeOrderType(2)" :class="{ activeClass: orderQueryInfo.status === 2 }">已支付</span>
        <span @click="changeOrderType(4)" :class="{ activeClass: orderQueryInfo.status === 4 }">已失效</span>
        <span @click="changeOrderType(8)" :class="{ activeClass: orderQueryInfo.status === 8 }">团购失败</span>
      </div>
      <el-input placeholder="输入产品名" v-model="orderQueryInfo.productName" size="medium">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="searchByName"></i>
      </el-input>
    </div>
    <!-- 订单列表展示区域 -->
    <div class="order-list">
      <div class="order-item" v-for="(item, index) in orderListArr" :key="index">
        <el-row>
          <el-col :span="6">订单号：{{ item.poNumber }}</el-col>
          <el-col :span="8">下单时间：{{ item.createTime }}</el-col>
          <el-col :span="6">推荐人：{{ item.recommenderName }}</el-col>
          <el-col :span="4"
            ><span style="color: #1fa2f8">{{ orderStatus(item) }}</span></el-col
          >
        </el-row>
        <div class="order-content">
          <div class="order-content-left">
            <div class="order-content-show" v-for="(item_2, index_2) in item.detailList" :key="index_2">
              <img :src="item_2.thumbnailUrl" alt="" />
              <div>
                <span>{{ item_2.productName }}</span>
                <p>￥{{ item.price }}</p>
              </div>
              <span>×{{ item_2.count }}</span>
            </div>
          </div>
          <div class="order-tatal-price">￥{{ item.price }}</div>
          <div class="pay-btn" v-if="item.status === 1">
            <el-button size="small" @click="goPay(item.orderID)">立即支付</el-button>
            <el-button size="small">取消订单</el-button>
          </div>
          <div class="detail-btn">
            <el-button size="small" type="primary" @click="goDetail(item.orderID)">订单详情</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" :total="totalOrders" :page-size="orderQueryInfo.pageSize" :current-page="orderQueryInfo.pageNo" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import { orderList } from 'network/order_data.js'
export default {
  name: 'SelfOrder',
  data() {
    return {
      // 订单信息参数
      orderQueryInfo: {
        status: null,
        pageNo: 1,
        pageSize: 10,
        productName: null,
      },
      // 总的订单数
      totalOrders: 0,
      // 订单列表数据
      orderListArr: [],
    }
  },
  computed: {
    orderStatus() {
      return (item) => {
        if (item.status === 1) {
          return '待支付'
        }
        if (item.status === 2) {
          return '已支付'
        }
        if (item.status === 4) {
          return '已失效'
        }
        if (item.status === 8) {
          return '团购失败'
        }
      }
    },
  },
  created() {
    this.getOrderList()
  },
  methods: {
    // tab切换订单类型时事件
    changeOrderType(val) {
      this.orderQueryInfo.status = val
      this.getOrderList()
    },
    // 获取不同状态的订单列表
    getOrderList() {
      orderList(this.orderQueryInfo).then((res) => {
        this.totalOrders = res.data.totalRows
        this.orderListArr = res.data.rows
      })
    },
    // 分页器页数改变时触发
    handleCurrentChange(val) {
      this.orderQueryInfo.pageNo = val
    },
    // 根据产品名搜索订单
    searchByName() {
      this.getOrderList()
    },
    // 跳转支付页面
    goPay(id) {
      this.$router.push(`/front/porder?id=${id}`)
    },
    // 跳转订单详情
    goDetail(id) {
      this.$router.push(`/front/uc/odetail?id=${id}`)
    },
  },
}
</script>

<style lang="less" scoped>
.self-order {
  .page-title {
    margin: 20px 0;
    font-size: 28px;
  }
  .order-category-list {
    display: flex;
    margin-top: 25px;
    align-items: center;
    span {
      padding: 2px 8px;
      margin-right: 10px;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .el-input {
      width: 200px;
      .el-input__icon {
        cursor: pointer;
      }
    }
  }
  .order-list {
    font-size: 14px;

    .order-item {
      margin-top: 20px;
      .order-content {
        display: flex;
        margin-top: 10px;
        border: 1px solid #e0e0e0;
        padding: 10px 40px;
        align-items: center;
        justify-content: space-between;
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
              p {
                color: #ff5d4c;
              }
            }
            > span {
              color: #888;
            }
          }
        }
        .order-tatal-price {
          margin: 0 50px;
          font-size: 18px;
          color: #ff5d4c;
        }
        .pay-btn {
          display: flex;
          height: 70px;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
        .detail-btn {
          margin-left: 10px;
        }
      }
    }
  }
}
.activeClass {
  color: #1fa2f8;
  background: rgba(31, 162, 248, 0.1);
}
/deep/ .el-pagination {
  text-align: center;
}
</style>
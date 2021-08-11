<template>
  <div class="self-vip-order">
    <div class="page-title">VIP订单</div>
    <div class="vip-category-list">
      <div>
        <span @click="status = 0" :class="{ activeClass: status === 0 }">全部订单</span>
        <span @click="status = 1" :class="{ activeClass: status === 1 }">待支付</span>
        <span @click="status = 1" :class="{ activeClass: status === 2 }">已支付</span>
        <span @click="status = 1" :class="{ activeClass: status === 3 }">已取消</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelfVipOrder',
  data() {
    return {
      // 订单状态
      status: 0,
    }
  },
}
</script>

<style lang="less" scoped>
.self-vip-order {
  .page-title {
    margin: 20px 0;
    font-size: 28px;
  }
  .vip-category-list {
    padding-bottom: 15px;
    border-bottom: 1px solid #e0e0e0;
    span {
      padding: 2px 8px;
      margin-right: 10px;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
    }
  }
}
.activeClass {
  color: #1fa2f8;
  background: rgba(31, 162, 248, 0.1);
}
</style>
<template>
  <div class="user-center">
    <section>
      <!-- 左侧导航栏 -->
      <aside>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" router>
          <el-submenu index="1">
            <template slot="title">
              <span slot="title">学习中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/front/uc/selflearn">我的学习</el-menu-item>
              <el-menu-item index="/front/uc/selfexam">我的考试</el-menu-item>
              <el-menu-item index="/front/uc/selfcert">我的电子证书</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span slot="title">订单中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/front/uc/selforder">我的订单</el-menu-item>
              <el-menu-item index="/front/uc/SelfVipOrder">VIP订单</el-menu-item>
              <el-menu-item index="/front/cart">我的购物车</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span slot="title">个人中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/front/uc">我的个人中心</el-menu-item>
              <el-menu-item index="/front/uc/ucard">班级激活码</el-menu-item>
              <el-menu-item index="/front/uc/lcard">储值卡</el-menu-item>
              <el-menu-item index="/front/uc/SelfCoupon">优惠券</el-menu-item>
              <el-menu-item index="/front/uc/selfaddr">收货地址</el-menu-item>
              <el-menu-item index="/front/uc/cMyResume">我的简历</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <span slot="title">我的问答</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/front/uc/classify">我的问答</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </aside>
      <!-- 右侧显示框 -->
      <main>
        <router-view></router-view>
      </main>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Uc',
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.user-center {
  background-color: #f5f5f5;
  overflow: hidden;
  section {
    display: flex;
    margin: 30px auto;
    max-width: 1230px;
    aside {
      padding: 25px;
      width: 200px;
      background-color: #fff;
    }
    main {
      flex: 1;
      padding: 20px 40px;
      margin-left: 10px;
      background-color: #fff;
    }
  }
}
</style>
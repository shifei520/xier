<template>
  <div id="login-mode">
    <header class="login-header">
      <div class="login-logo">
        <img src="~assets/img/logo.png" alt="" @click="backHome" />
      </div>
    </header>
    <section class="login-form">
      <slot></slot>
    </section>
    <footer class="login-footer clearfix">
      <p>常见问题 | 隐私政策</p>
      <p>
        Copyright2019 西尔环境教育（CEI）版权所有 主办单位：北京西尔云教育科技有限公司 承办单位： 辽宁省两山科技有限公司提供技术开发和技术维护 京ICP备19011394号
        出版物经营许可证：新出发京零字第海180213号
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LoginMode',
  methods: {
    // 回到主页
    backHome() {
      this.$router.push('/front')
    },
  },
}
</script>

<style lang="less" scoped>
#login-mode {
  width: 100%;
  .login-header {
    width: 100%;
    height: 80px;
    line-height: 80px;
    .login-logo {
      width: 80vw;
      max-width: 1230px;
      margin: 0 auto;
      img {
        width: 172px;
        height: 45px;
        cursor: pointer;
      }
    }
  }
  .login-form {
    display: flex;
    width: 100%;
    height: 500px;
    background: url('~assets/img/bc_login.png') no-repeat;
    background-size: 100% 100%;
    align-items: center;
    justify-content: space-around;
    &:before {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
    }
  }
  .login-footer {
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    p {
      margin-top: 10px;
      font-size: 14px;
      color: #5d5d5d;
    }
  }
}
</style>
<template>
  <div id="footer-bar" v-if="this.$route.path.indexOf('/login') === -1">
    <div class="info-container">
      <div class="info-container-left">
        <div class="title_1">客服电话</div>
        <p>服务电话：<i class="iconfont">&#xe660;</i> 4000810101</p>
        <p>在线客服：<span class="iconfont">&#xe661; 立即咨询</span></p>
        <p>服务邮箱：<i class="iconfont">&#xe857;</i> passport@cei.net.cn</p>
        <p>周一至周五：9:00-18:00</p>
      </div>
      <div class="info-container-right">
        <div class="good-course">
          <div class="title_1">精品课程</div>
          <p>生态环境执法培训</p>
          <p>生态环境检测培训</p>
          <p>排污企业培训</p>
          <p>第三方环保公司培训</p>
        </div>
        <div class="quick-entry">
          <div class="title_1">快速入口</div>
          <router-link tag="p" to="/front/uc">个人中心</router-link>
          <router-link tag="p" to="/front/card">购物车</router-link>
          <router-link tag="p" to="/front/uc/selforder">我的订单</router-link>
          <router-link tag="p" to="/login">登录注册</router-link>
        </div>
        <div class="about">
          <div class="title_1">关于我们</div>
          <p>西尔介绍</p>
          <p>版权声明</p>
          <p>愿景与使命</p>
          <p>大事记</p>
          <p>合作伙伴</p>
        </div>
        <div class="img_1">
          <img src="~assets/img/qr_1.jpg" alt="" />
          <p>关注西尔微信</p>
        </div>
        <div class="img_2">
          <img src="~assets/img/qr_2.png" alt="" />
          <p>西尔云学苑App</p>
        </div>
      </div>
    </div>
    <div class="secuity-num">
      <a href="https://beian.miit.gov.cn/" target="_blank">
        <img src="~assets/img/secuity_icon.png" alt="" />
        <span>&nbsp;京公网安备 11010102004423号</span>
      </a>
    </div>
    <!-- 版权地址区域 -->
    <div class="copyright">
      <span
        >Copyright2019 西尔环境教育（CEI）版权所有 主办单位：北京西尔云教育科技有限公司 承办单位： 辽宁省两山科技有限公司提供技术开发和技术维护
        <a href="https://beian.miit.gov.cn" target="_blank">京ICP备19011394号-2</a> 出版物经营许可证：新出发京零字第海180213号</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
}
</script>

<style lang="less" scoped>
#footer-bar {
  width: 100%;
  color: #fff;
  font-size: 14px;
  background-color: #000;
  overflow: hidden;
  .info-container {
    display: flex;
    width: 80vw;
    height: 202px;
    max-width: 1230px;
    margin: 20px auto;
    .info-container-left {
      display: flex;
      padding: 20px 0 0 119px;
      height: 100%;
      width: 380px;
      border-right: 2px solid #fff;
      flex-direction: column;
      justify-content: space-around;
      box-sizing: border-box;
      p > span.iconfont {
        color: #1fa2f8;
        font-size: 14px;
      }
      .title_1 {
        margin-bottom: 10px;
      }
    }
    .info-container-right {
      display: flex;
      padding-top: 20px;
      flex: 1;
      justify-content: space-around;
      .img_1,
      .img_2 {
        width: 120px;
        img {
          width: 100%;
        }
        p {
          height: 30px;
          line-height: 30px;
          text-align: center;
        }
      }
      .title_1 {
        margin-bottom: 20px;
      }
      p {
        margin-top: 4px;
      }
      .quick-entry {
        p {
          cursor: pointer;
        }
      }
    }
  }
  .secuity-num {
    height: 65px;
    width: 300px;
    margin: 0 auto;
    line-height: 65px;
    text-align: center;
    img {
      width: 20px;
      height: 20px;
    }
    span {
      color: #939393;
    }
  }
  .copyright {
    width: 100%;
    padding: 5px 0;
    font-size: 14px;
    text-align: center;
    background: #424242;
    a {
      color: #1fa2f8;
    }
  }
}
</style>
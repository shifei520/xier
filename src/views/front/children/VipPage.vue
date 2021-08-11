<template>
  <div class="vip-page">
    <main>
      <!-- 页面横幅部分 -->
      <div class="banner-vip">
        <div class="open-vip" v-if="membership !== null">
          <header>开通西尔云学苑VIP</header>
          <p>原价</p>
          <div class="old-price">￥{{ membership[0].oldPrice }}元/年</div>
          <p>限时折扣价</p>
          <div class="vip-price">
            ￥ <span>{{ membership[0].membershipPrice }}</span> 元/年
          </div>
          <button>立即开通</button>
          <div class="footer-vip">全年畅学无阻</div>
        </div>
      </div>
      <!-- 权益部分 -->
      <div class="rights-vip">
        <img src="~assets/img/vipPage_2.png" alt="" />
        <div class="compare-rights">
          <div class="rights-item">
            <h5>普通用户</h5>
          </div>
          <div class="rights-item">VIP用户</div>
        </div>
      </div>
      <!-- 课程部分 -->
      <div class="courses-vip">
        静态数据太多，以上数据省略
        <div class="more-vip-course">
          <router-link tag="div" to="/front/vipCourseList">查看更多VIP专属课程</router-link>
        </div>
      </div>
      <!-- 购买须知部分 -->
      <div class="purchase-info">
        <img src="~assets/img/vipPage_3.png" alt="" />
        <div class="notice">
          <div class="notice-text">1.所有西尔云学苑VIP标识课程会员全部免费学习。</div>
          <div class="notice-text">2.VIP专属折扣券由系统自动发放至会员账户。</div>
          <div class="notice-text">3.会员服务为虚拟产品，一经售出暂不支持退款。</div>
          <img src="~assets/img/vipPage_4.png" alt="" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
// 获取网络请求函数
import { membershipInfo } from 'network/course_data.js'
export default {
  name: 'VipPage',
  data() {
    return {
      // vip数据
      membership: null,
    }
  },
  created() {
    this.getMemberShip()
  },
  methods: {
    getMemberShip() {
      membershipInfo().then((res) => {
        this.membership = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
.vip-page {
  background: #f0f2f5;
  main {
    margin: 0 auto;
    width: 1150px;
    background-color: #fff;
    .banner-vip {
      position: relative;
      height: 40vh;
      background: #fff url('~assets/img/vipPage_1.png') no-repeat;
      background-size: cover;
      .open-vip {
        display: flex;
        position: absolute;
        top: 4vh;
        right: 7vw;
        width: 13vw;
        height: 32vh;
        background-color: #fff;
        border-radius: 10px;
        text-align: center;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        header {
          height: 6vh;
          width: 100%;
          border-bottom: 1px solid #eee;
          line-height: 6vh;
          text-align: center;
          font-size: 2vh;
          font-weight: 600;
          letter-spacing: 1px;
        }
        p {
          height: 3vh;
          line-height: 4vh;
          width: 100%;
          text-align: center;
          font-size: 1.6vh;
          color: #888;
          letter-spacing: 2px;
        }
        .old-price {
          height: 4vh;
          line-height: 4vh;
          text-align: center;
          color: #222;
          font-size: 1.7vh;
          width: 100%;
          white-space: nowrap;
          letter-spacing: 1px;
          font-weight: 600;
          text-decoration: line-through;
        }
        .vip-price {
          width: 100%;
          color: #ffa524;
          font-size: 2.3vh;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-align: center;
          span {
            font-size: 3.7vh;
          }
        }
        button {
          background: linear-gradient(90deg, #ffd659, #ffa524);
          width: 10vw;
          font-size: 2.5vh;
          color: #fff;
          height: 4.5vh;
          line-height: 4.5vh;
          border-radius: 8px;
          text-align: center;
          letter-spacing: 1px;
          cursor: pointer;
        }
        .footer-vip {
          height: 5vh;
          line-height: 5vh;
          text-align: center;
          font-size: 1.8vh;
          letter-spacing: 2px;
          font-weight: 600;
          color: #888;
        }
      }
    }
    .rights-vip {
      width: 100%;
      text-align: center;
      img {
        margin: 50px 0 20px;
        height: 50px;
        width: 475px;
      }
      .compare-rights {
        display: flex;
        justify-content: space-between;
        .rights-item {
          width: 45%;
        }
      }
    }
    .courses-vip {
      margin: 0 auto;
      width: 80%;
      border-bottom: 5px solid #f7f7f7;
      .more-vip-course {
        display: flex;
        width: 100%;
        justify-content: center;
        div {
          width: 400px;
          height: 80px;
          border: 3px solid #fdb34a;
          font-size: 36px;
          margin: 60px 0 50px;
          line-height: 80px;
          text-align: center;
          color: #fdb34a;
          border-radius: 40px;
          box-sizing: border-box;
          cursor: pointer;
        }
      }
    }
    .purchase-info {
      display: flex;
      padding: 2vh 1vw;
      width: 100%;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      > img {
        height: 60px;
        width: 407px;
      }
      .notice {
        display: flex;
        position: relative;
        margin: 20px 0 80px;
        width: 90%;
        box-shadow: 0 0 5px 5px #efefef;
        flex-direction: column;
        align-items: center;
        .notice-text {
          height: 100px;
          line-height: 100px;
          font-size: 28px;
        }
        > img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 150px;
          height: 300px;
        }
      }
    }
  }
}
</style>
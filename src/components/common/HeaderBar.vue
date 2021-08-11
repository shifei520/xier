<template>
  <div id="head-bar" v-if="this.$route.path.indexOf('/login') === -1">
    <section class="head-content">
      <div class="logo" @click="backToHome">
        <h4>西尔云学苑</h4>
      </div>
      <div class="all-class" @mouseenter="isProper = true" @mouseleave="isProper = false" v-if="isAllClassShow">
        全部课程<span class="iconfont">&#xe606;</span>
        <!-- 课程列表展示 -->
        <div class="class-list" v-show="isProper">
          <el-popover placement="right-start" trigger="hover" v-for="(item, index) in courseListArr" :key="index">
            <div class="law-detail">
              <div class="law-serious" v-for="(item1, index1) in item.childrenList" :key="index1">
                <header>{{ item1.seriesName }}</header>
                <section>
                  <router-link
                    :to="{
                      path: '/front/cdetail',
                      query: {
                        id: item2.productID,
                      },
                    }"
                    v-for="(item2, index2) in item1.courseList"
                    :key="index2"
                    class="list_course"
                  >
                    {{ item2.productName }}
                  </router-link>
                </section>
              </div>
            </div>
            <el-button slot="reference">{{ item.navigationName }} <span class="iconfont">&#xe603;</span> </el-button>
          </el-popover>
        </div>
      </div>
      <ul class="menu-list" :style="{ 'margin-left': isAllClassShow ? 0 : '116px' }">
        <li :class="{ colorStyle: isActive('front') }" @click="backToHome">首页</li>
        <router-link to="/front/book" :class="{ colorStyle: isActive('book') }" tag="li">图书馆</router-link>
        <router-link to="/front/teacher" :class="{ colorStyle: isActive('teacher') }" tag="li">优秀教师</router-link>
        <li class="recruit" @mouseenter="isPopoverShow = true" @mouseleave="isPopoverShow = false">
          人才招聘 <span class="iconfont">&#xe612;</span>
          <transition name="reCruit"
            ><div class="recruit-popover" v-show="isPopoverShow">
              <router-link to="/front/enterHome">求职者</router-link>
              <router-link to="/front/enterHome/firm">招聘者</router-link>
            </div></transition
          >
        </li>
      </ul>
      <div class="search">
        <el-input placeholder="课程、班级、书籍等" v-model="inputValue" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="goSearchPage"></el-button>
        </el-input>
      </div>
      <router-link to="/front/vipPage" tag="div" class="vip-icon">VIP畅学</router-link>
      <el-popover placement="top-start" trigger="hover" width="161">
        <img src="~assets/img/qr_code.png" alt="" class="qr-code" />
        <div class="download" slot="reference">
          <img src="~assets/img/phone.png" alt="" />
          <span>下载APP</span>
        </div>
      </el-popover>
      <div class="login-register" v-if="user === null" @click.stop="openUnLoginPopup">
        <img src="~assets/img/login_icon.png" alt="" />
        <p>登录/注册</p>
        <!-- 未登录弹出框 -->
        <div class="unPopup-user" v-show="isUnloginPopup">
          <div class="popup-close" @click.stop="closeUnloginPopup">×</div>
          <img src="~assets/img/head_portrait.png" alt="" />
          <p>欢迎来到西尔云学苑</p>
          <div class="go-Login" @click="goToLogin">去登陆</div>
          <div class="go-Register" @click="goToRegister">注册好礼</div>
        </div>
      </div>
      <div class="login-already" @click="openPopup" v-else>
        <img :src="user.headUrl" alt="" />
        <!-- 登录后弹出框 -->
        <div class="popup-user" v-show="isPopup">
          <div class="popup-close" @click.stop="closePopup">×</div>
          <img :src="user.headUrl" alt="" />
          <div class="nickName">{{ user.nickName }}</div>
          <div class="activity">
            <router-link tag="div" to="/front/uc/selflearn" class="activity-item">
              <img src="~assets/img/user_1.png" alt="" />
              <p>我的学习</p>
              <p></p>
            </router-link>
            <router-link tag="div" to="/front/uc/ucard" class="activity-item">
              <img src="~assets/img/user_2.png" alt="" />
              <p>激活班级</p>
              <p></p>
            </router-link>
            <router-link tag="div" to="/front/uc/lcard" class="activity-item">
              <img src="~assets/img/user_3.png" alt="" />
              <p>储值卡</p>
              <p></p>
            </router-link>
            <router-link tag="div" to="/front/uc/selforder" class="activity-item">
              <img src="~assets/img/user_4.png" alt="" />
              <p>我的订单</p>
              <p>({{ userCountData.orderCount }})</p>
            </router-link>
            <router-link tag="div" to="/front/uc/SelfCoupon" class="activity-item">
              <img src="~assets/img/user_5.png" alt="" />
              <p>优惠券</p>
              <p>({{ userCountData.couponCount }})</p>
            </router-link>
            <router-link tag="div" to="/front/cart" class="activity-item">
              <img src="~assets/img/user_6.png" alt="" />
              <p>购物车</p>
              <p>({{ userCountData.shoppingCount }})</p>
            </router-link>
          </div>
          <div class="logout">
            <button @click="logOut">退出登录</button>
          </div>
        </div>
      </div>
      <el-button type="primary" round class="certificate" @click="skipPage">查询证书</el-button>
    </section>
  </div>
</template>

<script>
// 引入网络请求相关函数
import { courseListData } from 'network/front_data.js'
import { userCount } from 'network/user_data.js'
import { mapState } from 'vuex'
export default {
  name: 'HeaderBar',
  data() {
    return {
      inputValue: '',
      // 控制弹出框显示与隐藏
      isProper: false,
      // 课程列表数据请求参数
      courseQueryInfo: {
        pageNo: 1,
        pageSize: 8,
      },
      // 课程列表数据
      courseListArr: [],
      // 控制课程是否出现
      isAllClassShow: true,
      // 控制人才招聘弹出框的显示隐藏
      isPopoverShow: false,
      // 控制用户信息弹出想的显示与隐藏
      isPopup: false,
      // 控制未登录用户信息弹出框的显示与隐藏
      isUnloginPopup: false,
      // 保存用户购物车等数量数据
      userCountData: {},
      is_Active: false,
    }
  },
  created() {
    this.getCourseListData()
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {
    $route(to) {
      let reg = /front$/
      if (reg.test(to.path)) {
        this.isAllClassShow = true
      } else {
        this.isAllClassShow = false
      }
    },
  },
  methods: {
    // 获取全部课程数据
    getCourseListData() {
      courseListData(this.courseQueryInfo).then((res) => {
        this.courseListArr = res.data
      })
    },
    // 回到主页面
    backToHome() {
      this.$router.push('/front')
    },
    // 判断当前路由
    isActive(val) {
      return this.$route.path.endsWith(val)
    },
    // 关闭用户信息弹出框
    closePopup() {
      this.isPopup = false
      this.is_Active = false
    },
    // 关闭未登录弹出框
    closeUnloginPopup() {
      this.isUnloginPopup = false
    },
    // 打开用户信息弹出框
    openPopup() {
      if (this.is_Active) return

      this.isPopup = true
      this.is_Active = true
      userCount().then((res) => {
        this.userCountData = res.data
      })
    },
    // 打开未登录时的弹出框
    openUnLoginPopup() {
      this.isUnloginPopup = true
    },
    // 跳转到查询证书页面
    skipPage() {
      this.$router.push('/front/new_zhong/queryWebCertificate')
    },
    // 退出登录按钮
    logOut() {
      window.localStorage.removeItem('user')
      this.$router.push('/login')
    },
    // 前往注册页面
    goToRegister() {
      this.$router.push('/login/r')
    },
    // 前往登录页面
    goToLogin() {
      this.$router.push('/login')
    },
    // 前往搜索页面
    goSearchPage() {
      if (this.inputValue !== '') {
        this.$router.push(`/front/search?content=${this.inputValue}`)
      }
    },
  },
}
</script>

<style lang="less" scoped>
#head-bar {
  position: relative;
  width: 100%;
  height: 60px;
  box-shadow: 0 7px 39px 5px rgba(67, 177, 221, 0.2);
  z-index: 10;
  .head-content {
    display: flex;
    margin: 0 auto;
    height: 100%;
    max-width: 1230px;
    min-width: 1230px;
    align-items: center;
    cursor: pointer;
    .logo {
      width: 138px;
      height: 100%;
      overflow: hidden;
      h4 {
        margin-top: 17px;
        height: 30px;
        width: 114px;
        text-indent: -9999px;
        background: url('~assets/img/logo.png') no-repeat;
        background-size: 114px 30px;
      }
    }
  }
  .all-class {
    position: relative;
    color: #fff;
    width: 116px;
    line-height: 60px;
    text-align: center;
    background-color: #4aa1f0;
    .iconfont {
      font-size: 15px;
      margin-left: 2px;
    }
    .class-list {
      display: flex;
      position: absolute;
      top: 60px;
      left: 0;
      width: 200px;
      line-height: 0;
      background-color: #fff;
      z-index: 999;
      flex-direction: column;
      .iconfont {
        font-size: 12px;
      }
    }
  }
  .menu-list {
    li {
      float: left;
      padding: 0 16px;
      line-height: 60px;
      &:hover {
        color: #1fa2f8;
        transition: color 0.5s;
      }
    }
    .recruit {
      position: relative;
      .recruit-popover {
        position: absolute;
        top: 45px;
        width: 82px;
        height: 78px;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 5px;
        z-index: 999;
        a {
          display: block;
          color: #999;
          height: 39px;
          line-height: 39px;
          font-size: 14px;
          text-align: center;
          transition: all 0.5s;
          &:hover {
            background-color: rgba(31, 162, 248, 0.1);
          }
        }
      }
      .reCruit-enter-active,
      .reCruit-leave-active {
        transition: all 0.5s;
      }
      .reCruit-enter,
      .reCruit-leave-to {
        height: 0;
        opacity: 0;
      }
    }
  }
  .search {
    width: 180px;
    line-height: 60px;
    .el-button {
      &:hover {
        background-color: #47bcff;
        transition: all 0.5s;
      }
    }
  }
  .vip-icon {
    padding: 0 2px;
    width: 80px;
    color: #ffa537;
    text-align: center;
    line-height: 60px;
    font-weight: 600px;
    font-size: 15px;
  }
  .download {
    img {
      height: 21px;
      width: 13px;
      margin: 0 5px;
    }
    span {
      font-size: 13px;
    }
  }
  .login-register {
    position: relative;
    margin-left: 15px;
    width: 80px;
    font-size: 15px;
    color: #999;
    text-align: center;
    > img {
      position: absolute;
      top: -10px;
      left: -7px;
      width: 55px;
      height: 25px;
    }
    .unPopup-user {
      display: flex;
      position: absolute;
      top: 70px;
      left: 5px;
      width: 240px;
      height: 300px;
      background-color: #fff;
      z-index: 99;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .popup-close {
        position: absolute;
        right: 8px;
        top: 10px;
        font-size: 28px;
      }
      img {
        margin-top: 30px;
        width: 60px;
        height: 60px;
      }
      .go-Login {
        width: 180px;
        height: 40px;
        line-height: 40px;
        background-color: #4aa1f0;
        color: #fff;
        text-align: center;
        font-size: 16px;
        margin-top: 30px;
        letter-spacing: 1px;
        border-radius: 5px;
        cursor: pointer;
      }
      .go-Register {
        width: 180px;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
        border: 1px solid #4aa1f0;
        color: #4aa1f0;
        text-align: center;
        font-size: 16px;
        margin-top: 15px;
        letter-spacing: 1px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
  .login-already {
    position: relative;
    width: 80px;
    text-align: center;
    > img {
      width: 35px;
      height: 35px;
    }
    .popup-user {
      display: flex;
      position: absolute;
      top: 70px;
      left: 5px;
      width: 240px;
      height: 330px;
      background-color: #fff;
      z-index: 99;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .popup-close {
        position: absolute;
        right: 8px;
        top: 10px;
        font-size: 28px;
      }
      > img {
        margin-top: 20px;
        width: 60px;
        height: 60px;
      }
      .nickName {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        letter-spacing: 1px;
        font-weight: 600;
        text-align: center;
      }
      .activity {
        display: flex;
        margin-top: 10px;
        width: 100%;
        flex-wrap: wrap;
        .activity-item {
          display: flex;
          width: 33%;
          flex-direction: column;
          align-items: center;
          img {
            width: 25px;
            height: 25px;
          }
          p {
            height: 18px;
            text-align: center;
            font-size: 13px;
          }
        }
      }
      .logout {
        button {
          margin-top: 20px;
          color: #fff;
          width: 180px;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          text-align: center;
          background-color: #4aa1f0;
          letter-spacing: 1px;
          cursor: pointer;
          border-radius: 5px;
        }
      }
    }
  }
  .certificate {
    margin-left: 12px;
    padding: 6px 10px;
  }
}
/deep/ .el-popover__reference {
  width: 100%;
  border: 0;
}
/deep/ .el-popover__reference-wrapper {
  display: inline-block;
  width: 100%;
}
.law-detail {
  width: 815px;
  .law-serious {
    color: #47bcff;
    header {
      height: 30px;
      line-height: 30px;
      font-weight: 600;
      border-bottom: 1px solid #eee;
    }
    section {
      margin-top: 10px;
      .list_course {
        display: inline-block;
        margin-right: 30px;
        height: 40px;
        line-height: 40px;
        color: #47bcff;
      }
    }
  }
}
.colorStyle {
  color: #47bcff;
}
</style>
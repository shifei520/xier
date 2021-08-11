<template>
  <div class="book-detail">
    <!-- 阴影线 -->
    <div class="shadow"></div>
    <!-- 书籍详情头部 -->
    <div class="book-header">
      <div class="book-header-img">
        <img :src="bookDetail ? bookDetail.previewImgUrl : ''" alt="" />
        <div class="book-num-data">
          <div>
            <img src="~assets/img/icon_1.png" alt="" />
            <span>&nbsp;&nbsp;{{ bookDetail ? bookDetail.buyCount : '' }}人已购买</span>
          </div>
          <div>
            <img src="~assets/img/icon_2.png" alt="" />
            <span>&nbsp;&nbsp;{{ bookDetail ? bookDetail.likeCount : '' }}人喜欢</span>
          </div>
        </div>
        <!-- 精品图标 -->
        <div class="book-icon-good">
          <img src="~assets/img/icon_5.png" alt="" />
        </div>
      </div>
      <div class="book-header-title" v-if="bookDetail">
        <h5>{{ bookDetail.productName }}</h5>
        <div class="book-vip-price">
          <img src="~assets/img/banner.png" alt="" />
          <p>
            <span class="price">价格<i></i></span><i class="ordinary-price">￥{{ bookDetail.basicPrice }}</i>
          </p>
          <p v-if="bookDetail.courseType === 1">
            <span class="vip_icon"></span><i class="red-color">￥{{ bookDetail.vipPrice }}</i>
          </p>
        </div>
        <div class="book-info">
          <span>库存<i></i></span>
          <div>{{ surplus }}</div>
        </div>
        <div class="book-info">
          <span>运费<i></i></span>
          <div class="freight">满{{ bookDetail.freeShippingPrice }}元包邮</div>
        </div>
        <div class="btns">
          <el-button type="danger" size="small" @click="addToCart">加入购物车</el-button>
          <el-button type="primary" size="small" @click="purchase">立即购买</el-button>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="dividing-line">
      <div class="line-main">
        <span></span>
        <span class="iconfont">&#xe6b0;&nbsp;西尔推荐</span>
        <span></span>
      </div>
    </div>
    <!-- 书籍介绍和评价部分 -->
    <div class="book-detail-container">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="教材介绍" name="0">
          <div v-html="bookDetail ? bookDetail.webIntroduce : ''"></div>
        </el-tab-pane>
        <el-tab-pane label="评价" name="1">
          <div v-if="(bookDetail ? bookDetail.introduction : '') !== ''">
            {{ bookDetail ? bookDetail.introduction : '' }}
          </div>
          <div v-else>暂无介绍</div>
        </el-tab-pane>
      </el-tabs>
      <aside-recomm :recommendCourse="recomCourse" />
    </div>
  </div>
</template>

<script>
import { lawCourseOneData, recommendOneClass } from 'network/course_data.js'
// 加入购物车
import { addCard } from 'network/user_data.js'
import { mapState } from 'vuex'
// 引入侧边课程推荐组件
import AsideRecomm from 'components/content/AsideRecomm'
export default {
  name: 'Bdetail',
  components: {
    AsideRecomm,
  },
  data() {
    return {
      // 当前书籍id
      productID: null,
      // 当前书籍详细数据
      bookDetail: null,
      // 推荐课程
      recomCourse: [],
      // 当前选项卡展示
      activeName: '0',
      // 加入购物车参数
      queryInfo: {
        count: 1,
        productID: null,
        type: null,
      },
    }
  },
  created() {
    this.initData()
  },
  computed: {
    ...mapState(['isLogin']),
    surplus() {
      return this.bookDetail.stock - this.bookDetail.buyCount
    },
  },
  methods: {
    // 初始化数据
    initData() {
      this.productID = parseInt(this.$route.query.id)
      this.queryInfo.productID = this.productID
      lawCourseOneData(this.productID).then((res) => {
        this.bookDetail = res.data
        this.queryInfo.type = this.bookDetail.productType
        if (this.bookDetail.courseType === 0) {
          recommendOneClass(11).then((res) => {
            this.recomCourse = res.data.rows
          })
        }
      })
    },
    // 加入购物车
    addToCart() {
      if (!this.isLogin) {
        this.$message({
          message: '请重新登录',
          type: 'warning',
        })
        return this.$router.push('/login')
      }
      //加入购物车
      addCard(this.queryInfo).then((res) => {
        if (res.code === 200) {
          return this.$message({
            message: '添加商品成功!',
            type: 'success',
          })
        } else {
          return this.$message({
            message: res.message,
            type: 'warning',
          })
        }
      })
    },
    // 立即购买课程
    purchase() {
      if (!this.isLogin) {
        this.$message({
          message: '请重新登录',
          type: 'warning',
        })
        return this.$router.push('/login')
      }
      addCard(this.queryInfo).then((res) => {
        if (res.code !== 200) {
          return this.$message({
            message: res.message,
            type: 'info',
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.book-detail {
  width: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  .shadow {
    width: 100%;
    height: 0;
    box-shadow: 0 7px 39px 5px #3e9fd8;
  }
  .book-header {
    display: flex;
    padding: 20px;
    width: 1230px;
    margin: 20px auto;
    background-color: #fff;
    box-sizing: border-box;
    .book-header-img {
      position: relative;
      width: 430px;
      height: 280px;
      img {
        width: 100%;
      }
      .book-num-data {
        display: flex;
        img {
          width: 20px;
          height: 16px;
        }
        span {
          font-size: 12px;
          color: #999;
          padding: 0 30px 0 0;
        }
      }
      .book-icon-good {
        position: absolute;
        bottom: 12px;
        right: 0;
        img {
          height: 50px;
          width: 50px;
        }
      }
    }
    .book-header-title {
      margin-left: 44px;
      min-width: 500px;
      h5 {
        font-weight: 700;
        color: #333;
        font-size: 16px;
      }
      .book-vip-price {
        margin-top: 20px;
        width: 100%;
        // height: 119px;
        background: url('~assets/img/bc_6.png') no-repeat;
        background-size: cover;
        img {
          margin-top: -23px;
          width: 100%;
        }
        .vip_icon {
          background: url('~assets/img/icon_4.png') no-repeat;
          background-size: 100% 100%;
        }
        .red-color {
          margin-left: 40px;
          color: #f40;
          font-size: 19px;
        }
        p {
          display: flex;
          height: 40px;
          line-height: 40px;
          span {
            display: inline-block;
            margin-left: 26px;
            width: 65px;
            height: 23px;
            font-size: 13px;
            text-align: justify;
            i {
              display: inline-block;
              width: 100%;
            }
          }
          .price {
            width: 55px;
          }
          .ordinary-price {
            margin-left: 50px;
            font-weight: 600;
            font-size: 19px;
          }
        }
      }
      .book-info {
        display: flex;
        height: 40px;
        line-height: 40px;
        font-size: 13px;
        span {
          display: inline-block;
          margin: 0 26px;
          width: 60px;
          text-align: justify;
          i {
            display: inline-block;
            width: 100%;
          }
        }
        .freight {
          color: rgb(255, 93, 76);
        }
      }
      .btns {
        padding-left: 26px;
      }
    }
  }
  .dividing-line {
    width: 100%;
    .line-main {
      display: flex;
      margin: 20px auto;
      width: 1000px;
      color: #ababab;
      font-size: 14px;
      text-align: center;
      align-items: center;
      span {
        &:first-child,
        &:last-child {
          flex: 1;
          height: 0;
          border-bottom: 1px solid #ababab;
        }
      }
      .iconfont {
        padding: 0 5px;
      }
    }
  }
  .book-detail-container {
    display: flex;
    width: 1230px;
    margin: 0 auto;
    background-color: #fff;
    /deep/ .el-tabs {
      width: 80%;
    }
  }
}
</style>
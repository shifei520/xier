<template>
  <div class="course-detail">
    <!-- 课程详情头部 -->
    <div class="course-header">
      <div class="course-header-img">
        <img :src="courseDetail ? courseDetail.thumbnailUrl : ''" alt="" />
        <div class="course-num-data">
          <div>
            <img src="~assets/img/icon_1.png" alt="" />
            <span>&nbsp;&nbsp;{{ courseDetail ? courseDetail.buyCount : '' }}人已购买</span>
          </div>
          <div>
            <img src="~assets/img/icon_2.png" alt="" />
            <span>&nbsp;&nbsp;{{ courseDetail ? courseDetail.likeCount : '' }}人喜欢</span>
          </div>
        </div>
        <!-- vip图标 -->
        <div class="course-icon-vip">
          <img src="~assets/img/icon_3.png" alt="" />
        </div>
      </div>
      <div class="course-header-title" v-if="courseDetail">
        <h5>{{ courseDetail.productName }}</h5>
        <div class="course-vip-price">
          <img src="~assets/img/banner.png" alt="" />
          <p>
            <span class="price">价格<i></i></span><i class="ordinary-price">￥{{ courseDetail.basicPrice }}</i>
          </p>
          <p v-if="courseDetail.courseType === 1">
            <span class="vip_icon"></span><i class="red-color">￥{{ courseDetail.vipPrice }}</i>
          </p>
        </div>
        <div class="course-info">
          <span>体系<i></i></span>
          <div>{{ courseDetail.parentSeriesName }}--{{ courseDetail.seriesName }}</div>
        </div>
        <div class="course-info" v-if="courseDetail.courseType === 1">
          <span>教师<i></i></span>
          <div>{{ courseDetail.teacherName }}</div>
        </div>
        <div class="course-info" v-else>
          <span>时间地址<i></i></span>
          <div>{{ courseDetail.startTime }} -- {{ courseDetail.closeTime }}</div>
        </div>

        <div class="course-info">
          <span>有效时长<i></i></span>
          <div>{{ courseDetail.authorizeDay }}</div>
        </div>
        <div class="btns">
          <el-button type="danger" size="small" @click="addToCart">加入购物车</el-button>
          <el-button type="primary" size="small" @click="purchase">立即购买</el-button>
        </div>
      </div>
    </div>
    <!-- 课程详情介绍 -->
    <div class="course-detail-container" v-if="courseDetail && courseDetail.courseType === 1">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="课程介绍" name="0">
          <div v-html="courseDetail ? courseDetail.webIntroduce : ''"></div>
        </el-tab-pane>
        <el-tab-pane label="评价" name="1">
          <div v-if="(courseDetail ? courseDetail.introduction : '') !== ''">
            {{ courseDetail ? courseDetail.introduction : '' }}
          </div>
          <div v-else>暂无介绍</div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="course-detail-container_1" v-else>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="课程介绍" name="0">
          <div v-html="courseDetail ? courseDetail.webIntroduce : ''"></div>
        </el-tab-pane>
        <el-tab-pane label="往期回顾" name="1">
          <div v-html="courseDetail ? courseDetail.recordWeb : ''"></div>
        </el-tab-pane>
        <el-tab-pane label="评价" name="2">
          <div v-if="(courseDetail ? courseDetail.introduction : '') !== ''">
            {{ courseDetail ? courseDetail.introduction : '' }}
          </div>
          <div v-else>暂无介绍</div>
        </el-tab-pane>
      </el-tabs>
      <aside-recomm :recommendCourse="recomCourse" />
    </div>
  </div>
</template>

<script>
// 引入当前法律课程数据
import { lawCourseOneData, recommendOneClass } from 'network/course_data.js'
// 加入购物车
import { addCard } from 'network/user_data.js'
import { mapState } from 'vuex'
// 引入侧边课程推荐组件
import AsideRecomm from 'components/content/AsideRecomm'
export default {
  name: 'Cdetail',
  components: {
    AsideRecomm,
  },
  data() {
    return {
      // 当前课程id
      productID: null,
      // 当前课程详细信息
      courseDetail: null,
      // 当前选项卡展示
      activeName: '0',
      // 推荐课程
      recomCourse: [],
      // 加入购物车参数
      queryInfo: {
        count: 1,
        productID: null,
        type: null,
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initData()
    })
  },
  computed: {
    ...mapState(['isLogin']),
  },
  methods: {
    // 初始化数据
    initData() {
      // 获取当前课程id
      this.productID = parseInt(this.$route.query.id)
      if (this.productID === 1) return this.$router.push('/front')
      this.queryInfo.productID = this.productID

      // 获取课程数据
      lawCourseOneData(this.productID).then((res) => {
        this.courseDetail = res.data
        this.queryInfo.type = this.courseDetail.productType
        if (this.courseDetail.courseType === 0) {
          recommendOneClass(4).then((res) => {
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
.course-detail {
  width: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
  .course-header {
    display: flex;
    padding: 20px;
    width: 1230px;
    margin: 20px auto;
    background-color: #fff;
    box-sizing: border-box;
    .course-header-img {
      position: relative;
      width: 430px;
      height: 260px;
      > img {
        width: 100%;
        height: 100%;
      }
      .course-num-data {
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
      .course-icon-vip {
        position: absolute;
        bottom: -12px;
        right: 0;
        img {
          height: 50px;
          width: 50px;
        }
      }
    }
    .course-header-title {
      margin-left: 44px;
      min-width: 500px;
      h5 {
        font-weight: 700;
        color: #333;
        font-size: 16px;
      }
      .course-vip-price {
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
      .course-info {
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
      }
      .btns {
        padding-left: 26px;
      }
    }
  }
  .course-detail-container,
  .course-detail-container_1 {
    width: 1230px;
    margin: 0 auto;
    background-color: #fff;
  }
  .course-detail-container_1 {
    display: flex;
    /deep/ .el-tabs {
      width: 80%;
    }
  }
}
/deep/ .el-tab-pane {
  padding: 20px;
}
/deep/ .el-tabs__content {
  p {
    &:nth-of-type(4) {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
    }
  }
}
</style>
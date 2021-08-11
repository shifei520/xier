<template>
  <div class="teacher-detail">
    <!-- 教师介绍部分 -->
    <div class="banner">
      <section>
        <img :src="teacherInfo.smallPhotoUrl" alt="" />
        <main>
          <p>{{ teacherInfo.teacherName }}</p>
          <span>{{ teacherInfo.titleLevel }}</span>
          <div>{{ teacherInfo.introduction }}</div>
        </main>
      </section>
    </div>
    <!-- 教师在售课程部分 -->
    <div class="sell-course">
      <header>
        <span>在售课程</span>
      </header>
      <section class="course-list">
        <router-link
          class="course-item"
          v-for="(item, index) in saleCourse"
          :key="index"
          :to="{
            path: '/front/cdetail',
            query: {
              id: item.productID,
            },
          }"
          tag="div"
        >
          <img :src="item.thumbnailUrl" alt="" />
          <p>{{ item.productName }}</p>
          <div class="num">
            <span class="iconfont"
              >&#xe60e;&nbsp;<i>{{ item.teacherName }}</i></span
            >
            <span class="iconfont"><i class="love">&#xe62a;</i>&nbsp;{{ item.likeCount }}人喜欢</span>
            <span class="iconfont"><i class="double">&#xe605;</i>&nbsp;&nbsp;{{ item.buyCount }}人购买 </span>
          </div>
          <span class="price"> ￥{{ item.basicPrice }} </span>
          <div class="vip_icon">
            <img src="~assets/img/icon_3.png" alt="" />
          </div>
        </router-link>
      </section>
    </div>
  </div>
</template>

<script>
// 引入网络请求相关函数
import { teacherIntroduce, sellCourse } from 'network/teacher_data.js'
export default {
  name: 'Tdetail',
  data() {
    return {
      // 当前教师id
      teacherID: null,
      // 教师介绍信息
      teacherInfo: null,
      // 在售课程数据
      saleCourse: null,
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 初始化操作
    initData() {
      this.teacherID = this.$route.query.id
      // 教师介绍
      teacherIntroduce(this.teacherID).then((res) => {
        this.teacherInfo = res.data
      })
      // 在售课程数据
      sellCourse(this.teacherID).then((res) => {
        this.saleCourse = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
@color_1: #1fa2f8;
.teacher-detail {
  background-color: #f5f5f5;
  .banner {
    width: 100%;
    height: 400px;
    background: url('~assets/img/teacher_bc.png') no-repeat;
    background-size: cover;
    section {
      display: flex;
      margin: 0 auto;
      max-width: 85%;
      height: 100%;
      color: #fff;
      justify-content: space-between;
      align-items: center;
      img {
        margin: 0 67px 0 80px;
        width: 175px;
        height: 175px;
        border-radius: 50%;
      }
      main {
        p {
          margin-bottom: 10px;
          font-size: 32px;
          font-weight: 700;
        }
        span {
          font-size: 18px;
        }
        div {
          margin-top: 42px;
          max-height: 200px;
          font-size: 14px;
          overflow-y: auto;
        }
      }
    }
  }
  .sell-course {
    margin: 20px auto;
    width: 80vw;
    max-width: 1230px;
    header {
      padding: 2px;
      border-bottom: 1px solid #dedede;
      span {
        padding: 2px;
        color: @color_1;
        font-size: 24px;
        border-bottom: 2px solid @color_1;
      }
    }
    .course-list {
      display: flex;
      flex-wrap: wrap;
      .course-item {
        position: relative;
        margin: 20px 1% 20px 0;
        padding: 15px;
        width: 24%;
        min-height: 292px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s;
        img {
          width: 100%;
          height: 160px;
        }
        p {
          margin-top: 5px;
          color: #000;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        div.num {
          display: flex;
          span {
            flex: 1;
            &:nth-of-type(n + 2),
            i {
              font-size: 12px;
            }
          }
        }
        .price {
          position: absolute;
          bottom: 14px;
          color: #ff5d4c;
        }
        .vip_icon {
          position: absolute;
          bottom: 0;
          right: 0%;
          img {
            width: 50px;
            height: 50px;
          }
        }
        &:hover {
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
          transform: translateY(-5px);
        }
      }
    }
  }
}
.love {
  color: #ffac4c;
}
.double {
  color: @color_1;
}
</style>
<template>
  <div class="home">
    <!-- 头部信息区域 -->
    <div class="user-header">
      <img :src="userInfoObj.headUrl" alt="" />
      <div class="user-nickname">
        <p>{{ userInfoObj.nickName }}</p>
        <p>祝您有愉快的学习体验！</p>
        <router-link to="/front/uc/udetail">修改个人信息></router-link>
      </div>
      <div class="user-id-phone">
        <p>账号ID: {{ userInfoObj.userID }}</p>
        <p>绑定手机: {{ userInfoObj.phone }}</p>
      </div>
    </div>
    <!-- VIP专项区域 -->
    <router-link tag="div" to="/front/vipPage" class="vip-zone">
      <img src="~assets/img/personal_bg.png" alt="" />
    </router-link>
    <!-- 最新学习和开放考试区域 -->
    <div class="lately-study">
      <div class="study">
        <p>最近学习</p>
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item, index) in latelyCourseArr" :key="index">
            <div class="lately-course-item">
              <img :src="item.thumbnailUrl" alt="" />
              <p class="course-title">
                {{ item.productName }}
              </p>
              <p class="teacher-name">教师：{{ item.teacherName }}</p>
              <div class="course-progress">得分:<el-progress :percentage="item.learnedTime / item.totalTime"></el-progress></div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="exam">
        <p>开放考试</p>
      </div>
    </div>
  </div>
</template>

<script>
import { userDetailInfo } from 'network/user_data.js'
import { latelyStudyCourses } from 'network/course_data.js'
export default {
  name: 'Home',
  data() {
    return {
      // 个人信息
      userInfoObj: {},
      // 最近学习课程
      latelyCourseArr: [],
    }
  },
  created() {
    this.getUserInfo()
    this.getLatelyStudyCourse()
  },
  methods: {
    // 获取个人信息
    getUserInfo() {
      userDetailInfo().then((res) => {
        this.userInfoObj = res.data
      })
    },
    // 获取最近学习课程数据
    getLatelyStudyCourse() {
      latelyStudyCourses().then((res) => {
        this.latelyCourseArr = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
.home {
  padding: 20px;
  .user-header {
    display: flex;
    justify-content: space-between;
    img {
      width: 120px;
      height: 120px;
    }
    .user-nickname {
      flex: 1;
      margin-left: 30px;
      margin-top: 20px;
      p {
        &:first-child {
          color: #5d5d5d;
          font-size: 24px;
        }
        &:nth-child(2) {
          margin-bottom: 30px;
          color: #cdcdcd;
        }
      }
      a {
        color: #1fa2f8;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .user-id-phone {
      width: 410px;
      p {
        margin-top: 10px;
      }
    }
  }
  .vip-zone {
    margin-top: 22px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    img {
      width: 100%;
      cursor: pointer;
    }
  }
  .lately-study {
    display: flex;
    margin-top: 35px;
    .study,
    .exam {
      width: 50%;
      > p {
        margin-bottom: 20px;
        font-size: 20px;
      }
    }
    .study {
      .lately-course-item {
        border-radius: 10px;
        transition: all 0.3s;
        img {
          height: 120px;
          width: 100%;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        .course-title {
          padding: 5px 15px 0;
          font-weight: 700;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .teacher-name {
          padding: 0 10px;
          font-size: 14px;
        }
        .course-progress {
          display: flex;
          padding: 0 10px;
          font-size: 14px;
          align-items: center;
          .el-progress {
            flex: 1;
          }
        }
        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>
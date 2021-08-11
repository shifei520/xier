<template>
  <div class="page" v-if="detailCompanyInfo != null">
    <div class="page-header">
      <!-- 公司基本信息与标志 -->
      <div class="img-name">
        <img :src="detailCompanyInfo[0].companyImage" alt="" />
        <div class="name-info">
          <p class="name">
            {{ detailCompanyInfo[0].companyName }}
          </p>
          <p class="introduce">{{ isFinancing(detailCompanyInfo[0].isFinancing) }}&nbsp;·&nbsp;{{ detailCompanyInfo[0].companyCount }}&nbsp;·&nbsp;{{ detailCompanyInfo[0].companyType }}</p>
        </div>
      </div>
      <!-- 公司简介与职位招聘按钮切换 -->
      <div class="btns">
        <button @click="btnClick(0)" :class="{ 'checked-btn': tabSwitch === 0 }">公司简介</button>
        <span></span>
        <button @click="btnClick(1)" :class="{ 'checked-btn': tabSwitch === 1 }">招聘职位</button>
      </div>
    </div>
    <!-- 公司简介与职位招聘详细内容 -->
    <div class="page-content">
      <!-- 公司简介 -->
      <div class="company-profile" v-if="tabSwitch === 0">
        <h5>{{ detailCompanyInfo[0].companyName }}简介</h5>
        <p class="profile">
          {{ detailCompanyInfo[0].details }}
        </p>
        <h5>产品介绍</h5>
        <p class="product-introduce"></p>
        <h5>公司位置</h5>
        <p class="address">
          <img src="~assets/img/location.png" alt="" />
          <span>{{ detailCompanyInfo[0].companyAddress }}</span>
        </p>
      </div>
      <!-- 招聘岗位 -->
      <div class="recruit-position" v-else>
        <p>
          共<span>{{ length }}</span
          >个职位
        </p>
        <div v-for="(item, index) in detailCompanyInfo" :key="index" class="position-item">
          <div class="main-left">
            <p class="enterpriseName">
              {{ item.jobName }}&nbsp;&nbsp;[{{ item.workingAddress[1] }}]&nbsp;&nbsp;&nbsp;
              <span>{{ item.salary }}</span>
            </p>
            <p class="education">{{ item.workingYears }}&nbsp;|&nbsp;{{ item.requiredEducation }}</p>
            <p class="welfare">
              <span v-for="(item_2, index_2) in item.welfare" :key="index_2">
                {{ item_2 }}
              </span>
            </p>
          </div>
          <div class="btn-right">
            <button>投递简历</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 获取网络请求相关函数
import { positionList } from 'network/jobs_data.js'
export default {
  name: 'Page',
  data() {
    return {
      // 公司详情信息
      detailCompanyInfo: null,
      // 请求参数
      queryInfo: {
        userCompanyID: null,
      },
      // 控制公司简介和职位招聘的切换显示
      tabSwitch: 0,
    }
  },
  created() {
    this.initData()
  },
  computed: {
    length() {
      return this.detailCompanyInfo.length
    },
  },
  methods: {
    // 初始数据获取
    initData() {
      this.queryInfo.userCompanyID = this.$route.params.id
      positionList(this.queryInfo).then((res) => {
        this.detailCompanyInfo = res.data.rows
        this.detailCompanyInfo.forEach((item) => {
          item.workingAddress = item.workingAddress.split(',')
          item.welfare = item.welfare.split(',')
        })
      })
    },
    // 计算是否上市
    isFinancing(val) {
      return val === 1 ? '已上市' : '未上市'
    },
    // 点击公司简介和职位招聘按钮事件
    btnClick(val) {
      this.tabSwitch = parseInt(val)
    },
  },
}
</script>

<style lang="less" scoped>
@color_1: #0378fd;
.page {
  background-color: #f0f2f5;
  .page-header {
    width: 80%;
    margin: 0 auto;
    padding: 20px 0 30px 47px;
    background-color: #fff;
    box-sizing: border-box;
    .img-name {
      display: flex;
      img {
        width: 58px;
        height: 50px;
      }
      .name-info {
        margin-left: 20px;
        .name {
          color: #000;
          font-weight: 600;
          font-size: 20px;
        }
        .introduce {
          font-weight: 600;
          font-size: 15px;
        }
      }
    }
    .btns {
      margin-top: 25px;
      button {
        padding: 1px 4px;
        font-size: 17px;
        font-weight: 600;
        letter-spacing: 1px;
        border: 1px solid @color_1;
        border-radius: 4px;
        cursor: pointer;
        background-color: #fff;
      }
      .checked-btn {
        background: @color_1;
        border: 1px solid @color_1;
        color: #fff;
      }
      span {
        padding: 10px;
      }
    }
  }
  .page-content {
    margin: 20px auto 0;
    padding: 20px 60px 30px;
    width: 80%;
    background-color: #fff;
    box-sizing: border-box;
    h5 {
      font-size: 18px;
      margin-bottom: 10px;
      color: #000;
    }
    .profile {
      margin-bottom: 15px;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 1px;
    }
    .address {
      img {
        height: 15px;
        width: 12px;
      }
    }
  }
  .recruit-position {
    > p {
      font-size: 20px;
      color: #000;
      span {
        color: @color_1;
        font-weight: 600;
      }
    }
    .position-item {
      display: inline-flex;
      margin-top: 20px;
      padding: 10px 20px;
      width: 100%;
      border: 2px solid #1d74d6;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
      .main-left {
        .enterpriseName {
          font-size: 19px;
          color: #000;
          span {
            color: #e66b40;
          }
        }
        .education {
          margin: 5px 0 10px;
          font-size: 16px;
          color: #333;
        }
        .welfare {
          font-size: 13px;
          span {
            background: #ebf4fc;
            margin-right: 10px;
            padding: 2px 4px;
            border-radius: 4px;
          }
        }
      }
      .btn-right {
        button {
          padding: 1px 4px;
          font-size: 17px;
          font-weight: 600;
          color: #fff;
          border-radius: 4px;
          letter-spacing: 1px;
          border: none;
          background-color: @color_1;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
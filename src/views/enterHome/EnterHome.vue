<template>
  <div class="enter-home">
    <div class="recruit-main">
      <!-- 职位搜索区域 -->
      <div class="position-search">
        <div class="search-input">
          <span class="iconfont">&#xe67f;</span>
          <input type="text" placeholder="请输入职位，公司" class="search" v-model="jobQuery.jobName" />
        </div>
        <button @click="searchJobs">搜索职位</button>
      </div>
      <!-- 职位分类区域 -->
      <div class="jobs-sort">
        <div class="jobs-sort-content">
          <div v-for="(item1, index1) in jobListArr" :key="index1">
            <span>{{ item1.jobName }}</span>
            <a href="javascript:;" v-for="(item2, index2) in item1.secondaryJobList" :key="index2" @click="jobCateBtn(item2.jobID)" :class="{ active: jobQuery.parentID === item2.jobID }">
              {{ item2.jobName }}
            </a>
          </div>
        </div>
      </div>
      <!-- 最新职位区域 -->
      <div class="latest-jobs">
        <header><span>最新职位</span></header>
        <main>
          <router-link to="/front/enterHome/stationID" class="job-item-detail" v-for="(item, index) in latestJobsArr" :key="index" tag="div">
            <p class="name-salary">
              <span class="job-name"> {{ item.jobName }}[{{ item.workingAddress[0] }}] </span>
              <span class="wages">{{ item.salary }}</span>
            </p>
            <p class="workingYear">
              <span>{{ item.workingYears }}</span
              >&nbsp;|&nbsp;<span>{{ item.requiredEducation }}</span>
            </p>
            <p class="welfare">
              <span v-for="(item1, index1) in item.welfare" :key="index1">
                {{ item1 }}
              </span>
            </p>
            <hr />
            <div class="company-info">
              <img :src="item.companyImage" alt="" />
              <div class="company">
                <p>{{ item.companyName }}</p>
                <p>{{ isFinancing(item.isFinancing) }} · {{ item.companyCount }} · {{ item.workingAddress[1] ? item.workingAddress[1] : '' }} {{ item.releaseTime.slice(5, 10) }}发布</p>
              </div>
            </div>
          </router-link>
        </main>
        <!-- 分页导航 -->
        <el-pagination @current-change="handleCurrentChange_1" :current-page="jobQuery.pageNo" :page-size="jobQuery.pageSize" layout=" prev, pager, next" :total="totalRows_1" small></el-pagination>
      </div>
      <!-- 最新公司和上市公司区域 -->
      <div class="company-info-list">
        <header>
          <span :class="{ checkedColor: companyQuery.isFinancing === null }" @click="switchFinancing(null)">最新公司</span
          ><span :class="{ checkedColor: companyQuery.isFinancing === 1 }" @click="switchFinancing(1)">上市公司</span>
        </header>
        <main>
          <!-- 公司列表展示 -->
          <router-link
            :to="{
              name: 'Page',
              params: {
                id: item.userCompanyID,
              },
            }"
            class="company-item-detail"
            v-for="(item, index) in latestCompanyArr"
            :key="index"
            tag="div"
          >
            <div class="detail-content">
              <img src="~assets/img/com_bc.jpg" alt="" />
            </div>
            <div class="img-content">
              <img :src="item.companyImage" alt="" />
            </div>
            <p class="conpany-shortName">{{ item.companyShortName }}</p>
            <p class="company-industry">
              <span>{{ item.industryName }}</span
              >&nbsp;|&nbsp;<span>{{ isFinancing(item.isFinancing) }}</span>
            </p>
            <p class="company-name">{{ item.companyName }}</p>
            <div class="company-recruit">
              <table>
                <tr>
                  <td>{{ item.recruitmentCount }}</td>
                  <td>|</td>
                  <td>{{ item.deliveryCount }}</td>
                  <td>|</td>
                  <td>{{ item.feedbackRate }}</td>
                </tr>
                <tr>
                  <td>招聘岗位</td>
                  <td></td>
                  <td>投递人数</td>
                  <td></td>
                  <td>简历反馈率</td>
                </tr>
              </table>
            </div>
          </router-link>
          <!-- 分页导航 -->
          <el-pagination
            @current-change="handleCurrentChange_2"
            :current-page="companyQuery.pageNo"
            :page-size="companyQuery.pageSize"
            layout=" prev, pager, next"
            :total="totalRows_2"
            small
          ></el-pagination>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
// 获取网络请求相关函数
import { positionClassify, positionList, latestCompany } from 'network/jobs_data.js'
export default {
  name: 'enterHome',
  data() {
    return {
      // 职位分类信息数据
      jobListArr: [],
      // 职位数据请求参数
      jobQuery: {
        pageSize: 9,
        pageNo: 1,
        // 搜索框内信息
        jobName: null,
        parentID: null,
      },
      // 公司数据请求参数
      companyQuery: {
        pageSize: 12,
        pageNo: 1,
        // 公司是否上市
        isFinancing: null,
      },
      // 最新职位信息
      latestJobsArr: [],
      // 最新公司信息
      latestCompanyArr: [],
      // 最新职位总页数
      totalRows_1: 0,
      // 最新公司或上市公司总页数
      totalRows_2: 0,
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      // 获取职位分类数据
      positionClassify().then((res) => {
        this.jobListArr = res.data
      })
      // 获取最新职位信息
      this.getPositionList()
      // 获取最新公司信息
      this.getLatestCompany()
    },
    // 获取最新职位信息
    getPositionList() {
      positionList(this.jobQuery).then((res) => {
        this.latestJobsArr = res.data.rows
        this.totalRows_1 = res.data.totalRows
        this.latestJobsArr.forEach((item) => {
          item.welfare = item.welfare.split(',')
          item.workingAddress = item.workingAddress.split(',')
        })
      })
    },
    // 计算是否上市
    isFinancing(val) {
      return val === 1 ? '已上市' : '未上市'
    },
    // 操作最新职位当前页数
    handleCurrentChange_1(val) {
      this.jobQuery.pageNo = val
      this.getPositionList()
    },
    // 操作最新公司和上市公司展示页数
    handleCurrentChange_2(val) {
      this.companyQuery.pageNo = val
      this.getLatestCompany()
    },
    // 获取最新公司信息
    getLatestCompany() {
      latestCompany(this.companyQuery).then((res) => {
        this.latestCompanyArr = res.data.rows
        this.totalRows_2 = res.data.totalRows
      })
    },
    // 切换上市公司和最新公司
    switchFinancing(val) {
      this.companyQuery.isFinancing = val
      this.getLatestCompany()
    },
    // 职位分类点击事件
    jobCateBtn(id) {
      this.jobQuery.parentID = id
      // 获取最新职位信息
      this.getPositionList()
    },
    // 搜索职位
    searchJobs() {
      this.jobQuery.parentID = null
      this.getPositionList()
    },
  },
}
</script>

<style lang="less" scoped>
.checkedStyle() {
  font-weight: 600;
  font-size: 18px;
}
.enter-home {
  background-color: #f0f2f5;
  overflow: hidden;
  .recruit-main {
    margin: 10px auto;
    max-width: 1230px;
    width: 80%;
    background-color: #fff;
    overflow: hidden;
    .position-search {
      display: flex;
      margin-top: 15px;
      justify-content: center;
      align-items: center;
      .search-input {
        display: flex;
        position: relative;
        width: 43%;
        height: 46px;
        box-sizing: border-box;
        input {
          flex: 1;
          padding-left: 61px;
          font-size: 17px;
          border: 2px solid #3274de;
          box-shadow: 0 2px 5px 0 #699eb6;
          border-radius: 7px;
          transition: all 0.2s;
          &::-webkit-input-placeholder {
            color: #bfbfbf;
          }
          &::placeholder {
            color: #bfbfbf;
          }
          &:focus {
            border: 2px solid hsl(189, 95%, 49%);
            box-shadow: 0 0 3px 1px rgb(6, 168, 243);
          }
        }
        .iconfont {
          position: absolute;
          left: 23px;
          top: 50%;
          font-size: 17px;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }
      button {
        margin-left: 20px;
        padding: 0 7px;
        height: 22px;
        background: #0378fd;
        color: #fff;
        letter-spacing: 1px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .jobs-sort {
      margin-top: 30px;
      height: 326px;
      max-height: 500px;
      background: url('~assets/img/job_bc.png') no-repeat 50%;
      background-size: 85%;
      .jobs-sort-content {
        padding-top: 15px;
        margin-left: 146px;
        font-size: 14px;
        font-weight: 600;
        div {
          margin-bottom: 4px;
          a {
            margin-left: 15px;
            color: #a7a6a7;
            &:hover {
              color: #47bcff;
            }
          }
          a.active {
            color: #307cff;
          }
        }
      }
    }
    .latest-jobs {
      margin-top: 20px;
      header {
        text-align: center;
        span {
          .checkedStyle();
          background-image: linear-gradient(#fff, #fff, #307aff);
        }
      }
      main {
        margin-top: 20px;
        padding: 0 115px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .job-item-detail {
          margin-bottom: 15px;
          padding: 10px;
          width: 32%;
          border: 1px solid #d2d1d1;
          cursor: pointer;
          box-sizing: border-box;
          transition: all 0.3s;
          &:hover {
            box-shadow: 0 1px 30px 1px rgba(0, 0, 0, 0.1);
            transform: translateY(-5px);
          }
          .name-salary {
            display: flex;
            font-weight: 600;
            font-size: 18px;
            justify-content: space-between;
            .wages {
              color: #df6a46;
            }
          }
          .workingYear {
            margin: 5px 0;
            font-size: 14px;
          }
          .welfare {
            height: 48px;
            span {
              padding: 1px 4px;
              margin-right: 9px;
              color: #83888f;
              font-size: 15px;
              background: #eaf3ff;
              border-radius: 5px;
            }
          }
          hr {
            margin-top: 10px;
            height: 1px;
            border: none;
            border-top: 1px dashed #06c;
          }
          .company-info {
            margin-top: 5px;
            display: flex;
            align-items: center;
            img {
              height: 30px;
              width: 35px;
            }
            .company {
              margin-left: 10px;
              p {
                color: #000;
                line-height: 20px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                &:first-child {
                  font-size: 14px;
                }
                &:last-child {
                  font-size: 12px;
                }
              }
            }
          }
        }
        &::after {
          content: '';
          width: 32%;
          height: 0;
        }
      }
    }
    .company-info-list {
      header {
        margin: 20px 0;
        text-align: center;
        span {
          .checkedStyle();
          &:first-child {
            margin-right: 10px;
          }
        }
      }
      main {
        display: flex;
        padding: 0 115px;
        flex-wrap: wrap;
        justify-content: space-between;
        .company-item-detail {
          position: relative;
          width: 24%;
          padding: 8px;
          margin-bottom: 15px;
          border: 1px solid #b7b5b9;
          box-sizing: border-box;
          cursor: pointer;
          .detail-content {
            width: 100%;
            > img {
              width: 100%;
              height: 70px;
            }
          }
          .img-content {
            height: 0;
            img {
              position: absolute;
              height: 52px;
              width: auto;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: 1;
            }
          }
          .conpany-shortName,
          .company-industry,
          .company-name {
            text-align: center;
            font-size: 15px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .conpany-shortName {
            margin-top: 25px;
            font-weight: 600;
          }
          .company-recruit {
            display: inline-flex;
            margin-top: 30px;
            width: 100%;
            font-size: 14px;
            justify-content: center;
            align-items: center;
            table {
              width: 95%;
              margin: 0 auto;
              tr {
                text-align: center;
                &:first-child {
                  td {
                    &:nth-child(odd) {
                      font-size: 18px;
                      color: #2e77ee;
                      font-weight: 500;
                    }
                    &:nth-child(even) {
                      color: #adadb0;
                    }
                  }
                }
              }
            }
          }
          &:hover {
            box-shadow: 0 1px 30px 1px rgba(0, 0, 0, 0.1);
            transform: translateY(-5px);
          }
        }
      }
    }
  }
}
/deep/ .el-pagination {
  width: 100%;
  text-align: center;
  .el-pager {
    color: rgba(0, 0, 0, 0.65);
    font-weight: 400;
    li.active {
      border: 1px solid #1fa2f8;
      border-radius: 4px;
    }
  }
}
.checkedColor {
  background-image: linear-gradient(#fff, #fff, #307aff);
}
</style>
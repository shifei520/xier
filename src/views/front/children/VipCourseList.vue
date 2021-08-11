<template>
  <div class="vip-course-list">
    <main>
      <header class="course-category">
        <div class="category_1">
          <span>筛选:</span>
          <ul>
            <li>
              <span :class="{ acticeClass: courseInfo.seriesID === null }" @click="seriesSwitch(null)">全部</span>
            </li>
            <li v-for="(item, index) in courseTypes" :key="index">
              <span :class="{ acticeClass: courseInfo.seriesID === item.seriesID }" @click="seriesSwitch(item.seriesID)">{{ item.seriesName }}</span>
            </li>
          </ul>
        </div>
        <div class="category_1">
          <span>筛选:</span>
          <ul>
            <li v-for="(item, index) in typesTeach" :key="index">
              <span :class="{ acticeClass: courseInfo.type === item.type }" @click="typesSwitch(item.type)">
                {{ item.name }}
              </span>
            </li>
          </ul>
        </div>
      </header>
      <section class="course-list">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in courseListArr" :key="index">
            <router-link
              class="course-item"
              :to="{
                path: '/front/cdetail',
                query: {
                  id: item.productID,
                },
              }"
              tag="div"
            >
              <div class="course-lebal">
                <span v-if="item.productType === 1">在线</span>
                <span v-else>远程</span>
              </div>
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
          </el-col>
        </el-row>
      </section>
      <!-- 分页器 -->
      <el-pagination background layout="prev, pager, next" :total="totalCourse" :current-page="courseInfo.pageNo" @current-change="changeCoursePage" :page-size="courseInfo.pageSize"> </el-pagination>
    </main>
  </div>
</template>

<script>
// 获取网络请求函数
import { vipCourseClassify, vipCourseData } from 'network/course_data.js'
export default {
  name: 'VipCourseList',
  data() {
    return {
      // 课程分类
      courseTypes: [],
      // 授课方式分类
      typesTeach: [
        {
          name: '全部',
          type: -1,
        },
        {
          name: '课程',
          type: 1,
        },
        {
          name: '远程班',
          type: 2,
        },
        {
          name: '面授班',
          type: 3,
        },
      ],
      // 课程列表展示数据参数
      courseInfo: {
        // 当前课程分类id
        seriesID: null,
        // 当前授课班级方式id
        type: -1,
        pageNo: 1,
        pageSize: 20,
      },
      // vip课程列表数据
      courseListArr: [],
      // 总的课程数量
      totalCourse: 0,
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 页面初始化的数据
    initData() {
      // 获取课程分类数据
      vipCourseClassify(1).then((res) => {
        this.courseTypes = res.data
      })
      // 初始时获取所有课程数据
      this.getVipCourseData()
    },
    // 点击切换课程分类
    seriesSwitch(val) {
      this.courseInfo.seriesID = val
      this.getVipCourseData()
    },
    // 点击切换授课方式
    typesSwitch(val) {
      this.courseInfo.type = val
      this.getVipCourseData()
    },
    // 获取vip课程列表数据
    getVipCourseData() {
      vipCourseData(this.courseInfo).then((res) => {
        this.courseListArr = res.data.rows
        this.totalCourse = res.data.totalRows
      })
    },
    // 点击分页器时触发事件
    changeCoursePage(val) {
      this.courseInfo.pageNo = val
      this.getVipCourseData()
    },
  },
}
</script>

<style lang="less" scoped>
.vip-course-list {
  width: 100%;
  background-color: #f0f2f5;
  main {
    width: 1230px;
    margin: 0 auto;
    overflow: hidden;
    .course-category {
      margin-top: 20px;
      padding: 50px 30px;
      width: 100%;
      font-size: 14px;
      background-color: #fff;
      box-sizing: border-box;
      .category_1 {
        display: flex;
        span {
          width: 40px;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            margin-left: 8px;
            margin-bottom: 10px;
            span {
              padding: 4px 8px;
              border-radius: 6px;
              transition: all 0.5s;
              cursor: pointer;
            }
          }
        }
      }
    }
    .course-list {
      display: flex;
      .el-row {
        width: 100%;
        .el-col {
          .course-item {
            position: relative;
            margin: 20px 1% 20px 0;
            padding: 15px;
            width: 100%;
            min-height: 292px;
            box-sizing: border-box;
            background-color: #fff;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
            .course-lebal {
              position: absolute;
              top: 24px;
              right: 24px;
              padding: 3px 5px;
              background: rgba(0, 0, 0, 0.3);
              color: #fff;
              font-size: 0.75rem;
              border-radius: 5px;
            }
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
    /deep/ .el-pagination {
      text-align: center;
    }
  }
}
.acticeClass {
  color: #fff;
  background-color: #1fa2f8;
}
.love {
  color: #ffac4c;
}
.double {
  color: #1fa2f8;
}
</style>
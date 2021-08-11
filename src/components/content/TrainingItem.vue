<template>
  <section class="training-item-list">
    <div class="training-item-top">
      <!-- 左侧广告 -->
      <div class="training-item-left-img">
        <router-link
          :to="{
            path: '/front/cdetail',
            query: {
              id: getProductID(dataItem.leftAdvertisementList[0].path),
            },
          }"
          tag="div"
        >
          <img :src="dataItem.leftAdvertisementList[0].imageUrl" alt=""
        /></router-link>
        <router-link
          :to="{
            path: '/front/cdetail',
            query: {
              id: getProductID(dataItem.leftAdvertisementList[1].path),
            },
          }"
          tag="div"
        >
          <img :src="dataItem.leftAdvertisementList[1].imageUrl" alt=""
        /></router-link>
      </div>
      <!-- 右侧信息 -->
      <div class="training-item-right">
        <!-- 右侧信息---课程列表 -->
        <div class="training-item-right-course">
          <header>
            <div class="training-title">
              <span></span>
              <h5>{{ dataItem.floorName }}</h5>
            </div>
            <ul class="training-course-cate">
              <li v-for="(item, index) in courseCateArr" :key="index" :class="{ 'border-style': floorQueryInfo.type === index }" @click="courseShow(index)">{{ item }}</li>
            </ul>
            <div class="more">更多></div>
          </header>
          <section class="training-course-detail">
            <router-link
              :to="{
                path: '/front/cdetail',
                query: {
                  id: item1.productID,
                },
              }"
              tag="div"
              v-for="item1 in courseDataObj.courseList"
              :key="item1.objectID"
            >
              <div class="training-course-detail-img">
                <img :src="item1.thumbnailUrl" alt="" />
              </div>
              <h4>{{ item1.productName }}</h4>
              <p>
                <img src="~assets/img/fire.png" alt="" />
                <span>{{ item1.buyCount }}人已购买</span>
              </p>
              <div>
                <span class="teach-name">主讲人 {{ item1.teacherName }}</span>
                <span class="course-price">￥{{ item1.basicPrice }}</span>
              </div>
            </router-link>
            <router-link
              :to="{
                path: '/front/cdetail',
                query: {
                  id: item2.productID,
                },
              }"
              tag="div"
              v-for="item2 in courseDataObj.classList"
              :key="item2.objectID"
            >
              <div class="training-course-detail-img">
                <img :src="item2.thumbnailUrl" alt="" />
              </div>
              <h4>{{ item2.productName }}</h4>
              <p>
                <img src="~assets/img/fire.png" alt="" />
                <span>{{ item2.buyCount }}人已购买</span>
              </p>
              <div>
                <span class="teach-name">主讲人 {{ item2.teacherName }}</span>
                <span class="course-price">￥{{ item2.basicPrice }}</span>
              </div>
            </router-link>
          </section>
        </div>
        <!-- 右侧信息---热门资讯、问答与免费资料 -->
        <div class="training-item-right-tips">
          <!-- 热门资讯 -->
          <div class="training-hot-news">
            <header>
              <div class="training-title">
                <span></span>
                <h5 class="tip-title">热门资讯</h5>
              </div>
              <router-link to="/front/newshome" tag="div" class="more black-more">更多></router-link>
            </header>
            <ul class="training-hot-news-list">
              <router-link
                tag="li"
                :to="{
                  path: '/front/newsd',
                  query: {
                    id: item1.pageID,
                  },
                }"
                v-for="(item1, index1) in dataItem.informationList.slice(0, 3)"
                :key="index1"
              >
                <div>{{ item1.pageName }}</div>
                <p>{{ item1.updateTime }}</p>
              </router-link>
            </ul>
          </div>
          <!-- 问答和免费资料 -->
          <el-tabs v-model="activeIndex">
            <el-tab-pane label="热门问答" name="0">
              <div class="hot-ask">
                {{ dataItem.askList[0].title }}
              </div>
              <div class="hot-avatar">
                <div class="hot-img-head">
                  <img :src="dataItem.askList[0].headUrl" alt="" />
                </div>
                <span class="hot-name">{{ dataItem.askList[0].askNickName }}</span>
                <div class="hot-collection">
                  <img src="~assets/img/collection.png" alt="" />
                  <span>{{ dataItem.askList[0].collectionNum }}</span>
                </div>
              </div>
              <div class="hot-answer">
                <div class="answer-content" v-html="dataItem.askList[0].answerText"></div>
                <router-link
                  tag="div"
                  :to="{
                    name: 'TProblemi',
                    params: {
                      id: dataItem.askList[0].askID,
                    },
                  }"
                  class="answer-check"
                  >查看</router-link
                >
              </div>
              <div class="hot-more">
                <router-link tag="div" to="/front/questionsA">更多 ></router-link>
              </div>
            </el-tab-pane>
            <el-tab-pane label="免费资料" name="1">
              <router-link
                tag="div"
                :to="{
                  name: 'LawsID',
                  params: {
                    id: item2.lawID,
                  },
                }"
                class="law-item"
                v-for="(item2, index2) in dataItem.lawList.slice(0, 2)"
                :key="index2"
              >
                <div class="law-item-name">
                  {{ item2.lawName }}
                </div>
                <p>发布时间：{{ item2.publishTime }}</p>
                <p>实施时间：{{ item2.implementationTime }}</p>
              </router-link>
              <div class="hot-more">
                <router-link tag="div" to="/front/laws">更多 ></router-link>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- 底部广告 -->
    <div class="training-item-bottom">
      <router-link
        :to="{
          path: '/front/cdetail',
          query: {
            id: getProductID(item3.path),
          },
        }"
        tag="div"
        class="training-item-bottom-advert"
        v-for="(item3, index3) in dataItem.downAdvertisementList"
        :key="index3"
      >
        <img :src="item3.imageUrl" alt="" />
      </router-link>
    </div>
  </section>
</template>

<script>
// 获取各类课程数据
import { recommCourses } from 'network/front_data.js'
import { homeFloorCourseList, homeFloorRecomCourseList } from 'network/course_data.js'
export default {
  name: 'TrainingItem',
  props: ['floorID', 'dataItem'],
  data() {
    return {
      // 课程数据'
      courseDataObj: {},
      // 控制问答和免费资料tab标签切换
      activeIndex: 0,
      // 课程分类
      courseCateArr: ['推荐', '在线课程', '远程培训班', '面授培训班'],
      // 课程获取参数
      floorQueryInfo: {
        floorID: null,
        seriesID: 0,
        // 当前的课程内容
        type: 0,
        pageSize: 6,
      },
    }
  },
  created() {
    this.floorQueryInfo.floorID = JSON.parse(JSON.stringify(this.floorID))
  },
  computed: {
    getProductID() {
      return (url) => {
        if (url == 1) return url
        let arr = url && url.split('?')
        let id = arr && arr[1].split('=')[1]
        return id
      }
    },
  },
  mounted() {
    this.getRecommCourses()
  },
  methods: {
    // 获取推荐课程数据
    getRecommCourses() {
      recommCourses(this.floorID).then((res) => {
        this.courseDataObj = res.data
      })
    },
    // 课程tab栏切换
    courseShow(index) {
      this.floorQueryInfo.type = index
      if (this.floorQueryInfo.type !== 0) {
        homeFloorCourseList(this.floorQueryInfo).then((res) => {
          this.courseDataObj.courseList = res.data.rows.slice(0, 3)
          this.courseDataObj.classList = res.data.rows.slice(3)
        })
      } else {
        homeFloorRecomCourseList(this.floorQueryInfo.floorID).then((res) => {
          this.courseDataObj = res.data
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.textDirection() {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
// background-color: #efefef;
// background-color: #fff;
.training-item-list {
  width: 80%;
  margin: 26px auto;
  max-width: 1230px;
  box-sizing: border-box;
  border-radius: 6px;
  .training-item-top {
    display: flex;
    height: 600px;
    .training-item-left-img {
      display: flex;
      width: 15vw;
      min-width: 210px;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
      div {
        height: 48%;
        cursor: pointer;
        img {
          height: 100%;
          width: 100%;
          border-radius: 6px;
        }
      }
    }
    .training-item-right {
      display: flex;
      width: 63vw;
      max-width: 1010px;
      height: 100%;
      border-radius: 6px;
      background-color: #fff;
      .training-item-right-course,
      .training-item-right-tips {
        padding: 0 8px 8px 8px;
        width: 44vw;
        max-width: 700px;
        height: 100%;
        header {
          display: flex;
          height: 60px;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          .training-title {
            display: flex;
            height: 100%;
            width: 10vw;
            align-items: center;
            span {
              display: inline-block;
              width: 10px;
              height: 10px;
              background-color: #4aa1f0;
            }
            h5 {
              margin-left: 6px;
              font-weight: 600;
            }
          }

          .more {
            margin-left: 55px;
            font-size: 12px;
            color: #ccc;
            white-space: nowrap;
            cursor: pointer;
          }
          .black-more {
            color: #333;
          }
        }
      }
      .training-course-cate {
        font-size: 14px;
        font-weight: 600;
        li {
          float: left;
          margin-left: 2vw;
          padding: 8px 2px;
          cursor: pointer;
        }
      }
      .training-course-detail {
        display: flex;
        width: 100%;
        height: 540px;
        flex-wrap: wrap;
        justify-content: space-between;
        > div {
          width: 31%;
          height: 45%;
          margin-bottom: 10px;
          cursor: pointer;
          .training-course-detail-img {
            width: 100%;
            height: 120px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 5px;
            }
          }
          h4 {
            font-size: 15px;
            font-weight: 600;
            word-break: break-all;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2; /* 这里是超出几行省略 */
            .textDirection();
          }
          p {
            img {
              width: 10px;
              height: 10px;
            }
            span {
              font-size: 12px;
            }
          }
          div {
            display: flex;
            width: 100%;
            justify-content: space-between;
            .teach-name {
              font-size: 14px;
            }
            .course-price {
              font-size: 20px;
              color: #f40;
            }
          }
        }
        &:after {
          content: '';
          height: 0;
          width: 31%;
        }
      }
      .training-item-right-tips {
        width: 18vw;
        height: 100%;
        max-width: 310px;
        box-sizing: border-box;
        .training-hot-news {
          padding: 0 8px;
          height: 48%;
          border-bottom: 1px solid #ddd;
          .tip-title {
            font-size: 18px;
          }
          .training-hot-news-list {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
            li {
              cursor: pointer;
            }
            p {
              font-size: 12px;
            }
            div {
              -webkit-line-clamp: 2; /* 这里是超出几行省略 */
              .textDirection();
            }
          }
        }
        /deep/ .el-tabs {
          padding: 0 8px;
        }
        /deep/ .el-tabs__nav {
          width: 100%;
          .el-tabs__item {
            width: 50%;
            text-align: center;
          }
        }
        .hot-ask {
          -webkit-line-clamp: 2; /* 这里是超出几行省略 */
          .textDirection();
        }
        .hot-avatar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .hot-img-head {
            display: flex;
            height: 45px;
            width: 45px;
            border-radius: 22.5px;
            border: 1px solid #ccc;
            justify-content: center;
            align-items: center;
            img {
              height: 38px;
              width: 38px;
            }
          }
          .hot-name {
            flex: 1;
          }
          .hot-collection {
            display: flex;
            align-items: center;
            img {
              width: 18px;
              height: 18px;
            }
          }
        }
        .hot-answer {
          margin-top: 8px;
          .answer-content {
            -webkit-line-clamp: 4; /* 这里是超出几行省略 */
            line-height: 18px;
            .textDirection();
          }
          .answer-check {
            padding: 8px;
            font-size: 13px;
            color: #71a8ef;
            text-align: right;
            cursor: pointer;
          }
        }
        .hot-more {
          display: flex;
          justify-content: center;
          div {
            height: 25px;
            width: 65px;
            font-size: 14px;
            text-align: center;
            border: 1px solid #ccc;
            border-radius: 12.5px;
            cursor: pointer;
          }
        }
        .law-item {
          margin-top: 20px;
          .law-item-name {
            color: #5d9cec;
            font-size: 15px;
            font-size: 15px;
            letter-spacing: 1px;
            cursor: pointer;
            -webkit-line-clamp: 2; /* 这里是超出几行省略 */
            .textDirection();
          }
          p {
            font-size: 13px;
            letter-spacing: 0.5px;
            color: #666;
          }
        }
      }
    }
  }
  .training-item-bottom {
    display: flex;
    width: 100%;
    margin-top: 14px;
    justify-content: space-between;
    .training-item-bottom-advert {
      width: 49%;
      height: 200px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
    }
  }
}
.border-style {
  color: #4aa1f0;
  border-bottom: 2px solid #4aa1f0;
}
</style>
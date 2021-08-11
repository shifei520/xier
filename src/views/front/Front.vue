<template>
  <div class="front">
    <!-- 轮播图组件 -->
    <swiper-nav />
    <!-- 特色项目模块 -->
    <div class="featured-items">
      <header>
        <img src="~assets/img/project.png" alt="" />
        <h4>特色项目</h4>
        <div><span></span></div>
      </header>
      <section class="featured-item-list">
        <div class="featured-item" v-for="(item, index) in featuredListArr" :key="index">
          <div class="featured-item-head">
            <img :src="item.logoImage" alt="" />
            <div>{{ item.categoryName }}</div>
          </div>
          <div class="featured-item-main">
            <ul>
              <router-link
                tag="li"
                :to="{
                  path: '/front/cdetail',
                  query: {
                    id: item1.productID,
                  },
                }"
                v-for="(item1, index1) in item.productList"
                :title="item1.productName"
                :key="index1"
              >
                {{ item1.productName }}
              </router-link>
            </ul>
          </div>
        </div>
      </section>
    </div>
    <!-- 培训专栏模块 -->
    <div class="training-column">
      <header>
        <img src="~assets/img/project.png" alt="" />
        <h4>培训专栏</h4>
        <div><span></span></div>
      </header>
      <training-item v-for="(item, index) in trainingDataArr" :key="index" :floorID="item.floorID" :dataItem="item" />
    </div>
    <!-- 机构数据图 -->
    <div class="data-statistic-img">
      <div class="img-content">
        <img src="~assets/img/data_num.png" alt="" />
      </div>
    </div>
    <!-- 荣誉展示区域 -->
    <div class="certificate-honor">
      <header>
        <img src="~assets/img/project.png" alt="" />
        <h4>西尔荣誉</h4>
        <div><span></span></div>
      </header>
      <section class="carousel-photo-honor">
        <swiper-honor />
      </section>
    </div>
    <!-- 课程优势区域 -->
    <div class="course-advantage">
      <header>
        <img src="~assets/img/project.png" alt="" />
        <h4>课程优势</h4>
        <div><span></span></div>
      </header>
      <section class="advantage-list">
        <div class="advantage-item" v-for="(item, index) in courseAdvantDataArr" :key="index" :style="{ backgroundImage: 'url(' + item.imgUrl + ')' }">
          <h5>{{ item.title }}</h5>
          <span>{{ item.text }}</span>
        </div>
      </section>
    </div>
    <!-- 各单位列表数据 -->
    <div class="unit-items-name">
      <div class="unit-content-tabs">
        <div class="unit-tab">
          <div :class="{ 'active-checked': nameIndex === 0 }" @click="tabSwitch(0)">生态环境部及直属单位</div>
          <div :class="{ 'active-checked': nameIndex === 1 }" @click="tabSwitch(1)">各省市服务单位</div>
        </div>
        <div class="unit-name" v-if="nameIndex === 0">
          <a :href="item.path" v-for="(item, index) in envirDataArr" :key="index">
            {{ item.name }}
          </a>
        </div>
        <div class="unit-name" v-else>
          <a :href="item.path" v-for="(item, index) in serviceDataArr" :key="index">
            {{ item.name }}
          </a>
        </div>
      </div>
    </div>
    <!-- 侧边滑块导航 -->
    <sider-bar />
  </div>
</template>

<script>
// 引入顶部轮播图组件
import SwiperNav from 'components/content/SwiperNav'
// 引入培训专栏组件
import TrainingItem from 'components/content/TrainingItem'
// 引入底部荣誉轮播图组件
import SwiperHonor from 'components/content/SwiperHonor'
// 引入侧边栏滑块组件
import SiderBar from 'components/common/SiderBar'
// 引入网络请求相关数据
import { featuredItemsData, trainingData, getData } from 'network/front_data.js'
export default {
  name: 'Front',
  components: {
    SwiperNav,
    TrainingItem,
    SwiperHonor,
    SiderBar,
  },
  data() {
    return {
      // 特色项目数据
      featuredListArr: [],
      // 培训专栏数据
      trainingDataArr: [],
      // 课程优势数据
      courseAdvantDataArr: [
        {
          title: '落实基础',
          text: '课程优势',
          imgUrl: require('assets/img/bc_1.png'),
        },
        {
          title: '分层教学',
          text: '课程优势',
          imgUrl: require('assets/img/bc_2.png'),
        },
        {
          title: '效果反馈',
          text: '课程优势',
          imgUrl: require('assets/img/bc_3.png'),
        },
        {
          title: '拓展转化',
          text: '课程优势',
          imgUrl: require('assets/img/bc_4.png'),
        },
        {
          title: '专属报告',
          text: '课程优势',
          imgUrl: require('assets/img/bc_5.png'),
        },
      ],
      // 生态环境单位数据
      envirDataArr: [],
      // 各省市服务单位数据
      serviceDataArr: [],
      // tab切换
      nameIndex: 0,
    }
  },
  created() {
    this.getFeaturedData()
    this.getStaticData()
  },
  mounted() {
    this.getTrainingData()
  },
  methods: {
    // 获取特色项目数据
    getFeaturedData() {
      featuredItemsData().then((res) => {
        this.featuredListArr = res.data.rows
      })
    },
    // 获取培训专栏数据
    getTrainingData() {
      trainingData().then((res) => {
        this.trainingDataArr = res.data
      })
    },
    // 获取静态资源数据
    getStaticData() {
      getData().then((res) => {
        this.envirDataArr = res.data_1
        this.serviceDataArr = res.data_2
      })
    },
    // 控制单位tab切换
    tabSwitch(index) {
      this.nameIndex = index
    },
  },
}
</script>

<style lang="less" scoped>
.featured-items,
.training-column,
.certificate-honor,
.course-advantage {
  background-color: #efefef;
  header {
    display: flex;
    height: 40px;
    margin: 20px 0;
    padding: 20px 0;
    justify-content: center;
    align-items: center;
    img {
      width: 28px;
      height: 40px;
    }
    h4 {
      margin: 0 10px;
      font-size: 36px;
      letter-spacing: 4px;
    }
    div {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: flex-end;
      span {
        width: 10px;
        height: 10px;
        background-color: #4aa1f0;
      }
    }
  }
}
.featured-items {
  background-color: #fff;
}
.featured-item-list {
  display: flex;
  margin: 0 auto;
  max-width: 1230px;
  justify-content: space-between;
  .featured-item {
    width: 23%;
    height: 164px;
    border: 1px solid #eee;
    border-radius: 6px;
    .featured-item-head {
      display: flex;
      padding: 5px 0;
      height: 50px;
      justify-content: center;
      align-items: center;
      img {
        height: 35px;
        width: 35px;
      }
      div {
        margin-left: 15px;
      }
    }
    .featured-item-main {
      padding: 0 25px;
      color: rgba(0, 0, 0, 0.65);
      ul > li {
        height: 30px;
        line-height: 30px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
      }
    }
  }
}
.data-statistic-img {
  display: flex;
  width: 100%;
  height: 160px;
  align-items: center;
  .img-content {
    margin: 0 auto;
    width: 80vw;
    height: 56px;
    max-width: 1230px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.certificate-honor {
  background-color: #fff;
  .carousel-photo-honor {
    width: 80vw;
    max-width: 1230px;
    height: 360px;
    margin: 0 auto;
  }
}
.course-advantage {
  margin-top: 46px;
  background-color: #fff;
  .advantage-list {
    display: flex;
    margin: 0 auto;
    padding: 20px 0;
    width: 80vw;
    justify-content: space-between;
    .advantage-item {
      display: flex;
      width: 18%;
      height: 130px;
      color: #fff;
      background: no-repeat 50%;
      background-size: cover;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h5 {
        font-size: 23px;
        margin-bottom: 6px;
      }
    }
  }
}
.unit-items-name {
  color: #fff;
  background-color: #000;
  .unit-content-tabs {
    margin: 0 auto;
    width: 80vw;
    max-width: 1230px;
    .unit-tab {
      display: flex;
      height: 80px;
      width: 100%;
      line-height: 80px;
      cursor: pointer;
      div {
        width: 50%;
        text-align: center;
      }
      .active-checked {
        color: #4aa1f0;
      }
    }
    .unit-name {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 2px solid #fff;
      border-top: 2px solid #fff;
      a {
        padding: 10px;
        width: 20%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
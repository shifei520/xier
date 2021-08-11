<template>
  <div id="teacher-page">
    <!-- 教师分类 -->
    <header class="teacher-cate">
      <p>筛选:</p>
      <div v-for="(item, index) in TCategory" :key="index" :class="{ activeClass: teacherCategoryID === item.teacherCategoryID }" @click="cateSwitch(item.teacherCategoryID)">
        {{ item.categoryName }}
      </div>
    </header>
    <!-- 列表数据展示 -->
    <section class="teacher-list">
      <router-link
        class="teacher-item"
        v-for="(item, index) in teacherArr"
        :key="index"
        :to="{
          path: '/front/tdetail',
          query: {
            id: item.teacherID,
          },
        }"
        tag="div"
      >
        <img :src="item.photoUrl" alt="" />
        <main>
          <p>{{ item.teacherName }}</p>
          <span>{{ item.titleLevel }}</span>
          <div class="teacher-intro">{{ item.introduction }}</div>
          <div class="teacher-detail"><span>老师主页</span><span class="iconfont">&nbsp;&#xe603;</span></div>
        </main>
      </router-link>
    </section>
  </div>
</template>

<script>
// 网络请求函数
import { teacherCategory, teacherList } from 'network/teacher_data.js'
export default {
  name: 'Teacher',
  data() {
    return {
      // 教师分类数据
      TCategory: [],
      // 当前分类id
      teacherCategoryID: 0,
      // 教师列表数据
      teacherArr: [],
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      teacherCategory().then((res) => {
        this.TCategory = res.data
      })
      this.getTeacherList()
    },
    // 点击不同分类教师筛选
    cateSwitch(id) {
      this.teacherCategoryID = id
      this.getTeacherList()
    },
    // 获取教师信息列表
    getTeacherList() {
      teacherList(this.teacherCategoryID).then((res) => {
        this.teacherArr = res.data.rows
      })
    },
  },
}
</script>

<style lang="less" scoped>
#teacher-page {
  background-color: #f5f5f5;
  overflow: hidden;
  .teacher-cate {
    display: flex;
    height: 60px;
    min-width: 1230px;
    max-width: 1230px;
    margin: 40px auto 20px;
    font-size: 14px;
    background-color: #fff;
    align-items: center;
    p {
      margin: 0 10px;
    }
    div {
      margin-right: 8px;
      padding: 0 9px;
      border-radius: 9px;
      cursor: pointer;
      transition: all 0.3s;
    }
  }
  .teacher-list {
    display: flex;
    margin: 0 auto;
    width: 1230px;
    min-width: 1230px;
    flex-wrap: wrap;
    justify-content: space-between;
    .teacher-item {
      position: relative;
      display: flex;
      margin-bottom: 30px;
      padding: 10px 20px 10px 10px;
      width: 390px;
      background-color: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      cursor: pointer;
      transition: all 0.3s;
      img {
        width: 140px;
        height: 180px;
      }
      main {
        width: 220px;
        padding-top: 10px;
        margin-left: 20px;
        box-sizing: border-box;
        p {
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 1px;
        }
        span {
          display: inline-block;
          margin: 8px 0;
          font-size: 14px;
          line-height: 16px;
        }
        .teacher-intro {
          display: -webkit-box;
          font-size: 13px;
          color: #999;
          line-height: 18px;
          -webkit-line-clamp: 4;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
        }
        .teacher-detail {
          position: absolute;
          bottom: 0;
          right: 20px;
          span {
            color: #4aa1f0;
            font-size: 12px;
          }
        }
      }
      &:hover {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
        transform: translateY(-5px);
      }
    }
  }
}
.activeClass {
  position: relative;
  background: rgba(31, 162, 248, 0.1);
  border: none;
  color: #1fa2f8;
  -webkit-box-reflect: below 2px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(255, 255, 255, 0.51)));
}
</style>
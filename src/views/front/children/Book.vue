<template>
  <div id="book">
    <div class="content">
      <main>
        <header class="book-category">
          <span>筛选:</span>
          <ul>
            <li>
              <span @click="allBook" :class="{ acticeClass: isAllBtnChecked }">全部</span>
            </li>
            <li v-for="(item, index) in bookCategory" :key="index" @click="cateSwitch(item.categoryID)">
              <span :class="{ acticeClass: item.categoryID === categoryID }">{{ item.categoryName }}</span>
            </li>
          </ul>
        </header>
        <section class="book-list">
          <ul>
            <router-link
              v-for="(item, index) in bookDataArr"
              :key="index"
              :to="{
                path: '/front/bdetail',
                query: {
                  id: item.productID,
                },
              }"
              tag="li"
            >
              <img :src="item.thumbnailUrl" alt="" />
              <p>{{ item.productName }}</p>
              <p class="price">￥{{ item.basicPrice }}</p>
            </router-link>
          </ul>
          <el-pagination background layout="prev, pager, next" :total="totalBook" :page-size="queryInfo.pageSize" :current-page="queryInfo.pageNo" @current-change="pageChange"> </el-pagination>
        </section>
      </main>
      <aside-recomm :recommendCourse="recommendCourse" />
    </div>
  </div>
</template>

<script>
// 获取网络请求函数
import { bookClassify, allBookList, asideRecommData } from 'network/book_data.js'
// 引入侧边课程推荐组件
import AsideRecomm from 'components/content/AsideRecomm'
export default {
  name: 'Book',
  components: {
    AsideRecomm,
  },
  data() {
    return {
      // 书籍分类数据
      bookCategory: null,
      // 当前分类id
      categoryID: null,
      // 全部按钮是否被选中
      isAllBtnChecked: true,
      // 获取全部图书列表参数
      queryInfo: {
        pageNo: 1,
        pageSize: 20,
      },
      // 书籍列表数据
      bookDataArr: [],
      // 总书籍数量
      totalBook: 0,
      // 推荐课程数据
      recommendCourse: [],
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 获取初始化数据
    initData() {
      // 获取书籍分类数据
      bookClassify().then((res) => {
        this.bookCategory = res.data.rows
      })
      // 获取第一页全部书籍数据
      this.getAllBookList()
      // 获取侧边栏推荐数据
      asideRecommData().then((res) => {
        this.recommendCourse = res.data.rows
      })
    },
    // 点击书籍分类
    cateSwitch(id) {
      this.categoryID = id
      this.isAllBtnChecked = false
      allBookList({ categoryID: this.categoryID }).then((res) => {
        this.bookDataArr = res.data.rows
        this.totalBook = res.data.totalRows
      })
    },
    // 获取全部书籍数据
    getAllBookList() {
      allBookList(this.queryInfo).then((res) => {
        this.bookDataArr = res.data.rows
        this.totalBook = res.data.totalRows
      })
    },
    // 点击全部书籍
    allBook() {
      this.isAllBtnChecked = true
      this.categoryID = null
      this.getAllBookList()
    },
    // 页数改变时事件
    pageChange(val) {
      this.queryInfo.pageNo = val
      this.getAllBookList()
    },
  },
}
</script>

<style lang="less" scoped>
#book {
  background-color: #f0f2f5;
  box-sizing: border-box;
  overflow: hidden;
  .content {
    display: flex;
    width: 80vw;
    max-width: 1230px;
    margin: 20px auto;
    justify-content: space-between;
    main {
      width: 78%;
      .book-category {
        display: flex;
        padding-left: 20px;
        width: 100%;
        height: 64px;
        line-height: 64px;
        font-size: 14px;
        background-color: #fff;
        box-sizing: border-box;
        ul {
          display: flex;
          li {
            margin-left: 8px;
            span {
              padding: 4px 8px;
              border-radius: 6px;
              transition: all 0.5s;
            }
          }
        }
      }
      .book-list {
        margin-top: 20px;
        width: 100%;
        background-color: #fff;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            display: flex;
            padding: 0 20px;
            width: 20%;
            height: 240px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            cursor: pointer;
            img {
              width: 120px;
              height: 140px;
            }
            p {
              width: 100%;
              color: #333;
              font-size: 13px;
              -webkit-line-clamp: 2;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
            .price {
              color: #ff5d4c;
              font-size: 16px;
              font-weight: 600;
            }
          }
        }
        /deep/ .el-pagination {
          text-align: center;
        }
      }
    }
  }
}
.acticeClass {
  color: #fff;
  background-color: #1fa2f8;
}
</style>
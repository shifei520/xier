<template>
  <div class="news-home">
    <main>
      <el-row>
        <el-col :span="19">
          <div class="newsItem" v-for="(item, index) in newsListArr" :key="index">
            <router-link
              tag="p"
              :to="{
                path: '/front/newsd',
                query: {
                  id: item.pageID,
                },
              }"
              class="newsTitle"
            >
              {{ item.pageName }}
            </router-link>
            <p class="newsTime">发布时间：{{ item.updateTime }}</p>
          </div>
        </el-col>
        <el-col :span="5"></el-col>
      </el-row>
      <el-row>
        <el-col :span="19">
          <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="totalNews" :page-size="queryInfo.pageSize" :current-page="queryInfo.pageNo" @current-change="pageChange"> </el-pagination>
          </div>
        </el-col>
        <el-col :span="5"></el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
// 所有资讯列表请求函数
import { allNewsList } from 'network/news_data.js'
export default {
  name: 'Newshome',
  data() {
    return {
      // 资讯列表
      newsListArr: [],
      // 总资讯条数
      totalNews: 0,
      // 资讯列表请求参数
      queryInfo: {
        pageNo: 1,
        pageSize: 5,
      },
    }
  },
  created() {
    // 页面加载时显示第一页资讯
    this.getAllNewsList()
  },
  methods: {
    // 获取资讯列表
    getAllNewsList() {
      allNewsList(this.queryInfo).then((res) => {
        this.newsListArr = res.data.rows
        this.totalNews = res.data.totalRows
      })
    },
    // 点击分页器获取资讯列表
    pageChange(val) {
      this.queryInfo.pageNo = val
      this.getAllNewsList()
    },
  },
}
</script>

<style lang="less" scoped>
.news-home {
  background: #f0f2f5;
  main {
    max-width: 1230px;
    margin: 0 auto;
    overflow: hidden;
    .el-row {
      margin-top: 20px;
      .el-col-19 {
        background-color: #fff;
        .newsItem {
          padding: 16px;
          border-bottom: 1px solid #efefef;
          .newsTitle {
            font-size: 20px;
            margin-bottom: 10px;
            cursor: pointer;
            &:hover {
              color: #1fa2f8;
            }
          }
          .newsTime {
            color: #b2b2b2;
            font-size: 14px;
          }
        }
        .pagination {
          background-color: #f0f2f5;
          text-align: center;
        }
      }
    }
  }
}
</style>
<template>
  <div class="new-sd">
    <main>
      <el-row>
        <el-col :span="19">
          <div class="content">
            <p class="news-title">{{ newsDetail.pageName }}</p>
            <p class="news-time">{{ newsDetail.updateTime }}</p>
            <div v-html="newsDetail.webContent"></div>
          </div>
        </el-col>
        <el-col :span="5"></el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
import { hotNews } from 'network/news_data.js'
export default {
  name: 'Newsd',
  data() {
    return {
      // 热门资讯内容
      newsDetail: {},
      // 资讯id
      informationID: null,
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      this.informationID = this.$route.query.id
      hotNews(this.informationID).then((res) => {
        this.newsDetail = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
.new-sd {
  background: #f0f2f5;
  main {
    max-width: 1230px;
    margin: 0 auto;
    overflow: hidden;
    .el-row {
      margin-top: 20px;
      .el-col-19 {
        background-color: #fff;
        .content {
          padding: 30px 25px;
          box-sizing: border-box;
          .news-title {
            font-size: 24px;
            color: #333;
          }
          .news-time {
            margin-bottom: 15px;
            color: rgba(0, 0, 0, 0.65);
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
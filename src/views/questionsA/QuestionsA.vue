<template>
  <div class="all-question">
    <main>
      <header>
        <el-row>
          <el-col :span="15">
            <div class="category-question">
              <ul>
                <li>
                  <span :class="{ acticeClass: questionInfo.askCategoryID === null }" @click="seriesSwitch(null)">热门问题</span>
                </li>
                <li v-for="(item, index) in questionSortArr" :key="index">
                  <span :class="{ acticeClass: questionInfo.askCategoryID === item.askCategoryID }" @click="seriesSwitch(item.askCategoryID)">{{ item.categoryName }}</span>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="small" @click="goAnswerPage">等我回答</el-button>
          </el-col>
          <el-col :span="7">
            <el-input placeholder="搜索感兴趣的问题" v-model="questionInfo.title" size="small">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="searchQuestion"></i>
            </el-input>
            <el-button type="danger" size="small" @click="bringOutQuestion">提问</el-button>
          </el-col>
        </el-row>
      </header>
      <el-row>
        <el-col :span="17"> <question-item v-for="(item, index) in questionListArr" :key="index" :questionDetail="item" @reloadData="reloadData" /> </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="6">
          <aside-question :hotQuestionListArr="hotQuestionListArr" />
        </el-col>
      </el-row>
      <el-pagination background layout="prev, pager, next" :total="totalQuestions" :page-size="questionInfo.pageSize" :current-page="questionInfo.pageNo" @current-change="pageChange"> </el-pagination>
    </main>
    <save-ask :outVisible="outerVisible" @reLoadQuesion="reLoadQuesion" @cancel="cancelAction" />
  </div>
</template>

<script>
import { questionSeries, questionsList, hotQuestionRecomm } from 'network/question_data.js'
// 引入问题组件
import QuestionItem from 'components/content/QuestionItem'
// 引入侧边栏热门问题推荐组件
import AsideQuestion from 'components/content/AsideQuestion'
import { mapState } from 'vuex'
// 引入发表问题组件
import SaveAsk from 'components/content/SaveAsk'
export default {
  name: 'QuestionsA',
  components: {
    QuestionItem,
    AsideQuestion,
    SaveAsk,
  },
  data() {
    return {
      // 问题分类数据
      questionSortArr: [],
      // 问题列表请求参数
      questionInfo: {
        // 问题分类id
        askCategoryID: null,
        pageNo: 1,
        pageSize: 10,
        // 搜索问题的文本
        title: '',
        viewPageID: null,
      },
      // 问题列表数据
      questionListArr: [],
      // 热门问题推荐请求参数
      hotQuestionInfo: {
        pageNo: 1,
        pageSize: 3,
        viewPageID: 16,
      },
      // 热门问题推荐列表数据
      hotQuestionListArr: [],
      // 问题总数
      totalQuestions: 0,
      // 提出问题外层对话框
      outerVisible: false,
    }
  },
  created() {
    this.getQuestionSeries()
    this.getQuestionList()
    this.getHotQuestionRecomm()
  },
  computed: {
    ...mapState(['isLogin']),
  },
  methods: {
    // 获取问题分类
    getQuestionSeries() {
      questionSeries().then((res) => {
        this.questionSortArr = res.data
      })
    },
    // 获取热门推荐问题数据
    getHotQuestionRecomm() {
      hotQuestionRecomm(this.hotQuestionInfo).then((res) => {
        this.hotQuestionListArr = res.data.rows
      })
    },
    // 点击切换问题分类
    seriesSwitch(val) {
      this.questionInfo.askCategoryID = val
      this.getQuestionList()
    },
    //  获取问题列表数据
    getQuestionList() {
      questionsList(this.questionInfo).then((res) => {
        this.questionListArr = res.data.rows
        this.totalQuestions = res.data.totalRows
      })
    },
    // 子组件点击点赞按钮
    reloadData() {
      this.getQuestionList()
    },
    // 分页器页数改变时触发事件
    pageChange(val) {
      this.questionInfo.pageNo = val
      this.getQuestionList()
    },
    // 去回答界面
    goAnswerPage() {
      this.$router.push('/front/answer')
    },
    // 搜索感兴趣的问题
    searchQuestion() {
      if (this.questionInfo.title.trim() === '')
        return this.$message({
          message: '搜索内容不能为空',
          type: 'warning',
        })
      this.getQuestionList()
    },
    // 提出问题
    bringOutQuestion() {
      if (!this.isLogin) return this.$router.push('/login')
      this.outerVisible = true
    },
    // 从新请求问题列表
    reLoadQuesion() {
      this.getQuestionList()
      this.outerVisible = false
    },
    cancelAction() {
      this.outerVisible = false
    },
  },
}
</script>

<style lang="less" scoped>
.all-question {
  background: #f0f2f5;
  main {
    max-width: 1230px;
    margin: 0 auto;
    overflow: hidden;
    header {
      padding: 10px 14px;
      margin-top: 20px;
      background-color: #fff;
      .el-col-15 {
        font-size: 14px;
        box-sizing: border-box;
        .category-question {
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
      .el-col-7 {
        .el-input {
          width: 70%;
          .el-icon-search {
            cursor: pointer;
          }
        }
        .el-button {
          margin-left: 5px;
        }
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
}
.acticeClass {
  color: #fff;
  background-color: #1fa2f8;
}
</style>
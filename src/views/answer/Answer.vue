<template>
  <div class="answer">
    <main>
      <header>
        <el-row>
          <el-col :span="15">
            <div class="category-question">
              <ul>
                <li>
                  <span :class="{ acticeClass: waitResponse.askCategoryID === null }" @click="seriesSwitch(null)">热门问题</span>
                </li>
                <li v-for="(item, index) in questionSortArr" :key="index">
                  <span :class="{ acticeClass: waitResponse.askCategoryID === item.askCategoryID }" @click="seriesSwitch(item.askCategoryID)">{{ item.categoryName }}</span>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="1"> &nbsp; </el-col>
          <el-col :span="8">
            <el-input placeholder="搜索感兴趣的问题" v-model="waitResponse.title" size="small">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="searchQuestion"></i>
            </el-input>
            <el-button type="primary" size="small" @click="outerVisible = true">提问</el-button>
          </el-col>
        </el-row>
      </header>
      <section>
        <el-row>
          <el-col :span="15">
            <div class="no-answer-item" v-for="(item, index) in noAnswerArr" :key="index">
              <div class="title">
                {{ item.title }}
                <span class="iconfont">&#xe611;</span>
              </div>
              <p>
                <router-link
                  tag="span"
                  :to="{
                    name: 'TProblemi',
                    params: {
                      id: item.askID,
                    },
                  }"
                  >回答问题</router-link
                ><span class="iconfont">&#xe609;</span><span>0个问答</span>
              </p>
            </div>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="8" class="el-col_7">
            <header>
              <span>优秀环保大咖</span>
              <span>更多></span>
            </header>
            <ul class="user-rank">
              <li v-for="(item, index) in userRankArr" :key="index">
                <span>{{ index + 1 }}</span>
                <router-link
                  tag="img"
                  :to="{
                    name: 'Hisun',
                    params: {
                      id: item.userID,
                    },
                  }"
                  :src="item.headUrl"
                  alt=""
                />
                <i>{{ item.nickName }}</i>
              </li>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <!-- 未回答问题分页器 -->
            <el-pagination layout="prev, pager, next" :total="totalNoAnswer" :page-size="waitResponse.pageSize" :current-page="waitResponse.pageNo" @current-change="askPageChange"> </el-pagination
          ></el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="8">
            <!-- 优秀大咖分页器 -->
            <el-pagination layout="prev, pager, next" :total="totalUser" :page-size="userRankInfo.pageSize" :current-page="userRankInfo.pageNo" @current-change="userPageChange"> </el-pagination>
          </el-col>
        </el-row>
      </section>
      <el-dialog title="提问" :visible.sync="outerVisible" width="30%">
        <el-dialog width="30%" title="提问" :visible.sync="innerVisible" append-to-body>
          <p>添加图片（最多3张）：</p>
          <quill-editor v-model="bringOutQuestion.askText" />
          <div class="submitBtn clearfix">
            <el-button @click="innerVisible = false" size="mini">上一步</el-button>
            <el-button type="danger" @click="raiseAsk" size="mini">提交</el-button>
          </div>
        </el-dialog>
        <!-- 外层输入框内容 -->
        <p>添加标题（最多40个字）：</p>
        <el-input v-model="bringOutQuestion.title" placeholder="请输入问题"></el-input>
        <p>选择分类：</p>
        <el-select v-model="bringOutQuestion.askCategoryID" placeholder="请选择">
          <el-option v-for="item in questionSortArr" :key="item.askCategoryID" :label="item.categoryName" :value="item.askCategoryID"> </el-option>
        </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="danger" @click="innerVisible = true">下一步</el-button>
        </div>
      </el-dialog>
    </main>
  </div>
</template>

<script>
import { questionSeries } from 'network/question_data.js'
import { noAnswerList, userAnswerRank, askQuestion } from 'network/answer_data.js'
import { mapState } from 'vuex'
export default {
  name: 'Answer',
  data() {
    return {
      // 问题分类数据
      questionSortArr: [],
      // 等待回答的问题参数
      waitResponse: {
        askCategoryID: null,
        pageNo: 1,
        pageSize: 10,
        // 搜索框内容
        title: '',
      },
      // 未回答问题列表
      noAnswerArr: [],
      // 未回答问题的总数
      totalNoAnswer: 0,
      // 优秀环保大咖请求参数
      userRankInfo: {
        pageNo: 1,
        pageSize: 10,
      },
      // 优秀环保大咖列表数据
      userRankArr: [],
      // 优秀环保大咖总数
      totalUser: 0,
      // 提出问题外层对话框显示
      outerVisible: false,
      // 提出问题内层对话框显示
      innerVisible: false,
      // 提出问题相关参数
      bringOutQuestion: {
        askCategoryID: '',
        askText: '',
        isReview: 0,
        title: '',
      },
    }
  },
  created() {
    this.getQuestionSeries()
    this.getNoAnswerList()
    this.getUserAnswerRank()
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
    // 点击切换问题分类
    seriesSwitch(val) {
      this.waitResponse.askCategoryID = val
    },
    // 获取未回答问题的列表数据
    getNoAnswerList() {
      noAnswerList(this.waitResponse).then((res) => {
        this.noAnswerArr = res.data.rows
        this.totalNoAnswer = res.data.totalRows
      })
    },
    // 为回答问题数据页数改变事件
    askPageChange(val) {
      this.waitResponse.pageNo = val
      this.getNoAnswerList()
    },
    // 获取优秀环保大咖排名数据
    getUserAnswerRank() {
      userAnswerRank(this.userRankInfo).then((res) => {
        this.userRankArr = res.data.rows
        this.totalUser = res.data.totalRows
      })
    },
    // 优秀大咖分页器页数改变事件
    userPageChange(val) {
      this.userRankInfo.pageNo = val
      this.getUserAnswerRank()
    },
    // 点击搜素按钮搜索问题
    searchQuestion() {
      if (this.waitResponse.title.trim() === '')
        return this.$message({
          message: '请输入搜索内容',
          type: 'warning',
        })
      this.getNoAnswerList()
    },
    // 提出问题
    raiseAsk() {
      if (!this.isLogin) return this.$router.push('/login')
      if (this.bringOutQuestion.title.trim() === '')
        return this.$message({
          message: '请输入问题内容',
          type: 'warning',
        })
      this.bringOutQuestion.askCategoryID = this.bringOutQuestion.askCategoryID.toString()
      askQuestion(this.bringOutQuestion).then((res) => {
        if (res.code === 200) {
          this.getNoAnswerList()
          this.innerVisible = false
          this.outerVisible = false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.answer {
  background: #f0f2f5;
  main {
    max-width: 1230px;
    margin: 0 auto;
    overflow: hidden;
    header {
      .el-col-15 {
        height: 100px;
        padding: 10px 14px;
        margin-top: 20px;
        font-size: 14px;
        background-color: #fff;
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
              line-height: 32px;
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
      .el-col-8 {
        height: 100px;
        padding: 10px 14px;
        margin-top: 20px;
        background-color: #fff;
        .el-input {
          width: 70%;
          .el-input__icon {
            cursor: pointer;
          }
        }
        .el-button {
          margin-left: 5px;
        }
      }
    }
    section {
      margin-top: 20px;
      .el-col-15 {
        padding: 20px;
        background-color: #fff;
        .no-answer-item {
          padding-top: 20px;
          .title {
            position: relative;
            color: #000;
            font-size: 26px;
            font-weight: 700;
            span {
              position: absolute;
              right: 0;
              bottom: 0;
              font-size: 20px;
            }
          }
          p {
            margin-top: 30px;
            font-size: 14px;
            span {
              &:first-child {
                color: #1fa2f8;
                cursor: pointer;
              }
              &:nth-child(2) {
                margin: 0 15px;
              }
            }
          }
        }
      }
      .el-col_7 {
        padding: 20px 20px 10px;
        background-color: #fff;
        header {
          display: flex;
          height: 32px;
          border-bottom: 1px solid #ccc;
          justify-content: space-between;
          span {
            font-size: 14px;
            &:first-child {
              color: rgb(51, 122, 213);
              font-weight: 600;
            }
            &:last-child {
              color: #1fa2f8;
            }
          }
        }
        .user-rank {
          li {
            height: 52px;
            line-height: 52px;
            img {
              margin-left: 40px;
              margin-right: 5px;
              width: 40px;
              height: 40px;
              cursor: pointer;
              border-radius: 50%;
            }
            i {
              font-weight: 600;
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}
.acticeClass {
  color: #fff;
  background-color: #1fa2f8;
}
.el-pagination {
  text-align: center;
}
/deep/ .el-dialog {
  p {
    height: 40px;
    line-height: 40px;
  }
  .el-select {
    width: 100%;
  }
  .ql-container {
    min-height: 400px;
  }
  .submitBtn {
    margin-top: 10px;
    text-align: right;
  }
}
</style>
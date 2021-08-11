<template>
  <div class="hisun">
    <main>
      <!-- 头部用户信息 -->
      <header class="user-header">
        <img :src="hisunUserInfo.headUrl" alt="" />
        <div class="user-introduce">
          <h4>{{ hisunUserInfo.nickName }}</h4>
          <p>{{ hisunUserInfo.introduction }}</p>
        </div>
        <div class="user-attention">
          <div class="attention-num">
            <span>{{ hisunUserInfo.attentionCount }}</span>
            <p>粉丝</p>
          </div>
          <div class="attention-num">
            <span>{{ hisunUserInfo.askCount }}</span>
            <p>文章</p>
          </div>
          <div class="attention-num">
            <span>{{ hisunUserInfo.attentionCount }}</span>
            <p>阅读量</p>
          </div>
          <div class="attention-btn">
            <el-button
              :type="hisunUserInfo.isAttention === 0 ? 'primary' : 'info'"
              :icon="hisunUserInfo.isAttention === 0 ? 'el-icon-circle-plus-outline' : 'el-icon-view'"
              size="small"
              @click="attentionBtnClick"
              >{{ hisunUserInfo.isAttention === 0 ? '关注ta' : '已关注' }}</el-button
            >
          </div>
        </div>
      </header>
      <!-- 问题和文章内容 -->
      <section class="user-content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="TA的问题" name="first">
            <!-- 问题列表 -->
            <ul class="question-list">
              <li v-for="(item, index) in hisunQuestionArr" :key="index">
                <div v-html="item.answerText" class="question-answer"></div>
                <div class="problem">&nbsp;&nbsp;问：{{ item.title }}</div>
                <p><span class="iconfont">&#xe7fe;</span>&nbsp;&nbsp;{{ item.likeNum }}</p>
                <hr />
              </li>
            </ul>
            <!-- 问题列表分页器 -->
            <el-pagination
              layout="prev, pager, next"
              :total="totalRows"
              :page-size="hisunEssayParams.pageSize"
              :current-page="hisunEssayParams.pageNo"
              @current-change="questionPageChange"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="TA的文章" name="second">
            <!-- 文章列表 -->
            <ul class="essay-list">
              <li v-for="(item, index) in hisunQuestionArr" :key="index">
                <div class="problem">&nbsp;&nbsp;问：{{ item.title }}</div>
                <div v-html="item.answerText" class="question-answer"></div>
                <p><span class="iconfont">&#xe7fe;</span>&nbsp;&nbsp;{{ item.likeNum }}</p>
                <hr />
              </li>
            </ul>
            <!-- 文章列表分页器 -->
            <el-pagination
              layout="prev, pager, next"
              :total="totalRows"
              :page-size="hisunEssayParams.pageSize"
              :current-page="hisunEssayParams.pageNo"
              @current-change="questionPageChange"
            ></el-pagination>
          </el-tab-pane>
        </el-tabs>
      </section>
    </main>
    <sider-bar />
  </div>
</template>

<script>
import { hisunUserInfo, focusOnUser, unFocusUser } from 'network/user_data.js'
import { hisunEssayAndAsk } from 'network/answer_data.js'
// 引入侧边栏组件
import SiderBar from 'components/common/SiderBar'
export default {
  name: 'Hisun',
  components: {
    SiderBar,
  },
  data() {
    return {
      // 大咖用户id
      userID: null,
      // 大咖用户信息
      hisunUserInfo: {},
      // 关注后用户id
      attentionID: null,
      // 控制文章和标签页的显示切换
      activeName: 'first',
      // 获取大咖的问题和文章参数
      hisunEssayParams: {
        userID: null,
        type: 1,
        pageNo: 1,
        pageSize: 10,
      },
      // 大咖的问题和文章总数
      totalRows: 0,
      // 大咖的问题文章列表数据
      hisunQuestionArr: [],
      // 点击文章标签切换时值请求一次文章数据
      isActive: true,
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      this.userID = this.$route.params.id
      this.hisunEssayParams.userID = this.$route.params.id
      // 大咖信息
      hisunUserInfo(this.userID).then((res) => {
        this.hisunUserInfo = res.data
      })
      // 大咖文章和问题信息
      this.getHisunEssayData()
    },
    // 关注和取关用户
    attentionBtnClick() {
      if (!this.attentionID) {
        // 关注用户
        focusOnUser(this.userID).then((res) => {
          if (res.code === 200) {
            hisunUserInfo(this.userID).then((res) => {
              this.hisunUserInfo = res.data
              this.attentionID = res.data.attentionID
            })
          }
        })
      } else {
        // 取关用户
        unFocusUser(this.attentionID).then((res) => {
          if (res.code === 200) {
            hisunUserInfo(this.userID).then((res) => {
              this.hisunUserInfo = res.data
              this.attentionID = null
            })
          }
        })
      }
    },
    // 点击选中的tab键触发
    handleClick() {
      this.hisunEssayParams.type === 1 ? (this.hisunEssayParams.type = 2) : (this.hisunEssayParams.type = 1)
      if (this.activeName === 'second') {
        this.hisunEssayParams.pageNo = 1
        this.getHisunEssayData()
      } else {
        this.hisunEssayParams.pageNo = 1
        this.getHisunEssayData()
      }
    },
    // 获取大咖的问题和文章数据
    getHisunEssayData() {
      hisunEssayAndAsk(this.hisunEssayParams).then((res) => {
        this.hisunQuestionArr = res.data.rows
        this.totalRows = res.data.totalRows
      })
    },
    // 问题列表分页器页数改变事件
    questionPageChange(val) {
      this.hisunEssayParams.pageNo = val
      this.getHisunEssayData()
    },
  },
}
</script>

<style lang="less" scoped>
.hisun {
  background: #f4f4f4;
  overflow: hidden;
  main {
    margin: 20px auto;
    width: 80%;
    .user-header {
      display: flex;
      padding: 30px;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      box-sizing: border-box;
      img {
        width: 150px;
        height: 150px;
      }
      .user-attention {
        width: 45%;
        .attention-num {
          display: inline-block;
          padding: 10px 0;
          width: 25%;
          text-align: center;
          border-right: 1px solid red;
          span {
            font-size: 38px;
          }
          p {
            font-size: 14px;
          }
        }
        .attention-btn {
          margin-top: 20px;
          text-align: center;
        }
      }
      .user-introduce {
        flex: 1;
        margin-left: 40px;
        h4 {
          font-size: 20px;
        }
        p {
          margin-top: 15px;
          font-size: 15px;
        }
      }
    }
    .user-content {
      margin-top: 20px;
      padding: 30px;
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      .question-list,
      .essay-list {
        li {
          position: relative;
          padding: 15px 20px;
          box-sizing: border-box;
          /deep/ .question-answer {
            a {
              color: #1fa2f8;
              font-size: 15px;
              font-weight: 600;
            }
            p,
            span {
              font-size: 15px;
              font-weight: 500;
            }
          }
          .problem {
            background-color: #f9fbfb;
            height: 80px;
            line-height: 80px;
            color: #888895;
            font-size: 15px;
          }
          hr {
            margin-top: 10px;
            width: 100%;
            height: 0;
            border-bottom: 1px solid #ccc;
          }
          &:hover:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(141, 209, 218, 0.2);
          }
        }
      }
    }
  }
}
/deep/ .el-pagination {
  text-align: center;
}
</style>
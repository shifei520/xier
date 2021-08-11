<template>
  <div class="ask-answer">
    <main>
      <el-row>
        <el-col :span="14">
          <!-- 标题部分 -->
          <p class="ask-info">
            <span>
              <span class="title">{{ answerDataObj.title }}</span>
              <img :src="answerDataObj.headUrl" alt="" />
            </span>
            <span class="nickName">{{ answerDataObj.nickName }}</span>
            <span class="shareAsk">
              <i class="iconfont">&#xe637;&nbsp;分享</i>&nbsp;&nbsp;
              <i class="iconfont" @click="copyLink">复制链接&nbsp;&nbsp;&#xe7e5;</i>
            </span>
          </p>
          <div class="ask-num">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="answerBtn"> 我来答 </el-button>
            <div class="report" @click="reportBtn">
              <span class="iconfont">&#xe656;</span>
              举报
            </div>
            <div class="num">
              <span>
                <a>{{ answerDataObj.answernum }}</a>
                个回答
              </span>
              &nbsp; &nbsp;
              <span>
                <a>{{ answerDataObj.collectionNum }}</a>
                人收藏
                <i class="iconfont" @click="collectBtn">&#xe638;</i>
              </span>
            </div>
          </div>
          <!-- 富文本编辑器 -->
          <div class="rich-editor" v-if="isEditorShow">
            <quill-editor v-model="answerInfo.answerText" />
            <el-button type="primary" size="mini" @click="replyAsk">发表</el-button>
          </div>
          <!-- 回答部分 -->
          <div class="answer-question" v-for="(item, index) in answerDataObj.answerList" :key="index">
            <div>
              <span>{{ index + 1 }}楼</span>
              <hr />
            </div>
            <div>
              <div class="answer-title">
                <img :src="item.headUrl" alt="" />
                <div class="name-time">
                  <p>{{ item.nickName }}的评论</p>
                  <p>
                    {{ item.answerTime }}
                  </p>
                </div>
                <el-button type="primary" size="mini" @click="attentionBtn(item.answerUserID)" v-if="item.isAttention === 0">关注+</el-button>
                <div class="alreadyAttention" v-else>已关注</div>
              </div>
              <div class="answer-content" v-html="item.answerText"></div>
            </div>
            <div class="footer clearfix">
              <span class="iconfont"><i @click="commentBtn(item.answerID)">&#xe661;</i>{{ item.remarknum }}评论</span>
              <span class="iconfont">踩<i>&#xe52a;</i></span>
              <span class="iconfont"><i @click="thumbsBtn(item.answerID)" :class="{ changeColor: item.answerID == isRed }">&#xe7fe;</i>{{ item.likeNum }}赞</span>
            </div>
            <!-- 评论框区域 -->
            <div class="comment-box" v-if="isCommentShow">
              <!-- 写评论区域 -->
              <div class="comment-content">
                <img :src="currentUserInfo.headUrl" alt="" v-if="currentUserInfo" />
                <el-input type="textarea" :rows="4" placeholder="写下你的评论..." v-model="remarkText"></el-input>
              </div>
              <div class="button">
                <el-button type="primary" size="mini" @click="writeComment(item.answerID)">提交</el-button>
              </div>
              <!-- 评论展示区域 -->
              <div class="remark-list" v-for="(item, index) in remarkListArr" :key="index">
                <img :src="item.headUrl" alt="" />
                <span>{{ item.nickName }}</span>
                <p>{{ item.remarkText }}</p>
                <div>{{ item.remarkTime }}</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="6">
          <div class="hot-recommend">
            <div class="recommend-title">
              <span> 热门推荐 </span>
              <i>更多></i>
            </div>
          </div>
        </el-col>
      </el-row>
    </main>
    <!-- 举报的弹出框 -->
    <el-dialog title="举报" :visible.sync="dialogReportVisible" width="30%">
      <el-input type="textarea" :rows="6" placeholder="请输入举报的内容" v-model="reportInfo.reportDetail"></el-input>
      &nbsp;
      <hr />
      &nbsp;
      <hr />
      <el-button size="mini" @click="dialogReportVisible = false">取消</el-button>
      <el-button size="mini" type="primary" @click="submitReport">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
// 问答数据函数
import { answerData, saveAnswer, reportAsk, collectAsk, attentionAsk, thumbAnswer, getRemarkList, makeComment } from 'network/answer_data.js'
// 用户数据函数
import { userDetailInfo } from 'network/user_data.js'
import { mapState } from 'vuex'
export default {
  name: 'TProblemi',
  data() {
    return {
      // 回答数据
      answerDataObj: {},
      // 展示富文本编辑器
      isEditorShow: false,
      // 回答问题参数
      answerInfo: {
        // 富文本编辑器的内容
        answerText: '',
        // 问题的id
        askID: null,
        isReview: 0,
      },
      // 举报问题参数
      reportInfo: {
        // 问问题用户的id
        askUserID: null,
        // 问题的id
        reportAskID: null,
        // 举报的文字内容
        reportDetail: '',
      },
      // 控制举报弹出框的现实与隐藏
      dialogReportVisible: false,
      // 点赞按钮点击后是否变成红色
      isRed: null,
      // 评论文本内容
      remarkText: '',
      // 当前用户信息
      currentUserInfo: null,
      // 评论列表数据
      remarkListArr: [],
      // 评论数据是否展示
      isCommentShow: false,
    }
  },
  created() {
    this.initData()
    console.log(window.location.href)
  },
  computed: {
    ...mapState(['isLogin']),
  },
  methods: {
    // 初始化函数
    initData() {
      this.answerInfo.askID = this.$route.params.id
      this.reportInfo.reportAskID = this.answerInfo.askID
      // 回答数据的请求函数
      this.getAnswerData()
    },
    // 复制链接
    copyLink() {
      var url = location.href
      var oInput = document.createElement('input') //创建一个隐藏input（重要！）
      oInput.value = url //赋值
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      this.$message.success('复制成功')
    },
    // 回答问题
    answerBtn() {
      if (!this.isLogin) return this.$router.push('/login')
      this.isEditorShow = !this.isEditorShow
    },
    // 举报问题
    reportBtn() {
      if (!this.isLogin) return this.$router.push('/login')
      this.dialogReportVisible = true
    },
    // 收藏问题
    collectBtn() {
      if (!this.isLogin) return this.$router.push('/login')
      collectAsk(this.reportInfo.reportAskID).then((res) => {
        if (res.code === 200) {
          answerData(this.answerInfo.askID).then((res) => {
            this.answerDataObj = res.data
            this.$message({
              message: '收藏成功',
              type: 'success',
            })
          })
        }
      })
    },
    // 关注问题
    attentionBtn(answerUserID) {
      if (!this.isLogin) return this.$router.push('/login')
      attentionAsk(answerUserID).then((res) => {
        if (res.code === 200) {
          this.getAnswerData()
        }
      })
    },
    // 点赞问题
    thumbsBtn(answerID) {
      if (!this.isLogin) return this.$router.push('/login')
      this.isRed = answerID
      thumbAnswer(answerID).then((res) => {
        if (res.code === 200) {
          this.getAnswerData()
        }
      })
    },
    // 评论问题
    commentBtn(answerID) {
      if (!this.isLogin) return this.$router.push('/login')
      // 用户数据
      userDetailInfo().then((res) => {
        this.currentUserInfo = res.data
      })
      // 评论列表
      getRemarkList(answerID).then((res) => {
        this.remarkListArr = res.data
        this.isCommentShow = !this.isCommentShow
      })
    },
    // 点击发表回答
    replyAsk() {
      if (this.answerInfo.answerText.trim() === '')
        return this.$message({
          message: '请输入内容',
          type: 'warning',
        })
      saveAnswer(this.answerInfo).then((res) => {
        if (res.code !== 200) {
          // 从新请求回答数据回答数据
          return this.$message({
            message: res.message,
            type: 'error',
          })
        }
        this.getAnswerData()
        this.isEditorShow = false
      })
    },
    // 点击提交举报内容
    submitReport() {
      if (this.reportInfo.reportDetail.trim() === '')
        return this.$message({
          message: '请输入举报内容',
          type: 'warning',
        })
      reportAsk(this.reportInfo).then((res) => {
        if (res.code === 200) {
          this.dialogReportVisible = false
          this.$message({
            message: '成功',
            type: 'success',
          })
        }
      })
    },
    // 回答数据请求函数
    getAnswerData() {
      answerData(this.answerInfo.askID).then((res) => {
        this.answerDataObj = res.data
        this.reportInfo.askUserID = res.data.askUserID
      })
    },
    // 写评论并提交
    writeComment(answerID) {
      if (this.remarkText.trim() === '')
        return this.$message({
          message: '请输入评论内容',
          type: 'warning',
        })
      makeComment({ answerID, remarkText: this.remarkText }).then((res) => {
        if (res.code === 200) {
          // 评论列表
          getRemarkList(answerID).then((res) => {
            this.remarkListArr = res.data
            this.isCommentShow = !this.isCommentShow
          })
          this.getAnswerData()
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.ask-answer {
  background-color: #f5f5f5;
  main {
    max-width: 1230px;
    margin: 0 auto;
    overflow: hidden;
    .el-row {
      margin-top: 10px;
      .el-col-14 {
        background-color: #fff;
        padding: 20px;
        .ask-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          img {
            width: 28px;
            height: 28px;
          }
          .title {
            display: inline-block;
            width: 400px;
            color: #333;
            font-size: 18px;
            font-weight: 700;
          }
          .nickName {
            display: inline-block;
            color: rgb(192, 192, 192);
            font-size: 14px;
            height: 28px;
            width: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .shareAsk .iconfont {
            color: #1fa2f8;
            font-size: 18px;
            cursor: pointer;
          }
        }
        .ask-num {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          .report {
            flex: 1;
            margin-left: 20px;
            font-size: 14px;
            cursor: pointer;
            .iconfont {
              color: red;
            }
          }
          .num {
            font-size: 14px;
            a {
              color: #1fa2f8;
            }
            .iconfont {
              cursor: pointer;
            }
          }
        }
        .answer-question {
          div {
            &:first-child {
              hr {
                display: inline-block;
                width: 96%;
                height: 0;
                border-bottom: 1px solid #ccc;
              }
              span {
                color: rgb(192, 192, 192);
                font-size: 12px;
              }
            }
            &:nth-child(2) {
              background: #f8f8f8;
              padding: 10px 20px;
              box-sizing: border-box;
              .answer-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                img {
                  height: 32px;
                  width: 32px;
                }
                .name-time {
                  flex: 1;
                  p {
                    color: #aaa;
                    font-size: 10px;
                    line-height: 14px;
                  }
                }
                .alreadyAttention {
                  color: #1fa2f8;
                  font-size: 14px;
                }
              }
            }
            &:nth-child(3) {
              .iconfont {
                float: right;
                color: rgb(179, 179, 179);
                font-size: 12px;
                i {
                  font-size: 14px;
                  color: rgb(31, 162, 248);
                  cursor: pointer;
                }
                .changeColor {
                  color: red;
                }
                &:nth-child(2) {
                  margin: 0 30px 0 20px;
                  i {
                    font-size: 12px;
                  }
                }
              }
            }
          }
          .comment-box {
            margin: 30px;
            padding: 20px 0 0 20px;
            .comment-content {
              display: flex;
              margin-right: 50px;
              background-color: #f8f8f8;
              img {
                height: 32px;
                width: 32px;
              }
            }
            .button {
              padding-left: 552px;
              background-color: #f8f8f8;
            }
            .remark-list {
              margin-top: 20px;
              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
              span {
                margin-left: 15px;
                font-size: 15px;
                color: #b3b3b3;
              }
              p {
                font-size: 15px;
              }
              div {
                margin-left: 400px;
                font-size: 14px;
              }
            }
          }
        }
      }
      .hot-recommend {
        background-color: #fff;
        .recommend-title {
          display: flex;
          height: 50px;
          border-bottom: 1px solid #666;
          justify-content: space-between;
          span {
            font-size: 26px;
            font-weight: bolder;
          }
        }
      }
    }
  }
}
</style>
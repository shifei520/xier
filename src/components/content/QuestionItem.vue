<template>
  <div class="question-item">
    <!-- 标题部分 -->
    <header class="question-info">
      <router-link
        tag="span"
        :to="{
          name: 'TProblemi',
          params: {
            id: questionDetail.askID,
          },
        }"
        class="title"
      >
        {{ questionDetail.title }}
      </router-link>
      <span class="shareAsk">
        <i class="iconfont">&#xe637;&nbsp;分享</i>&nbsp;&nbsp;
        <i class="iconfont" @click="copyLink(questionDetail.askID)">复制链接&nbsp;&nbsp;&#xe7e5;</i>
      </span>
      <br />
      <img :src="questionDetail.headUrl" alt="" />
      <span class="nickName">{{ questionDetail.nickName }}</span>
      <div class="question-num">
        <span>
          <a>{{ questionDetail.answernum }}</a>
          个回答
        </span>
        &nbsp; &nbsp;
        <span>
          <a>{{ questionDetail.collectionNum }}</a>
          人收藏
        </span>
      </div>
    </header>
    <!-- 问题内容部分 -->
    <section>
      <div class="ask-user">
        <img :src="questionDetail.answerList[0].headUrl" alt="" />
        <span>{{ questionDetail.answerList[0].nickName }}的回复</span>
      </div>
      <div v-html="questionDetail.answerList[0].answerText" class="ask-content" :class="{ foldStyle: !isFold }"></div>
      <div @click="isFold = !isFold" class="fold">
        <span>
          {{ isFold ? '收起' : '...展开' }}
        </span>
      </div>
      <div class="footer">
        <span class="iconfont"><i>&#xe661;</i>{{ questionDetail.answerList[0].remarknum }}评论</span>
        <span class="iconfont">踩<i>&#xe52a;</i></span>
        <span class="iconfont"><i @click="thumbsBtn(questionDetail.answerList[0].answerID)" :class="{ changeColor: isRed }">&#xe7fe;</i>{{ questionDetail.answerList[0].likeNum }}赞</span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { thumbAnswer } from 'network/answer_data.js'
export default {
  name: 'QuestionItem',
  props: ['questionDetail'],
  data() {
    return {
      // 详细内容展开和收起
      isFold: false,
      // 点赞按钮是否是红色
      isRed: false,
    }
  },
  computed: {
    ...mapState(['isLogin']),
  },
  methods: {
    // 复制链接
    copyLink(id) {
      var url = location.origin + `/front/tProblemi/${id}`
      var oInput = document.createElement('input') //创建一个隐藏input（重要！）
      oInput.value = url //赋值
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      this.$message.success('复制成功')
    },
    // 点赞问题
    thumbsBtn(answerID) {
      if (!this.isLogin) return this.$router.push('/login')
      this.isRed = true
      thumbAnswer(answerID).then((res) => {
        if (res.code === 200) {
          this.$emit('reloadData')
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.question-item {
  padding: 10px 30px 40px;
  margin-top: 10px;
  background-color: #fff;
  box-sizing: border-box;
  .question-info {
    .title {
      display: inline-block;
      width: 590px;
      color: #000;
      font-weight: 700;
      font-size: 18px;
      cursor: pointer;
    }
    .shareAsk .iconfont {
      color: #1fa2f8;
      font-size: 18px;
      cursor: pointer;
    }
    img {
      height: 28px;
      width: 28px;
      border-radius: 50%;
    }
    .nickName {
      margin-left: 9px;
      color: #b3b3b3;
      font-size: 13px;
    }
    .question-num {
      text-align: right;
      font-size: 14px;
      a {
        color: #1fa2f8;
      }
    }
  }
  section {
    border-top: 1px solid #ccc;
    .ask-user {
      margin: 14px 0 14px 20px;
      img {
        height: 30px;
        width: 30px;
      }
      span {
        margin-left: 15px;
        font-size: 15px;
        font-weight: 600;
        color: #b3b3b3;
      }
    }
    .ask-content {
      margin: 5px 20px;
      box-sizing: border-box;
      /deep/ span {
        font-size: 18px;
      }
    }
    .foldStyle {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: 2;
    }
    .fold {
      margin-left: 15px;
      color: #000;
      font-size: 14px;
      cursor: pointer;
    }
    .footer {
      .iconfont {
        float: right;
        color: rgb(179, 179, 179);
        font-size: 12px;
        i {
          font-size: 14px;
          color: rgb(31, 162, 248);
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
        &:last-child {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
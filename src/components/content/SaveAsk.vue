<template>
  <el-dialog title="提问" :visible.sync="outerVisible" width="30%" @close="closess">
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
</template>

<script>
import { questionSeries } from 'network/question_data.js'
import { mapState } from 'vuex'
import { askQuestion } from 'network/answer_data.js'
export default {
  name: 'SaveAsk',
  props: ['outVisible'],
  data() {
    return {
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
      // 问题分类数据
      questionSortArr: [],
    }
  },
  created() {
    this.getQuestionSeries()
  },
  watch: {
    outVisible: function (val) {
      this.outerVisible = val
    },
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
          this.$emit('reLoadQuesion')
          this.innerVisible = false
          this.outerVisible = false
        }
      })
    },
    closess() {
      this.$emit('cancel')
    },
  },
}
</script>

<style lang="less" scoped>
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
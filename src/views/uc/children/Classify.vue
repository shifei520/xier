<template>
  <div class="classify">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态" name="first">
        <div class="dynamic-item" v-for="(item, index) in dynamicListArr" :key="index">
          <div class="dynamic-item-time">
            {{ item.specificTime.split(' ')[0] }}
            <br />
            {{ item.specificTime.split(' ')[1] }}
            <img src="~assets/img/icon_7.png" alt="" v-if="item.type === 1" />
            <img src="~assets/img/icon_6.png" alt="" v-else />
          </div>
          <div class="dynamic-item-content">
            <div class="dynamic-item-ask" v-if="item.type === 1">
              <strong>{{ item.description }}</strong>
            </div>
            <div class="dynamic-item-answer" v-else>
              <p>{{ item.description }}</p>
              <p>{{ item.answerText }}</p>
            </div>
            <router-link
              tag="div"
              :to="{
                name: 'TProblemi',
                params: {
                  id: item.askID,
                },
              }"
              class="check-btn"
              >查看原文</router-link
            >
          </div>
        </div>
        <!-- 动态分页器 -->
        <el-pagination background layout="prev, pager, next" :total="totalRows_1" :page-size="dynamicParams.pageSize" :current-page="dynamicParams.pageNo" @current-change="handleCurrentChange_1">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="回答" name="second">
        <div class="answer-item" v-for="(item, index) in answerListArr" :key="index">
          <div class="delete-btn" @click="deleteAnswer(item.answerID)">删除</div>
          <div class="answer-item-time">
            {{ item.specificTime.split(' ')[0] }}
            <br />
            {{ item.specificTime.split(' ')[1] }}
            <img src="~assets/img/icon_8.png" alt="" />
          </div>
          <div class="answer-item-content">
            <div class="answer-item-answer">
              <p>对{{ item.askNickName }}的问题做出了回答</p>
              <div v-html="item.answerText"></div>
            </div>
            <div class="update-btn" @click="updateAnswerFunc(item.answerID)">修改</div>
            <router-link
              tag="div"
              :to="{
                name: 'TProblemi',
                params: {
                  id: item.askID,
                },
              }"
              class="check-btn"
              >查看原文</router-link
            >
          </div>
        </div>
        <!-- 回答问题分页器 -->
        <el-pagination background layout="prev, pager, next" :total="totalRows_2" :page-size="answerParams.pageSize" :current-page="answerParams.pageNo" @current-change="handleCurrentChange_2">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="提问" name="third">
        <el-pagination background layout="prev, pager, next" :total="0"> </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="关注" name="fourth">
        <div class="attention-list" v-for="(item, index) in attentionListArr" :key="index">
          <span class="attention-rank"> {{ index + 1 }}. </span>
          <img :src="item.headUrl" alt="" />
          <span>{{ item.nickName }}</span>
          <div class="attention-introduce">
            <span v-if="item.introduction">{{ item.introduction }}</span>
            <span v-else>这个人很懒，什么都没有留下</span>
          </div>
          <el-button type="primary" size="mini" @click="cancelAttention(item.attentionID)">取消关注</el-button>
        </div>
        <!-- 关注分页器 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalRows_3"
          :page-size="attentionParams.pageSize"
          :current-page="attentionParams.pageNo"
          @current-change="handleCurrentChange_3"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="收藏" name="fiveth">
        <div class="collection-list" v-for="(item, index) in collectionListArr" :key="index">
          <span class="collection-rank"> {{ index + 1 }}. </span>
          <p>{{ item.title }}</p>
          <router-link
            tag="div"
            :to="{
              name: 'TProblemi',
              params: {
                id: item.askID,
              },
            }"
            class="check-btn"
            >查看原文</router-link
          >
          <div class="update-btn" @click="deleteCollectionBtn(item.collectionID)">取消收藏</div>
        </div>
        <!-- 收藏分页器 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalRows_4"
          :page-size="collectionParams.pageSize"
          :current-page="collectionParams.pageNo"
          @current-change="handleCurrentChange_4"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!-- 修改回答问题对话框 -->
    <el-dialog title="修改回答内容" :visible.sync="dialogAnswerVisible" width="30%">
      <quill-editor v-model="answerInfo.answerText" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAnswerVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserReply">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dynamicLogList, userAnswerList, updateUserAnswer, deleteUserAnswer, attentionList, collectionList, deleteCollection } from 'network/question_answer.js'
import { unFocusUser } from 'network/user_data.js'
export default {
  name: 'Classify',
  data() {
    return {
      // 动态问题参数
      dynamicParams: {
        pageNo: 1,
        pageSize: 5,
      },
      // 回答问题参数
      answerParams: {
        pageNo: 1,
        pageSize: 5,
      },
      // 关注用户参数
      attentionParams: {
        pageNo: 1,
        pageSize: 5,
      },
      // 收藏列表参数
      collectionParams: {
        pageNo: 1,
        pageSize: 5,
      },
      // 动态总条数
      totalRows_1: 0,
      // 回答的问题总条数
      totalRows_2: 0,
      // 关注用户总数
      totalRows_3: 0,
      totalRows_4: 0,
      // 动态数据列表
      dynamicListArr: [],
      // 回答的问题列表
      answerListArr: [],
      // 关注用户列表
      attentionListArr: [],
      // 收藏列表数据
      collectionListArr: [],
      activeName: 'first',
      // 回答问题对话框
      dialogAnswerVisible: false,
      // 修改回答参数
      answerInfo: {
        answerID: null,
        answerText: '',
      },
    }
  },
  created() {
    this.getDynamicLogList()
  },
  methods: {
    // tab切换时触发事件
    handleClick() {
      if (this.activeName === 'first') {
        this.getDynamicLogList()
      }
      if (this.activeName === 'second') {
        this.getUserAnswerList()
      }
      if (this.activeName === 'fourth') {
        this.getAttentionList()
      }
      if (this.activeName === 'fiveth') {
        this.getCollectionList()
      }
    },
    // 获取动态问题
    getDynamicLogList() {
      dynamicLogList(this.dynamicParams).then((res) => {
        this.totalRows_1 = res.data.totalRows
        this.dynamicListArr = res.data.rows
      })
    },
    // 动态问题分页器页数改变
    handleCurrentChange_1(val) {
      this.dynamicParams.pageNo = val
      this.getDynamicLogList()
    },
    // 回答问题分页器页数改变
    handleCurrentChange_2(val) {
      this.answerParams.pageNo = val
      this.getUserAnswerList()
    },
    // 关注用户列表分页器页数改变
    handleCurrentChange_3(val) {
      this.attentionParams.pageNo = val
      this.getAttentionList()
    },
    // 收藏列表分页器页数改变
    handleCurrentChange_4(val) {
      this.collectionParams.pageNo = val
      this.getCollectionList()
    },
    // 获取用户回答的问题
    getUserAnswerList() {
      userAnswerList(this.answerParams).then((res) => {
        this.totalRows_2 = res.data.totalRows
        this.answerListArr = res.data.rows
      })
    },
    // 打开修改回答对话框
    updateAnswerFunc(id) {
      this.answerInfo.answerID = id
      this.dialogAnswerVisible = true
    },
    // 修改回答
    updateUserReply() {
      updateUserAnswer(this.answerInfo).then((res) => {
        if (res.code === 200) {
          this.getUserAnswerList()
          this.dialogAnswerVisible = false
        } else {
          return this.$message({
            message: res.message,
            type: 'error',
          })
        }
      })
    },
    // 删除回答
    deleteAnswer(id) {
      deleteUserAnswer(id).then((res) => {
        if (res.code === 200) {
          this.getUserAnswerList()
        }
      })
    },
    // 获取关注用户列表
    getAttentionList() {
      attentionList(this.attentionParams).then((res) => {
        this.totalRows_3 = res.data.totalRows
        this.attentionListArr = res.data.rows
      })
    },
    // 取消关注某人
    cancelAttention(id) {
      unFocusUser(id).then((res) => {
        if (res.code === 200) {
          this.getAttentionList()
        }
      })
    },
    // 获取收藏列表数据
    getCollectionList() {
      collectionList(this.collectionParams).then((res) => {
        this.totalRows_4 = res.data.totalRows
        this.collectionListArr = res.data.rows
      })
    },
    // 取消收藏
    deleteCollectionBtn(id) {
      deleteCollection(id).then((res) => {
        if (res.code === 200) {
          this.getCollectionList()
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.classify {
  .dynamic-item {
    display: flex;
    margin-top: 10px;
    height: 100px;
    width: 100%;
    align-items: center;
    .dynamic-item-time {
      position: relative;
      width: 138px;
      font-size: 14px;
      color: #888;
      img {
        position: absolute;
        width: 44px;
        height: 44px;
        top: 50%;
        right: 0;
        transform: translate(50%, -50%);
        z-index: 10;
      }
      &::after {
        content: '';
        position: absolute;
        top: -50%;
        right: 0;
        height: 100px;
        width: 1px;
        background-color: #b3acac;
        z-index: 9;
      }
    }
    .dynamic-item-content {
      display: flex;
      flex: 1;
      margin-left: 50px;
      font-size: 14px;
      height: 100%;
      border-bottom: 1px solid rgb(200, 200, 200);
      justify-content: space-between;
      align-items: center;
      .dynamic-item-answer {
        color: #888;
      }
      .check-btn {
        padding: 2px 6px;
        background-color: #1fa2f8;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
  .answer-item {
    display: flex;
    margin-top: 10px;
    height: 100px;
    width: 100%;
    align-items: center;
    .delete-btn {
      margin-right: 30px;
      padding: 2px 4px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      text-align: center;
      background-color: #1fa2f8;
      border-radius: 4px;
      letter-spacing: 2px;
      cursor: pointer;
    }
    .answer-item-time {
      position: relative;
      width: 138px;
      font-size: 14px;
      color: #888;
      img {
        position: absolute;
        width: 44px;
        height: 44px;
        top: 50%;
        right: 0;
        transform: translate(50%, -50%);
        z-index: 10;
      }
      &::after {
        content: '';
        position: absolute;
        top: -50%;
        right: 0;
        height: 100px;
        width: 1px;
        background-color: #b3acac;
        z-index: 9;
      }
    }
    .answer-item-content {
      display: flex;
      flex: 1;
      margin-left: 50px;
      font-size: 14px;
      height: 100%;
      border-bottom: 1px solid rgb(200, 200, 200);
      justify-content: space-between;
      align-items: center;
      .answer-item-answer {
        flex: 1;
        color: #888;
      }
    }
  }
  .attention-list {
    display: flex;
    height: 49px;
    font-size: 14px;
    border-bottom: 2px solid #c8c8c8;
    align-items: center;
    justify-content: space-between;
    .attention-rank {
      color: rgb(31, 161, 248);
      font-size: 20px;
    }
    img {
      margin-left: 10px;
      height: 40px;
      width: 40px;
    }
    .attention-introduce {
      flex: 1;
      margin-left: 40px;
    }
  }
  .collection-list {
    display: flex;
    height: 49px;
    font-size: 14px;
    border-bottom: 2px solid #c8c8c8;
    align-items: center;
    justify-content: space-between;
    .collection-rank {
      color: rgb(31, 161, 248);
      font-size: 20px;
    }
    > p {
      flex: 1;
      margin-left: 10px;
    }
  }
  .check-btn,
  .update-btn {
    margin-left: 10px;
    padding: 2px 6px;
    background-color: #1fa2f8;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 1px;
  }
}
/deep/ .el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
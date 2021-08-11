<template>
  <div class="law-id">
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="7" class="law-header">
        <h2>{{ lawInfoObj.lawName }}</h2>
        <p>发布时间：{{ lawInfoObj.publishTime }}</p>
        <p>实施时间：{{ lawInfoObj.implementationTime }}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20" class="law-content">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="正文内容" name="first">
            <div v-html="lawInfoObj.mobileLawText"></div>
          </el-tab-pane>
          <el-tab-pane label="评价" name="second">暂无评价</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
    </el-row>
    <sider-bar />
  </div>
</template>

<script>
import { lawItemData } from 'network/law_data.js'
// 引入侧边栏组件
import SiderBar from 'components/common/SiderBar'
export default {
  name: 'LawsID',
  components: {
    SiderBar,
  },
  data() {
    return {
      // 当前法律条款id
      lawID: null,
      // 法律条款数据
      lawInfoObj: {},
      // 控制tab切换
      activeName: 'first',
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      this.lawID = this.$route.params.id
      // 获取法律条款详细信息
      lawItemData(this.lawID).then((res) => {
        this.lawInfoObj = res.data
      })
    },
    // tab标签点击时触发事件
    handleClick() {},
  },
}
</script>

<style lang="less" scoped>
.law-id {
  background: #f0f2f5;
  overflow: hidden;
  .el-row {
    margin-top: 5px;
    .law-header {
      background-color: #fff;
      padding: 50px 20px;
      h2 {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 700;
        font-size: 21px;
      }
      p {
        margin-top: 30px;
      }
    }
    .law-content {
      margin-top: 10px;
      background-color: #fff;
      .el-tab-pane {
        padding: 20px;
      }
    }
  }
}
</style>
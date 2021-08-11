<template>
  <div class="self-learn">
    <div class="page-title">我的学习</div>
    <div class="class-category-list">
      <div>
        <span @click="changeCourseType(2)" :class="{ activeClass: courseListQueryInfo.type === 2 }">我的课程</span>
        <span @click="changeCourseType(1)" :class="{ activeClass: courseListQueryInfo.type === 1 }">我的班级</span>
        <span @click="changeCourseType(3)" :class="{ activeClass: courseListQueryInfo.type === 3 }">我的直播课程</span>
      </div>
      <el-button size="small" @click="dialogFormVisible = true">开课卡开课</el-button>
    </div>
    <div class="course-list">
      <div class="learning-expired" :style="{ backgroundImage: `url(${imgUrl})` }">
        <p :style="{ color: courseListQueryInfo.isExpire === 0 ? '#fff' : '#00aef3' }" @click="switchIsexpiredCourse(0)">学习中</p>
        <p :style="{ color: courseListQueryInfo.isExpire === 1 ? '#fff' : '#00aef3' }" @click="switchIsexpiredCourse(1)">已过期</p>
      </div>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in courseListArr" :key="index">
          <course-item :courseInfo="item" />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">&nbsp;</el-col>
        <el-col :span="12"
          ><el-pagination
            background
            layout="prev, pager, next"
            :total="totalCourses"
            :page-size="courseListQueryInfo.pageSize"
            :current-page="courseListQueryInfo.pageNo"
            @current-change="handleCurrentChange"
          >
          </el-pagination
        ></el-col>
        <el-col :span="6">&nbsp;</el-col>
      </el-row>
    </div>
    <!-- 开课卡对话框 -->
    <el-dialog title="开课卡开课" :visible.sync="dialogFormVisible" width="20%">
      <el-input v-model="courseCardQueryInfo.cardNo" placeholder="请输入卡号"></el-input>
      <el-input v-model="courseCardQueryInfo.code" placeholder="请输入激活码"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="activateBtn">激 活</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { learningAndExpiredCourse, userCourseCard } from 'network/course_data.js'
import CourseItem from 'components/content/CourseItem.vue'
export default {
  components: { CourseItem },
  name: 'SelfLearn',
  data() {
    return {
      // 获取课程列表参数
      courseListQueryInfo: {
        isExpire: 0,
        type: 2,
        pageNo: 1,
        pageSize: 12,
      },
      // 总课程数
      totalCourses: 0,
      // 课程列表
      courseListArr: [],
      // 控制开课卡开课对话框的现实与隐藏
      dialogFormVisible: false,
      // 激活开课卡参数
      courseCardQueryInfo: {
        cardNo: '',
        code: '',
      },
    }
  },
  computed: {
    imgUrl() {
      return this.courseListQueryInfo.isExpire === 0 ? require('assets/img/bc_7.png') : require('assets/img/bc_8.png')
    },
  },
  created() {
    this.getCourseList()
  },
  methods: {
    // 点击切换学习中与已过期课程
    switchIsexpiredCourse(val) {
      this.courseListQueryInfo.isExpire = val
      this.getCourseList()
    },
    // 获取学习中与已过期课程列表数据
    getCourseList() {
      learningAndExpiredCourse(this.courseListQueryInfo).then((res) => {
        this.totalCourses = res.data.totalRows
        this.courseListArr = res.data.rows
      })
    },
    // 分页器页数改变触发事件
    handleCurrentChange(val) {
      this.courseListQueryInfo.pageNo = val
      this.getCourseList()
    },
    // 改变课程类别按钮
    changeCourseType(val) {
      this.courseListQueryInfo.type = val
      this.getCourseList()
    },
    // 激活码激活课程
    activateBtn() {
      if (this.courseCardQueryInfo.cardNo === '')
        return this.$message({
          message: '请输入卡号',
          type: 'error',
        })
      if (this.courseCardQueryInfo.code === '')
        return this.$message({
          message: '请输入激活码',
          type: 'error',
        })
      userCourseCard(this.courseCardQueryInfo).then((res) => {
        if (res.code === 200) {
          this.dialogFormVisible = false
          return this.$message({
            message: '激活成功',
            type: 'success',
          })
        } else {
          return this.$message({
            message: res.message,
            type: 'error',
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.self-learn {
  .page-title {
    margin: 20px 0;
    font-size: 28px;
  }
  .class-category-list {
    display: flex;
    justify-content: space-between;
    span {
      padding: 2px 8px;
      margin-right: 10px;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
    }
  }
  .course-list {
    margin-top: 20px;
    border-top: 1px solid #e0e0e0;
    .learning-expired {
      display: flex;
      margin-top: 20px;
      background-repeat: no-repeat;
      background-size: 100%;
      height: 28px;
      width: 25%;
      box-sizing: border-box;
      p {
        width: 50%;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
      }
    }
    .el-row {
      margin-top: 20px;
    }
  }
}
.activeClass {
  color: #1fa2f8;
  background: rgba(31, 162, 248, 0.1);
}
/deep/ .el-pagination {
  text-align: center;
}
.el-dialog {
  .el-input {
    margin-top: 20px;
  }
}
</style>
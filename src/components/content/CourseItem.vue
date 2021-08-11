<template>
  <div class="course-item">
    <img :src="courseInfo.thumbnailUrl" alt="" />
    <p class="course-title">
      {{ courseInfo.productName }}
    </p>
    <p class="teacher-name">教师：{{ courseInfo.teacherName }}</p>
    <div class="course-progress">得分:<el-progress :percentage="Number(courseInfo.schedule)"></el-progress></div>
    <p class="remaining-time" v-if="courseInfo.type === 2">
      剩余时间：<span>{{ remainTime }}</span> 天
    </p>
    <div class="begin-study" v-if="courseInfo.type === 2">
      <el-button type="primary" size="mini">开始学习</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseItem',
  props: ['courseInfo'],
  computed: {
    remainTime() {
      let now = new Date().valueOf()
      let valid = new Date(this.courseInfo.validTime).valueOf()
      return new Date(valid - now).getDate()
    },
  },
}
</script>

<style lang="less" scoped>
.course-item {
  border-radius: 10px;
  padding-bottom: 10px;
  transition: all 0.3s;
  cursor: pointer;
  img {
    height: 120px;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .course-title {
    padding: 5px 15px 0;
    font-weight: 700;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .teacher-name,
  .remaining-time {
    padding: 0 10px;
    font-size: 14px;
  }
  .course-progress {
    display: flex;
    padding: 0 10px;
    font-size: 14px;
    align-items: center;
    .el-progress {
      flex: 1;
    }
  }
  .remaining-time {
    span {
      color: #ff0d0d;
    }
  }
  .begin-study {
    margin: 10px 10px 0;
    text-align: right;
  }
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.1);
  }
}
</style>
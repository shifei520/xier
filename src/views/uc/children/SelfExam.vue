<template>
  <div class="self-exam">
    <div class="page-title">我的学习</div>
    <div class="exam-category-list">
      <div>
        <span @click="type = 0" :class="{ activeClass: type === 0 }">班级考试</span>
        <span @click="type = 1" :class="{ activeClass: type === 1 }">课程考试</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelfExam',
  data() {
    return {
      type: 0,
    }
  },
}
</script>

<style lang="less" scoped>
.self-exam {
  .page-title {
    margin: 20px 0;
    font-size: 28px;
  }
  .exam-category-list {
    padding-bottom: 15px;
    border-bottom: 1px solid #e0e0e0;
    span {
      padding: 2px 8px;
      margin-right: 10px;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
    }
  }
}
.activeClass {
  color: #1fa2f8;
  background: rgba(31, 162, 248, 0.1);
}
</style>
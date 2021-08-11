<template>
  <div class="aside-question">
    <header>
      <span class="title">热门推荐</span>
      <span class="more">更多></span>
    </header>
    <section>
      <div class="question-list" v-for="(item, index) in hotQuestionListArr" :key="index">
        <router-link
          tag="div"
          :to="{
            name: 'TProblemi',
            params: {
              id: item.askID,
            },
          }"
          class="question-name"
        >
          {{ item.title }}
        </router-link>
        <div class="user-info">
          <div>
            <img :src="item.headUrl" alt="" />
            <span>{{ item.nickName }}</span>
          </div>
          <span>{{ item.likeNum }}赞</span>
        </div>
        <div class="question-detail" v-html="item.answerText"></div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  name: 'AsideQuestion',
  props: ['hotQuestionListArr'],
}
</script>

<style lang="less" scoped>
.aside-question {
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 5px;
  header {
    display: flex;
    padding-bottom: 10px;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .title {
      font-weight: 700;
      font-size: 28px;
    }
    .more {
      font-size: 14px;
    }
  }
  section {
    .question-list {
      .question-name {
        color: #000;
        font-size: 22px;
        cursor: pointer;
      }
      .user-info {
        display: flex;
        justify-content: space-between;
        img {
          height: 40px;
          width: 40px;
        }
        span {
          font-size: 15px;
        }
      }
      .question-detail {
        /deep/ p {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
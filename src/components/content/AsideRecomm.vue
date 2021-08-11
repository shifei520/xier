<template>
  <aside class="aside">
    <p>西尔推荐</p>
    <router-link
      class="aside-recommend"
      v-for="(item, index) in recommendCourse"
      :key="index"
      :to="{
        path: '/front/cdetail',
        query: {
          id: item.productID,
        },
      }"
    >
      <img :src="item.thumbnailUrl" alt="" />
      <div>{{ item.productName }}</div>
    </router-link>
  </aside>
</template>

<script>
export default {
  name: 'AsideRecomm',
  props: ['recommendCourse'],
}
</script>

<style lang="less" scoped>
.aside {
  padding: 10px 20px;
  width: 20%;
  background-color: #fff;
  font-size: 14px;
  box-sizing: border-box;
  p {
    padding-left: 5px;
    border-left: 3px solid #1fa2f8;
  }
  .aside-recommend {
    display: block;
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
    color: #333;
    img {
      width: 100%;
    }
  }
}
</style>
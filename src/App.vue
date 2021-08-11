<template>
  <div id="app">
    <header-bar />
    <router-view />
    <footer-bar />
  </div>
</template>
<script>
// 引入头部导航
import HeaderBar from 'components/common/HeaderBar'
// 引入底部导航
import FooterBar from 'components/common/FooterBar'
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  components: {
    HeaderBar,
    FooterBar,
  },
  created() {
    // 每次页面刷新时从localStorage获取数据存入vuex中
    this.INIT_USER_INFO()
  },
  methods: {
    ...mapMutations(['INIT_USER_INFO']),
  },
}
</script>
<style lang="less">
@import url('~assets/css/reset.css');
</style>

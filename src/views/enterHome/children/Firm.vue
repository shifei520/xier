<template>
  <div class="firm">adddddddddddaa</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Firm',
  computed: {
    ...mapState(['isLogin']),
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.isLogin) return vm.$router.push('/login')
    })
  },
}
</script>

<style lang="less" scoped>
</style>
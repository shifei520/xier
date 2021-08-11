<template>
  <div class="side-bar">
    <div @click="backToTop">
      <i class="iconfont">&#xe632;</i>
    </div>
    <el-popover placement="left" trigger="hover" width="150">
      <img src="~assets/img/qr_code.png" alt="" />
      <div slot="reference">
        <i class="iconfont">&#xe620;</i>
      </div>
    </el-popover>
    <el-tooltip class="left" effect="dark" content="联系客服" placement="left">
      <div>
        <i class="iconfont">&#xe625;</i>
      </div>
    </el-tooltip>
    <el-tooltip class="left" effect="dark" content="400-081-0101" placement="left">
      <div>
        <i class="iconfont">&#xe660;</i>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'SiderBar',
  methods: {
    // 返回顶部事件
    backToTop() {
      let scrollTopTimer = setInterval(function () {
        let top = document.body.scrollTop || document.documentElement.scrollTop
        let step = top / 4
        if (document.body.scrollTop !== 0) {
          document.body.scrollTop -= step
        } else {
          document.documentElement.scrollTop -= step
        }

        if (top === 0) {
          clearInterval(scrollTopTimer)
        }
      }, 30)
    },
  },
}
</script>

<style lang="less" scoped>
.side-bar {
  position: fixed;
  top: 45%;
  right: 20px;
  background-color: #fff;
  z-index: 20;
  transform: translateY(-50%);
  div {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
    .iconfont {
      font-size: 24px;
    }
  }
}
</style>
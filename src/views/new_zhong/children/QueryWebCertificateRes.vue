<template>
  <div class="query-certificate-result">
    <main>
      <div class="title">证书查询系统</div>
      <div class="main-content">
        <div class="top-line"></div>
        <div class="query-detail">
          <div class="result" v-if="certificateInfo.length === 0">
            <div class="result-title">没有找到您查询的信息,请核查:</div>
            <div class="result-tip">1.请确认您输入的信息是否正确</div>
            <div class="result-tip">2.请确认您是否通过考核</div>
            <div class="result-tip">3.如需帮助,请拨打400-081-0101联系我们</div>
          </div>
        </div>
        <div class="bottom-line"></div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'QueryWebCertificateRes',
  computed: {
    ...mapState(['certificateInfo']),
  },
}
</script>

<style lang="less" scoped>
.query-certificate-result {
  background: #f0f2f5;
  main {
    margin: 0 auto;
    width: 1230px;
    min-width: 1230px;
    .title {
      width: 100%;
      height: 112px;
      font-size: 60px;
      color: #fff;
      line-height: 112px;
      background-color: #0f6691;
      text-align: center;
      letter-spacing: 18px;
    }
    .main-content {
      background-color: #fff;
      .top-line,
      .bottom-line {
        margin-top: 20px;
        width: 100%;
        height: 20px;
        background-color: #ec0f0f;
      }
      .query-detail {
        display: flex;
        height: 600px;
        width: 100%;
        justify-content: center;
        align-items: center;
        .result {
          .result-title {
            font-size: 26px;
            font-weight: 600;
            letter-spacing: 1px;
          }
          .result-tip {
            font-size: 20px;
            margin-top: 15px;
            letter-spacing: 1px;
          }
        }
      }
    }
  }
}
</style>
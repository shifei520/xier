<template>
  <div class="query-certificate">
    <main>
      <div class="title">证书查询系统</div>
      <div class="main-content">
        <div class="top-line"></div>
        <div class="declare">
          本系统支持生态环境部宣传教育中心、生态环境部固体废物与化学危险品管理技术中心、 中国生态文明研究与促进会和中国环境科学学会和中华环保联合会与我司联合举办发证 的证书查询。
        </div>
        <!-- 查询表单 -->
        <div class="search-form">
          <div class="name">
            <div>考生姓名:</div>
            <el-input v-model="queryInfo.studentName" placeholder="请输入考生姓名" size="medium"></el-input>
          </div>
          <div class="idCard">
            <div>身份证号:</div>
            <el-input v-model="queryInfo.idCard" placeholder="请输入身份证号" size="medium"></el-input>
          </div>
          <div class="certificateId">
            <div>证书编号:</div>
            <el-input v-model="queryInfo.certificateNumber" placeholder="请输入证书编号" size="medium"></el-input>
          </div>
          <div class="tips">注:三项输入任意两项信息即可查询</div>
          <div class="click-btn">
            <div @click="queryInformation">点击查询</div>
          </div>
        </div>
        <!-- 各生态部门徽章 -->
        <div class="icon">
          <img src="~assets/img/certificate_1.png" alt="" />
          <img src="~assets/img/certificate_2.png" alt="" />
          <img src="~assets/img/certificate_3.png" alt="" />
          <img src="~assets/img/certificate_4.png" alt="" />
          <img src="~assets/img/certificate_5.png" alt="" />
          <img src="~assets/img/certificate_6.png" alt="" />
        </div>
        <div class="bottom-line"></div>
      </div>
    </main>
  </div>
</template>

<script>
// 查询证书函数
import { queryCertificateInfo } from 'network/user_data.js'
import { mapMutations } from 'vuex'
export default {
  name: 'QueryWebCertificate',
  data() {
    return {
      queryInfo: {
        // 姓名
        studentName: '',
        // 身份证号
        idCard: '',
        // 证书编号
        certificateNumber: '',
      },
    }
  },
  methods: {
    ...mapMutations(['QUERY_CERTIFICATE_INFO']),
    // 点击查询证书信息
    queryInformation() {
      let num = 0
      Object.values(this.queryInfo).forEach((item) => {
        if (item === '') num++
      })
      if (num > 1) {
        return this.$message({
          message: '请输入两项信息',
          type: 'error',
        })
      } else {
        if (this.queryInfo.idCard !== '' && this.queryInfo.idCard.length !== 18) {
          return this.$message({
            message: '请输入正确身份证号码',
            type: 'error',
          })
        }
      }
      // 验证通过后查询证书
      queryCertificateInfo(this.queryInfo).then((res) => {
        this.QUERY_CERTIFICATE_INFO(res.data)
        this.$router.push('/front/new_zhong/queryWebCertificateRes')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.query-certificate {
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
      .top-line,
      .bottom-line {
        margin-top: 20px;
        width: 100%;
        height: 20px;
        background-color: #ec0f0f;
      }
      .declare {
        font-size: 25px;
        letter-spacing: 3px;
        width: 100%;
        padding: 20px;
        line-height: 35px;
        box-sizing: border-box;
      }
      .search-form {
        width: 600px;
        margin: 20px auto;
        .name,
        .idCard,
        .certificateId {
          display: flex;
          font-size: 23px;
          align-items: center;
          margin-bottom: 20px;
          div {
            width: 170px;
            letter-spacing: 2px;
          }
          /deep/ .el-input {
            font-size: 20px;
            width: 100%;
          }
        }
        .tips {
          margin: 25px 0 35px;
          width: 100%;
          color: #aaa;
          font-size: 21px;
          letter-spacing: 2px;
        }
        .click-btn {
          display: flex;
          justify-content: center;
          margin-bottom: 35px;
          div {
            color: #fff;
            width: 190px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            background-color: #ec0f0f;
            font-size: 23px;
            letter-spacing: 3px;
            cursor: pointer;
            border-radius: 25px;
          }
        }
      }
      .icon {
        display: flex;
        padding: 10px 15px;
        margin-top: 20px;
        width: 100%;
        box-sizing: border-box;
        justify-content: space-between;
        img {
          height: 157px;
          width: 157px;
        }
      }
    }
  }
}
</style>
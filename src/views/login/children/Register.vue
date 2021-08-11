<template>
  <div id="register">
    <login-mode>
      <el-card class="box-card">
        <router-link to="/login" class="go-login"> 登录 </router-link>
        <p class="title">注册账号</p>
        <el-row :gutter="20" type="flex" align="middle">
          <el-col :span="8">手机号</el-col>
          <el-col :span="9">
            <el-input v-model="registerInfo.phone" placeholder="手机号" size="medium"></el-input>
          </el-col>
          <el-col :span="7"></el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="middle">
          <el-col :span="8">短信验证码</el-col>
          <el-col :span="9">
            <el-input v-model="registerInfo.code" placeholder="短信验证码" size="medium"></el-input>
          </el-col>
          <el-col :span="7">
            <el-button :type="totalCount === 0 ? 'primary' : 'info'" size="medium" @click="checkCode" :disabled="disabled">{{ codeText }}</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="middle">
          <el-col :span="8">密码</el-col>
          <el-col :span="9">
            <el-input placeholder="密码" v-model="registerInfo.password" show-password size="medium"></el-input>
          </el-col>
          <el-col :span="7">
            <p v-show="registerInfo.password">
              密码强度:
              <span :style="codeColor(codeStrength)">{{ codeStrength }}</span>
            </p>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" align="middle">
          <el-col :span="8">确认密码</el-col>
          <el-col :span="9">
            <el-input placeholder="确认密码" v-model="rPassword" show-password size="medium"></el-input>
          </el-col>
          <el-col :span="7"></el-col> </el-row
        ><el-row :gutter="20" type="flex" align="middle">
          <el-col :span="8"></el-col>
          <el-col :span="9"><el-button type="primary" size="medium" @click="register">注册</el-button></el-col>
          <el-col :span="7"></el-col>
        </el-row>
      </el-card>
    </login-mode>
  </div>
</template>

<script>
// 引入登录注册模板组件
import LoginMode from 'components/content/LoginMode'
// 引入注册请求函数
import { registerCodeCheck, registerAccount } from 'network/login_request.js'
export default {
  name: 'Register',
  components: {
    LoginMode,
  },
  data() {
    return {
      // 注册参数信息
      registerInfo: {
        // 手机号
        phone: '',
        // 密码
        password: '',
        // 短信验证码
        code: '',
      },
      // 确认密码
      rPassword: '',
      // 控制获取验证码按钮是否被禁用
      disabled: false,
      // 还剩多少秒可以再次点击发送验证码
      totalCount: 0,
    }
  },
  computed: {
    // 计算密码显示等级
    codeStrength() {
      let n = 0
      let pwd = this.registerInfo.password
      let content = ''
      if (/\d+/.test(pwd)) {
        n++
      }
      if (/[A-Za-z]+/.test(pwd)) {
        n++
      }
      if (/[^0-9A-Za-z]+/.test(pwd)) {
        n++
      }
      switch (n) {
        case 1:
          content = '弱'
          break
        case 2:
          content = '中'
          break
        case 3:
          content = '强'
          break
      }
      return content
    },
    // 返回密码等级的颜色
    codeColor() {
      return (val) => {
        if (val === '弱') {
          return { color: 'rgb(255, 19, 46)' }
        } else if (val === '中') {
          return { color: 'rgb(239, 149, 55)' }
        } else if (val === '强') {
          return { color: 'rgb(32, 202, 81)' }
        }
      }
    },
    // 获取验证码按钮的显示文本
    codeText() {
      return this.totalCount !== 0 ? `${this.totalCount}s` : '获取验证码'
    },
  },
  methods: {
    // 获取验证码
    checkCode() {
      if (this.registerInfo.phone.length !== 11)
        return this.$message({
          message: '请输入正确的手机号',
          type: 'error',
        })
      registerCodeCheck(this.registerInfo.phone).then((res) => {
        if (res.code !== 200)
          return this.$message({
            message: res.message,
            type: 'error',
          })
        // 发送验证码后60s内不可再次点击
        this.disabled = true
        this.totalCount = 60
        let clock = setInterval(() => {
          this.totalCount--
          if (this.totalCount === 0) {
            clearInterval(clock)
            this.disabled = false
          }
        }, 1000)
      })
    },
    // 注册账号
    register() {
      // 发送注册请求前先验证表单
      if (this.registerInfo.phone.length !== 11) {
        return this.$message({
          message: '请输入11位手机号',
          type: 'error',
        })
      } else if (this.registerInfo.code.length !== 6) {
        return this.$message({
          message: '请输入6位验证码',
          type: 'error',
        })
      } else if (this.registerInfo.password.length < 8) {
        return this.$message({
          message: '请输入至少8位的密码',
          type: 'error',
        })
      } else if (this.registerInfo.password !== this.rPassword) {
        return this.$message({
          message: '请输入相同的确认密码',
          type: 'error',
        })
      }

      //发起注册请求
      registerAccount(this.registerInfo).then((res) => {
        if (res.code !== 200)
          return this.$message({
            message: res.message,
            type: 'error',
          })
      })
    },
  },
}
</script>

<style lang="less" scoped>
#register {
  min-width: 500px;
  width: 100%;
  .box-card {
    position: relative;
    width: 800px;
    height: 90%;
    .go-login {
      position: absolute;
      padding: 0 10px 10px;
      right: 20px;
      color: #1fa2f8;
      font-size: 13px;
    }
    .title {
      padding: 20px 0;
      color: #1fa2f8;
      height: 40px;
      line-height: 40px;
      font-size: 22px;
      text-align: center;
    }
    /deep/ .el-row {
      margin-bottom: 15px;
      .el-col {
        height: 100%;
        &:first-child {
          font-size: 13px;
          text-align: right;
          color: rgba(0, 0, 0, 0.65);
        }
      }
      .el-input__inner {
        border-radius: 4px;
      }
      &:last-child {
        .el-col {
          .el-button {
            width: 100%;
            font-size: 17px;
            letter-spacing: 5px;
          }
        }
      }
    }
  }
  /deep/ #login-mode {
    .login-form {
      justify-content: center;
    }
  }
}
</style>
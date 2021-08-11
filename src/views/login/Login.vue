<template>
  <div id="login">
    <login-mode>
      <el-card class="box-card">
        <h4>账号登录</h4>
        <el-input v-model="loginInfo.loginName" placeholder="账号、手机号"></el-input>
        <el-input placeholder="密码" v-model="loginInfo.password" show-password></el-input>
        <el-button type="primary" class="login_btn" @click="loginBtn">登录</el-button>
        <p class="login-register"><router-link to="/login/r">立即注册</router-link> | <a href="#">忘记密码</a></p>
        <div class="dividing-line">
          <span></span>
          <span>其他登录方式</span>
          <span></span>
        </div>
        <div class="order-login">
          <span class="iconfont">&#xe7e5;</span>
        </div>
      </el-card>
    </login-mode>
  </div>
</template>

<script>
import LoginMode from 'components/content/LoginMode'
import { mapMutations } from 'vuex'
import { login } from 'network/login_request.js'
export default {
  name: 'Login',
  components: {
    LoginMode,
  },
  data() {
    return {
      loginInfo: {
        // 账号
        loginName: '',
        // 密码
        password: '',
      },
    }
  },
  methods: {
    ...mapMutations(['SAVE_USER']),
    // 登录
    loginBtn() {
      login(this.loginInfo.loginName, this.$md5(this.loginInfo.password)).then((res) => {
        if (res.code !== 200)
          return this.$message({
            message: res.message,
            type: 'error',
          })
        this.SAVE_USER(res.data)
        this.$router.push('/front')
      })
    },
  },
  beforeRouteEnter(to, from, next) {
    window.localStorage.removeItem('user')
    next()
  },
}
</script>

<style lang="less" scoped>
#login {
  min-width: 500px;
  width: 100%;
  .box-card {
    height: 90%;
    width: 20vw;
    min-width: 240px;
    h4 {
      margin-bottom: 40px;
      color: #1fa2f8;
      font-size: 24px;
      text-align: center;
    }
    .el-input {
      margin-bottom: 20px;
      /deep/ .el-input__inner {
        height: 45px;
        line-height: 45px;
      }
    }
    .login_btn {
      width: 100%;
    }
    .login-register {
      margin: 10px 0 20px;
      text-align: right;
      color: #ababab;
      font-size: 14px;
      a {
        color: #ababab;
      }
    }
    .dividing-line {
      display: flex;
      color: #ababab;
      font-size: 14px;
      align-items: center;
      text-align: center;
      span {
        flex: 1;
        &:first-child,
        &:last-child {
          height: 0;
          border-bottom: 1px solid #ababab;
        }
      }
    }
    .order-login {
      display: flex;
      height: 100px;
      justify-content: center;
      align-items: center;
      .iconfont {
        display: block;
        width: 40px;
        height: 40px;
        color: #fff;
        background: #46aa37;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        border-radius: 50%;
      }
    }
  }
}
</style>
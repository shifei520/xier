<template>
  <div class="u-detail">
    <!-- 个人设置区域 -->
    <div class="personal-setting">
      <div class="personal-setting-title">个人设置</div>
      <!-- 个人基本信息 -->
      <div class="essential-info">
        <div class="essential-info-title">
          <span>基本信息</span>
          <el-button type="primary" size="mini" @click="saveEssentialInfo">保存</el-button>
        </div>
        <div class="essential-info-name">
          <p>昵称&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-input v-model="updateUserInfo.nickName" placeholder="请输入昵称" size="small"></el-input>
        </div>
        <div class="essential-info-avatar">
          <p>头像&nbsp;&nbsp;&nbsp;&nbsp;</p>

          <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeAvatarUpload">
            <img :src="updateUserInfo.headUrl ? updateUserInfo.headUrl : userInfoObj.headUrl" class="avatar" />
          </el-upload>
          <p>支持jpg、gif、png格式的图片。建议文件小于200KB</p>
        </div>
        <div class="essential-info-sex">
          <p>性别&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-select v-model="updateUserInfo.sex" placeholder="请选择" size="small">
            <el-option label="男" value="1"> </el-option>
            <el-option label="女" value="0"> </el-option>
          </el-select>
        </div>
        <div class="essential-info-birthday">
          <p>性别&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-date-picker v-model="updateUserInfo.birthday" type="date" value-format="yyyy-MM-dd" placeholder="请选择生日" size="small"> </el-date-picker>
        </div>
        <div class="essential-info-introduce">
          <p>简介&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="updateUserInfo.introduction"> </el-input>
        </div>
      </div>
      <!-- 联系信息 -->
      <div class="contact-info">
        <div class="contact-info-title">
          <span>联系信息</span>
          <el-button type="primary" size="mini" @click="saveContactInfo">保存</el-button>
        </div>
        <div class="real-name">
          <p>真实姓名&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-input v-model="updateContactInfo.realName" size="small"></el-input>
        </div>
        <div class="common-email">
          <p>常用邮箱&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-input v-model="updateContactInfo.email" size="small"></el-input>
        </div>
        <div class="phone-num">
          <p>手机电话&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-input v-model="updateContactInfo.phone" size="small" :disabled="true"></el-input>
        </div>
        <div class="work-unit">
          <p>工作单位&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-input v-model="updateContactInfo.company" size="small"></el-input>
        </div>
        <div class="unit-nature">
          <p>单位性质&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-input v-model="updateContactInfo.companyNature" size="small"></el-input>
        </div>
        <div class="mail-address">
          <p>通信地址&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <el-input v-model="updateContactInfo.address" size="small"></el-input>
        </div>
      </div>
    </div>
    <!-- 账号设置区域 -->
    <div class="account-setting">
      <div class="account-setting-title">账号设置</div>
      <div class="login-account">
        <p>登录账号</p>
        <p>{{ userInfoObj.loginName }}</p>
        <a @click="dialoaPwdVisible = true">修改密码</a>
      </div>
      <div class="phone-account">
        <p>手机账号</p>
        <p>{{ userInfoObj.phone }}</p>
        <a @click="dialogPhoneVisible = true">更换手机号</a>
      </div>
    </div>
    <!-- 修改密码对话框 -->
    <el-dialog width="40%" title="修改密码" :visible.sync="dialoaPwdVisible">
      <el-form :model="updatePwdInfo" :rules="rules" label-width="150px" ref="InvoinceRef">
        <el-form-item label="旧密码:" prop="password">
          <el-input v-model="updatePwdInfo.password" placeholder="请输入旧密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newPassword">
          <el-input v-model="updatePwdInfo.newPassword" placeholder="请输入新密码" show-password></el-input>
          <p v-show="updatePwdInfo.newPassword" class="password-strength">密码强度:{{ codeStrength(updatePwdInfo.newPassword) }}</p>
        </el-form-item>
        <el-form-item label="重复密码:" prop="reRassword">
          <el-input v-model="updatePwdInfo.reRassword" placeholder="请确认新密码" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer"
        ><el-button @click="dialoaPwdVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">修改</el-button>
      </span>
    </el-dialog>
    <!-- 换绑手机号对话框 -->
    <div class="dialog-phone" v-if="dialogPhoneVisible">
      <div class="header"></div>
      <div class="close-btn" @click="dialogPhoneVisible = false">×</div>
      <div class="dialog-phone-content">
        <el-input v-model="codeInfo.phone" placeholder="请输入手机号"></el-input>

        <div class="emit-code">
          <el-input v-model="codeInfo.code" placeholder="请输入验证码"></el-input>
          <el-button type="primary" size="medium" @click="emitCode">发送验证码</el-button>
        </div>
        <el-button type="primary" size="medium" @click="changePhoneBtn">确定</el-button>
      </div>
    </div>
    <div class="mask" v-if="dialogPhoneVisible"></div>
  </div>
</template>

<script>
import { userDetailInfo, updateAvatar, updateEssentialInfo, updateContactInfoFunc, updatePWd, checkedCode, changePhone, bindPhone } from 'network/user_data.js'
import mixin from '@/mixins/mixin.js'
export default {
  name: 'Udetail',
  mixins: [mixin],
  data() {
    // 自定义表单校验规则
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.updatePwdInfo.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 个人信息数据
      userInfoObj: {},
      // 基本信息参数
      updateUserInfo: {
        // 返回的图片地址
        headUrl: null,
        nickName: '',
        sex: null,
        birthday: '',
        introduction: '',
      },
      // 联系信息参数
      updateContactInfo: {
        realName: '',
        email: '',
        phone: '',
        company: '',
        companyNature: '',
        address: '',
      },
      // 修改密码对话框的显示与隐藏
      dialoaPwdVisible: false,
      // 改邦手机号对话框的显示与隐藏
      dialogPhoneVisible: false,
      updatePwdInfo: {
        password: '',
        newPassword: '',
        reRassword: '',
      },
      //表单校验规则
      rules: {
        password: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码(密码长度不小于6)', trigger: 'blur', min: 6 }],
        reRassword: [{ validator: validatePass, trigger: 'blur' }],
      },
      // 修改绑定手机号参数
      codeInfo: {
        code: '',
        phone: '',
      },
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 获取个人信息
    getUserInfo() {
      userDetailInfo().then((res) => {
        this.userInfoObj = res.data
        this.updateUserInfo.sex = res.data.sex === 1 ? '男' : '女'
        this.updateUserInfo.nickName = res.data.nickName
        this.updateUserInfo.introduction = res.data.introduction
        this.updateContactInfo.phone = res.data.phone
        this.updateContactInfo.realName = res.data.realName
        this.updateContactInfo.email = res.data.email
        this.updateContactInfo.company = res.data.company
        this.updateContactInfo.companyNature = res.data.companyNature
        this.updateContactInfo.address = res.data.address
      })
    },
    // 上传用户头像图片
    beforeAvatarUpload(file) {
      let that = this
      let params = {
        kind: 1,
        file: file,
      }
      let data = new FormData()
      data.append('kind', params.kind)
      data.append('file', params.file)
      updateAvatar(data).then((res) => {
        this.updateUserInfo.headUrl = res.data.headerUrl
        return
      })
    },
    //保存用户基本信息
    saveEssentialInfo() {
      if (this.updateUserInfo.sex == '男') {
        this.updateUserInfo.sex = 1
      }
      if (this.updateUserInfo.sex == '女') {
        this.updateUserInfo.sex = 0
      }
      updateEssentialInfo(this.updateUserInfo).then((res) => {
        if (res.code === 200)
          return this.$message({
            message: res.message,
            type: 'success',
          })
      })
    },
    // 保存用户联系信息
    saveContactInfo() {
      updateContactInfoFunc(this.updateContactInfo).then((res) => {
        if (res.code === 200)
          return this.$message({
            message: res.message,
            type: 'success',
          })
      })
    },
    // 修改密码
    updatePassword() {
      const params = {}
      params.password = this.$md5(this.updatePwdInfo.password).toUpperCase()
      params.newPassword = this.$md5(this.updatePwdInfo.newPassword).toUpperCase()
      updatePWd(params).then((res) => {
        if (res.code === 200) {
          this.dialoaPwdVisible = false
          return this.$message({
            message: '修改密码成功',
            type: 'success',
          })
        }
      })
    },
    // 发送验证码
    emitCode() {
      if (this.codeInfo.phone === '')
        return this.$message({
          message: '请输入正确的手机号',
          type: 'error',
        })

      checkedCode(this.codeInfo.phone).then((res) => {
        if (res.code === 200)
          return this.$message({
            message: '请到手机查看验证码',
            type: 'info',
          })
      })
    },
    // 改邦手机号
    changePhoneBtn() {
      if (this.codeInfo.code === '')
        return this.$message({
          message: '请输入验证码',
          type: 'error',
        })
      changePhone(this.codeInfo).then((res) => {
        if (res.code === 200) {
          bindPhone(this.codeInfo.phone).then((res) => {
            if (res.code === 200) {
              this.dialogPhoneVisible = false
              this.getUserInfo()
              return this.$message({
                message: res.message,
                type: 'success',
              })
            } else {
              return this.$message({
                message: res.message,
                type: 'error',
              })
            }
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.u-detail {
  .personal-setting {
    .personal-setting-title {
      padding-bottom: 20px;
      border-bottom: 1px solid #e0e0e0;
    }

    .essential-info {
      margin-top: 20px;
      .essential-info-title {
        display: flex;
        color: #000;
        font-size: 14px;
        justify-content: space-between;
      }
      .essential-info-name {
        display: flex;
        .el-input {
          width: 200px;
        }
        p {
          font-size: 12px;
        }
      }
      .essential-info-avatar {
        margin-top: 15px;
        display: flex;
        position: relative;
        p {
          font-size: 12px;
        }
        .avatar-uploader {
          width: 100px;
          height: 100px;
        }
        img {
          height: 100px;
          width: 100px;
          box-sizing: border-box;
          cursor: pointer;
          &:hover {
            border: 1px dotted rgb(67, 155, 182);
          }
        }
      }
      .essential-info-sex {
        display: flex;
        margin-top: 20px;
        p {
          font-size: 12px;
        }
        .el-select {
          width: 70px;
        }
      }
      .essential-info-birthday {
        display: flex;
        margin-top: 20px;
        p {
          font-size: 12px;
        }
        .el-date-picker {
          width: 200px;
        }
      }
      .essential-info-introduce {
        display: flex;
        margin-top: 20px;
        p {
          font-size: 12px;
        }
        .el-textarea {
          width: 300px;
        }
      }
    }
    .contact-info {
      margin-top: 20px;
      border-top: 1px solid #e0e0e0;
      .contact-info-title {
        margin-top: 20px;
        display: flex;
        color: #000;
        font-size: 14px;
        justify-content: space-between;
      }
      .real-name,
      .common-email,
      .phone-num,
      .work-unit,
      .unit-nature,
      .mail-address {
        display: flex;
        margin-top: 20px;
        p {
          font-size: 12px;
        }
        .el-input {
          width: 200px;
        }
      }
    }
  }
  .account-setting {
    margin-top: 30px;
    border-top: 1px solid #e0e0e0;
    .account-setting-title {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .login-account,
    .phone-account {
      display: flex;
      p {
        font-size: 14px;
        &:nth-of-type(2) {
          margin: 0 50px;
        }
      }
      a {
        color: #1fa2f8;
        font-size: 12px;
        cursor: pointer;
      }
    }
    .phone-account {
      margin-top: 20px;
    }
  }
  .dialog-phone {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 400px;
    height: 310px;
    background-color: #fff;
    transform: translate(-50%, -50%);
    z-index: 100;
    .header {
      height: 90px;
      background: url('~assets/img/phone_bc.png') no-repeat 50%;
      background-size: cover;
    }
    .close-btn {
      position: absolute;
      right: 10px;
      top: 10px;
      color: #fff;
      font-size: 28px;
      font-weight: 700;
      z-index: 111;
    }
    .dialog-phone-content {
      width: 100%;
      height: 100%;
      padding: 30px 50px 0;
      text-align: center;
      box-sizing: border-box;

      .emit-code {
        display: flex;
        margin-top: 20px;
        height: 40px;
      }
      > .el-button {
        margin-top: 15px;
        width: 190px;
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
}
</style>
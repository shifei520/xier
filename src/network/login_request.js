import { request } from './request.js'

// 发起注册请求获取验证码
export function registerCodeCheck(phone) {
  return request({
    method: 'post',
    url: '/api/cei/front/get_regist_check_code',
    data: {
      phone,
    },
  })
}

// 注册账号
export function registerAccount(queryInfo) {
  return request({
    method: 'post',
    url: '/api/cei/register',
    data: queryInfo,
  })
}

// 登录
export function login(loginName, password) {
  return request({
    method: 'post',
    url: '/api/cei/login',
    data: {
      loginName,
      password,
    },
  })
}

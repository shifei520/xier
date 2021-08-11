import { request } from './request.js'

// 获取用户订单、优惠券、购物车等数量
export function userCount() {
  return request({
    url: '/api/cei/get_user_count',
  })
}

// 证书查询
export function queryCertificateInfo(queryInfo) {
  return request({
    url: '/api/cei/front/search_certificate_class_detail_list',
    params: queryInfo,
  })
}

// 获取用户信息
export function userDetailInfo() {
  return request({
    url: '/api/cei/get_user_info',
  })
}

//获取环保大咖的个人信息
export function hisunUserInfo(userID) {
  return request({
    url: '/api/cei/front/get_user_dynamicLog_message',
    params: {
      userID,
    },
  })
}

// 关注该大咖事件
export function focusOnUser(userID) {
  return request({
    url: '/api/cei/add_userAttention',
    params: {
      userID,
    },
  })
}

// 取关该大咖事件
export function unFocusUser(attentionID) {
  return request({
    url: '/api/cei/delete_userAttention',
    params: {
      attentionID,
    },
  })
}

// 加入购物车
export function addCard(cardQueryInfo) {
  return request({
    method: 'post',
    url: '/api/cei/save_card',
    data: cardQueryInfo,
  })
}

// 获得购物车列表
export function cardList() {
  return request({
    url: '/api/cei/get_card_list',
  })
}

// 更新购物车商品数量
export function updateCardNum(updateQueryInfo) {
  return request({
    method: 'post',
    url: '/api/cei/update_card_num',
    data: updateQueryInfo,
  })
}

// 从购物车中删除某商品
export function deleteOneShop(deleteQueryInfo) {
  return request({
    method: 'post',
    url: '/api/cei/delete_card_product',
    data: deleteQueryInfo,
  })
}

//上传更新头像图片
export function updateAvatar(data) {
  return request({
    method: 'post',
    url: '/api/cei/upload_image',
    data: data,
  })
}

// 更新用户基本信息
export function updateEssentialInfo(data) {
  return request({
    method: 'post',
    url: '/api/cei/update_user_info',
    data: data,
  })
}

// 更新联系信息
export function updateContactInfoFunc(data) {
  return request({
    method: 'post',
    url: '/api/cei/update_user_contact',
    data: data,
  })
}

// 更新密码
export function updatePWd(data) {
  return request({
    method: 'post',
    url: '/api/cei/update_password',
    data: data,
  })
}

// 获取换绑手机号验证码
export function checkedCode(phone) {
  return request({
    method: 'post',
    url: '/api/cei/get_check_code',
    data: {
      phone,
    },
  })
}

// 换绑手机号
export function changePhone(data) {
  return request({
    method: 'post',
    url: '/api/cei/validity_check_code',
    data: data,
  })
}

export function bindPhone(phone) {
  return request({
    method: 'post',
    url: '/api/cei/bind_phone',
    data: {
      phone,
    },
  })
}

import { request } from './request.js'

// 获取动态列表数据
export function dynamicLogList(params) {
  return request({
    url: '/api/cei/search_dynamicLog_list',
    params: params,
  })
}

// 获取用户回答的总数列表
export function userAnswerList(params) {
  return request({
    url: '/api/cei/get_user_answer_list',
    params: params,
  })
}

// 修改回答
export function updateUserAnswer(data) {
  return request({
    method: 'post',
    url: '/api/cei/update_user_answer',
    data: data,
  })
}

// 删除回答
export function deleteUserAnswer(answerID) {
  return request({
    method: 'post',
    url: '/api/cei/delete_answer',
    data: {
      answerID,
    },
  })
}

// 关注用户列表
export function attentionList(params) {
  return request({
    url: '/api/cei/get_user_attention_list',
    params: params,
  })
}

//获取收藏列表数据
export function collectionList(params) {
  return request({
    url: '/api/cei/get_userCollection_list',
    params: params,
  })
}

// 取消收藏问题
export function deleteCollection(collectionID) {
  return request({
    url: '/api/cei/delete_user_collection',
    params: {
      collectionID,
    },
  })
}

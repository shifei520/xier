import { request } from './request.js'

// 问答区域数据
export function answerData(askID) {
  return request({
    url: '/api/cei/front/get_answer_list_by_askID',
    params: {
      askID,
    },
  })
}

// 回答问题
export function saveAnswer(answerInfo) {
  return request({
    method: 'post',
    url: '/api/cei/save_answer',
    data: answerInfo,
  })
}

// 举报问题
export function reportAsk(reportInfo) {
  return request({
    method: 'post',
    url: '/api/cei/save_report',
    data: reportInfo,
  })
}

// 收藏问题
export function collectAsk(askID) {
  return request({
    url: '/api/cei/add_user_collection',
    params: {
      askID,
    },
  })
}

// 关注回答用户
export function attentionAsk(userID) {
  return request({
    url: '/api/cei/add_userAttention',
    params: {
      userID,
    },
  })
}

// 给回答问题点赞
export function thumbAnswer(answerID) {
  return request({
    method: 'post',
    url: '/api/cei/save_answer_thumb_up',
    data: {
      answerID,
    },
  })
}

// 获取回答的评论列表数据
export function getRemarkList(answerID) {
  return request({
    url: '/api/cei/front/get_remark_list_by_answerID',
    params: {
      answerID,
    },
  })
}

// 发表评论
export function makeComment(commentInfo) {
  return request({
    method: 'post',
    url: '/api/cei/save_remark',
    data: commentInfo,
  })
}

//获取为回答的问题数据列表
export function noAnswerList(noAnswerInfo) {
  return request({
    url: '/api/cei/front/get_ask_no_answer_list',
    params: noAnswerInfo,
  })
}

// 获取优秀环保大咖列表
export function userAnswerRank(userInfo) {
  return request({
    url: '/api/cei/front/get_user_answer_ranking_list',
    params: userInfo,
  })
}

// 发表问题
export function askQuestion(askInfo) {
  return request({
    method: 'post',
    url: '/api/cei/save_ask',
    data: askInfo,
  })
}

// 优秀大咖发表的文章和问题
export function hisunEssayAndAsk(hisunEssayParams) {
  return request({
    url: '/api/cei/front/get_user_dynamicLog_list',
    params: hisunEssayParams,
  })
}

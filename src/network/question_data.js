import { request } from './request.js'

// 获取问题分类
export function questionSeries() {
  return request({
    url: '/api/cei/front/search_ask_category_list',
  })
}

// 获取问题列表
export function questionsList(questionInfo) {
  return request({
    url: '/api/cei/front/get_ask_list',
    params: questionInfo,
  })
}

// 获取热门推荐问题
export function hotQuestionRecomm(hotQuestionInfo) {
  return request({
    url: '/api/cei/front/get_ask_recommend_list',
    params: hotQuestionInfo,
  })
}

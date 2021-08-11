import { request } from './request.js'

// 热门资讯详情
export function hotNews(informationID) {
  return request({
    url: '/api/cei/front/get_information_detail',
    params: {
      informationID,
    },
  })
}

// 所有资讯列表数据
export function allNewsList(queryInfo) {
  return request({
    url: '/api/cei/front/get_information_list',
    params: queryInfo,
  })
}

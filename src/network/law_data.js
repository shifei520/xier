import { request } from './request.js'

// 根据id获取法律条款的信息
export function lawItemData(lawID) {
  return request({
    url: '/api/cei/front/get_law_info_by_ID',
    params: {
      lawID,
    },
  })
}

// 获取法律法规分类类别
export function lawSeriesList() {
  return request({
    url: '/api/cei/front/search_law_series_list',
  })
}

// 获取某一系列法律法规详细分类
export function lawCategoryList(lawSeriesIDList) {
  return request({
    method: 'post',
    url: '/api/cei/front/search_law_category_list',
    params: {
      lawSeriesIDList,
      pageSize: 10,
    },
  })
}
// 根据关键词检索相关法律法规
export function searchLawsByKeywords(keyWordInfo) {
  return request({
    method: 'post',
    url: '/api/cei/front/search_laws_list_by_key_word',
    params: keyWordInfo,
  })
}
// 根据筛选回去法律法规数据
export function screenLaws(screenInfo) {
  return request({
    method: 'post',
    url: '/api/cei/front/search_laws_list_by_law_categoryIDs',
    params: screenInfo,
  })
}

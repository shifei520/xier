import { request } from './request'

// 获取职位分类数据
export function positionClassify() {
  return request({
    url: '/api/cei/front/search_all_job_category_list',
  })
}

// 获取职位详细信息
export function positionList(queryInfo) {
  return request({
    url: '/api/cei/front/search_recruitment_list',
    params: queryInfo,
  })
}

// 获取最新公司信息
export function latestCompany(queryInfo) {
  return request({
    url: '/api/cei/front/search_company_list',
    params: queryInfo,
  })
}

import { request } from './request.js'

// 搜索全部类型的产品
export function allProducts(params) {
  return request({
    url: '/api/cei/front/search_all_product',
    params: params,
  })
}

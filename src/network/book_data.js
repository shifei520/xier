import { request } from './request'

// 获取图书馆书籍分类
export function bookClassify() {
  return request({
    url: '/api/cei/front/search_book_category_list',
  })
}

// 获取全部书籍
export function allBookList(queryInfo) {
  return request({
    url: '/api/cei/front/get_book_list',
    params: queryInfo,
  })
}

// 获取图书侧边栏推荐数据
export function asideRecommData() {
  return request({
    url: '/api/cei/get_recommend_list',
    params: {
      viewPageID: 13,
    },
  })
}

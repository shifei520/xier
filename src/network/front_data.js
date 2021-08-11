import { request } from './request.js'

// 获取轮播图数据
export function swiperData() {
  return request({
    url: '/api/cei/front/get_picture_rotation',
  })
}

// 课程列表数据获取
export function courseListData(queryInfo) {
  return request({
    url: 'api/cei/front/get_navigation_list',
    params: queryInfo,
  })
}

// 特色项目数据
export function featuredItemsData() {
  return request({
    url: 'api/cei/front/search_home_recommen_web_category_list',
  })
}

// 获取培训专栏数据
export function trainingData() {
  return request({
    url: 'api/cei/front/search_home_floor_list',
  })
}

// 获取培训专栏推荐课程
export function recommCourses(floorID) {
  return request({
    url: 'api/cei/front/search_home_floor_product_web_recom_list',
    params: {
      floorID,
    },
  })
}

// 获取本地静态数据
export function getData() {
  return request({
    url: './data.json',
  })
}

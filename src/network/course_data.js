import { request } from './request'

// 获取具体法律法规相关课程或书籍数据
export function lawCourseOneData(productID) {
  return request({
    url: '/api/cei/front/get_product_detail',
    params: {
      productID,
    },
  })
}

// 课程推荐数据
export function recommendOneClass(viewPageID) {
  return request({
    url: '/api/cei/get_recommend_list',
    params: {
      viewPageID,
    },
  })
}

// 获取vip数据
export function membershipInfo() {
  return request({
    url: '/api/cei/front/search_membership_list',
  })
}

// 获取vip课程分类
export function vipCourseClassify(type) {
  return request({
    url: '/api/cei/front/get_first_series_list',
    params: {
      type,
    },
  })
}

// 获取vip课程数据
export function vipCourseData(courseInfo) {
  return request({
    url: '/api/cei/front/search_vip_product_list',
    params: courseInfo,
  })
}

// 获取首页在线课程、远程培训班、面授培训班
export function homeFloorCourseList(floorInfo) {
  return request({
    url: '/api/cei/front/search_home_floor_product_list',
    params: floorInfo,
  })
}

// 首页个模块推荐课程数据
export function homeFloorRecomCourseList(floorID) {
  return request({
    url: '/api/cei/front/search_home_floor_product_web_recom_list',
    params: {
      floorID,
    },
  })
}

// 用户最近学习的课程
export function latelyStudyCourses() {
  return request({
    url: '/api/cei/get_lately_user_study_list',
  })
}

// 获取学习中与已过期课程列表数据
export function learningAndExpiredCourse(params) {
  return request({
    url: '/api/cei/search_user_study_list',
    params: params,
  })
}

// 课程激活码
export function userCourseCard(data) {
  return request({
    method: 'post',
    url: '/api/cei/save_user_course_card',
    data: data,
  })
}

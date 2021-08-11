import { request } from './request'

// 优秀教师分类
export function teacherCategory() {
  return request({
    url: '/api/cei/front/search_teacher_category_list',
  })
}

// 获取教师列表
export function teacherList(teacherCategoryID) {
  return request({
    url: '/api/cei/front/get_teacher_list',
    params: {
      teacherCategoryID,
      pageSize: 100,
    },
  })
}

// 获取教师详细信息
export function teacherIntroduce(teacherID) {
  return request({
    url: '/api/cei/front/get_teacher_detail',
    params: {
      teacherID,
    },
  })
}

// 获取教师在售课程数据
export function sellCourse(teacherID) {
  return request({
    url: '/api/cei/front/get_teacher_course_list',
    params: {
      teacherID,
    },
  })
}

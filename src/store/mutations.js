import { SAVE_USER, INIT_USER_INFO, QUERY_CERTIFICATE_INFO, ADD_TO_CART } from './mutations-types.js'

export default {
  // 存储登录或注册用户数据
  [SAVE_USER](state, userInfo) {
    state.user = userInfo
    state.isLogin = true
    window.localStorage.setItem('user', JSON.stringify(userInfo))
  },
  // 页面初始化时获取localstorage里面的数据
  [INIT_USER_INFO](state) {
    let initData = window.localStorage.getItem('user')
    if (initData) {
      state.user = JSON.parse(initData)
      state.isLogin = true
    }
  },
  [QUERY_CERTIFICATE_INFO](state, data) {
    state.certificateInfo = data
  },
  // 去结算时加入vuex的购物车数据内
  [ADD_TO_CART](state, row) {
    state.checkedShops = row
  },
}

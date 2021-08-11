import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  // 是否登录
  isLogin: false,
  // 用户登录信息
  user: null,
  // 证书信息
  certificateInfo: [],
  // 已选中购物车数据
  checkedShops: [],
}

export default new Vuex.Store({
  state,
  mutations,
  actions: {},
  modules: {},
})

import { request } from './request.js'

// 获取各个省的信息
export function provinceList() {
  return request({
    url: '/api/cei/front/get_province_list',
  })
}

// 获取详细的地址信息
export function detailAddress(regionID) {
  return request({
    url: '/api/cei/front/get_next_level_list',
    params: {
      regionID,
    },
  })
}

// 保存收货地址
export function saveReceiveAddress(queryInfo) {
  return request({
    method: 'post',
    url: '/api/cei/add_user_address',
    data: queryInfo,
  })
}

// 获取收货地址
export function getAddress() {
  return request({
    url: '/api/cei/get_user_address_list',
  })
}

// 更新收货地址
export function updateReceiveAddress(queryInfo) {
  return request({
    method: 'post',
    url: '/api/cei/update_user_address',
    data: queryInfo,
  })
}

// 删除收货地址
export function deleteAddress(addressID) {
  return request({
    method: 'post',
    url: '/api/cei/delete_address',
    data: {
      addressID,
    },
  })
}

// 获取运费信息
export function freightInfo() {
  return request({
    url: '/api/cei//front/get_region_freight_list',
  })
}

// 获取发票信息
export function invoiceList() {
  return request({
    url: '/api/cei/get_user_invoice_list',
  })
}

// 添加保存发票信息
export function saveUserInvoice(queryInfo) {
  return request({
    method: 'post',
    url: '/api/cei/save_user_invoice',
    data: queryInfo,
  })
}

// 删除发票
export function deleteUserInvoice(invoiceIDs) {
  return request({
    method: 'post',
    url: '/api/cei/delete_user_invoice',
    data: {
      invoiceIDs,
    },
  })
}

// 获取订单支付信息
export function orderList(params) {
  return request({
    url: '/api/cei/get_new_order_list',
    params: params,
  })
}

// 获取订单详情
export function orderDetail(orderID) {
  return request({
    url: '/api/cei/get_order_detail',
    params: {
      orderID,
    },
  })
}

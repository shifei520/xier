<template>
  <div class="pay-order">
    <main>
      <div class="top-confirm-title">
        <h2>确认订单信息</h2>
        <p>请在30分钟内完成支付!超出可能导致购买失败,请重新下单</p>
      </div>
      <!-- 收货地址展示 -->
      <div class="address">
        <div class="address-title">收货地址</div>
        <el-row>
          <el-col :span="8" v-for="(item, index) in receiveAddressArr" :key="index">
            <div class="address-item">
              <p>{{ item.userName }}</p>
              <p>{{ item.phone }}</p>
              <p>{{ item.provinceName }}{{ item.cityName }}{{ item.countyName }}</p>
              <p>{{ item.address }}{{ item.postCode }}</p>
              <div><a @click="updateAddressBtn(item)">修改</a><a @click="deleteAddressBtn(item)">删除</a></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="add-address">
              <div class="add-img" @click="openDialogAddress">+</div>
              <p>添加收货地址</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 商品信息 -->
      <div class="shop-info">
        <div class="shop-info-head">
          <p>商品信息</p>
          <a>满{{ freightObj.freeShippingPrice }}包邮</a>
          <el-popover placement="top-start" title="运费价格说明" width="380" trigger="hover">
            <span class="province-list-price" v-for="(item, index) in freightObj.regionFreightList" :key="index">{{ item.regionName }}{{ item.freightPrice }}元</span>
            <a slot="reference">运费价格说明</a>
          </el-popover>
          <a @click="backToCart">返回购物车></a>
        </div>
        <div class="shop-info-list">
          <div class="shop-item" v-for="(item, index) in checkedShops" :key="index">
            <img :src="item.thumbnailUrl" alt="" />
            <p>{{ item.productName }}</p>
            <p>{{ item.price }}×{{ item.count }}</p>
            <el-select v-model="value1" placeholder="请选择折扣券" size="mini">
              <el-option label="不适用打折券" value="不适用打折券"> </el-option>
            </el-select>
            <p>{{ (item.price * item.count).toFixed(2) }}元</p>
          </div>
        </div>
        <div class="open-membership">
          <div class="open-vip-one">开通VIP会员,尽享优惠</div>
          <router-link tag="div" to="/front/vipPage" class="open-vip-two">立即开通</router-link>
        </div>
      </div>
      <!-- 发票信息 -->
      <div class="invoice-info">
        <div class="invoice-info-head">发票信息</div>
        <div class="invoice-info-main">
          <span>{{ invoiceShow }}</span>
          <a @click="updateInvoice">修改></a>
        </div>
      </div>
      <!-- 支付方式 -->
      <div class="pay-methods">
        <div class="pay-methods-head">支付方式</div>
        <div class="pay-methods-list">
          <div class="method-item">
            <img src="~assets/img/zfb.png" alt="" />
            <span>支付宝</span>
          </div>
          <div class="method-item">
            <img src="~assets/img/wx.png" alt="" />
            <span>微信支付</span>
          </div>
        </div>
      </div>
      <!-- 付款价格区域 -->
      <div class="payment">
        <p>
          应付金额：<span>{{ calcPrice }}</span
          >元
        </p>
        <p>优惠金额：0.00元</p>
        <p>
          实付总额：<span>{{ calcPrice }}</span
          >元
        </p>
        <div>立即支付</div>
      </div>
    </main>
    <!-- 新增收货地址对话框 -->
    <el-dialog title="新建收货地址" :visible.sync="dialogAddressVisible" width="30%" @close="closeDialog">
      <div class="form-content">
        <el-row :gutter="20">
          <el-col :span="12"><el-input v-model="addressQueryInfo.userName" placeholder="姓名"></el-input></el-col>
          <el-col :span="12"><el-input v-model="addressQueryInfo.phone" placeholder="手机号"></el-input></el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-cascader :props="props" v-model="value" :options="provinceListArr" class="detail-address"></el-cascader>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-input type="textarea" :rows="2" placeholder="详细地址" v-model="addressQueryInfo.address"> </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12"><el-input v-model="addressQueryInfo.postCode" placeholder="邮编"></el-input></el-col>
          <el-col :span="12"><el-input v-model="addressQueryInfo.label" placeholder="地址标签"></el-input></el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveAddress">保存</el-button>
        <el-button @click="dialogAddressVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改发票对话框 -->
    <el-dialog title="选择发票" :visible.sync="outerInvoiceVisible" width="40%">
      <!-- 外层对话框 -->
      <el-button type="primary" @click="innerInvoiceVisible = true">添加发票</el-button>
      <el-table :data="invoiceListArr">
        <el-table-column label="类型">
          <template slot-scope="scope">
            {{ scope.row.invoiceType === 1 ? '电子发票' : '纸质发票' }}
          </template>
        </el-table-column>
        <el-table-column label="抬头">
          <template slot-scope="scope">
            {{ scope.row.invoiceRise === 1 ? '个人' : '公司' }}
          </template>
        </el-table-column>
        <el-table-column label="公司名称" prop="companyName"> </el-table-column>
        <el-table-column label="纳税人识别号" prop="taxpayerNo"> </el-table-column>
        <el-table-column label="邮箱" prop="email"> </el-table-column>
        <el-table-column label="内容类型">
          <template slot-scope="scope">
            {{ scope.row.contentType === 1 ? '商品明细' : '商品类别' }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="selectInvoice(scope.row)">选择</el-button>
            <el-button type="text" @click="deleteInvoice(scope.row.invoiceID)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 内层对话框 -->
      <el-dialog width="40%" title="选择发票" :visible.sync="innerInvoiceVisible" append-to-body>
        <el-form :model="addInvoinceQueryInfo" :rules="rules" label-width="150px" ref="InvoinceRef">
          <el-form-item label="发票抬头:" prop="invoiceRise">
            <el-select v-model="addInvoinceQueryInfo.invoiceRise" placeholder="发票抬头">
              <el-option label="个人" value="1"> </el-option>
              <el-option label="公司" value="2"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位名称:" prop="companyName" v-if="addInvoinceQueryInfo.invoiceRise == 2">
            <el-input v-model="addInvoinceQueryInfo.companyName" placeholder="单位名称"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别号:" prop="taxpayerNo" v-if="addInvoinceQueryInfo.invoiceRise == 2">
            <el-input v-model="addInvoinceQueryInfo.taxpayerNo" placeholder="纳税人识别号"></el-input>
          </el-form-item>
          <el-form-item label="发票内容:" prop="contentType">
            <el-select v-model="addInvoinceQueryInfo.contentType" placeholder="发票内容">
              <el-option label="商品明细" value="1"> </el-option>
              <el-option label="商品类别" value="2"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电子邮箱:" prop="email">
            <el-input v-model="addInvoinceQueryInfo.email" placeholder="电子邮箱"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer"
          ><el-button type="primary" @click="saveInvoinceInfo">保存</el-button>
          <el-button @click="innerInvoiceVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { provinceList, detailAddress, saveReceiveAddress, getAddress, updateReceiveAddress, deleteAddress, freightInfo, invoiceList, saveUserInvoice, deleteUserInvoice } from 'network/order_data.js'
import { mapState } from 'vuex'
export default {
  name: 'Sorder',
  data() {
    return {
      // 新增地址弹出框
      dialogAddressVisible: false,
      // 修改发票外层弹出框
      outerInvoiceVisible: false,
      // 修改发票内层弹出框
      innerInvoiceVisible: false,
      // 新增地址参数
      addressQueryInfo: {
        address: '',
        label: '',
        phone: '',
        postCode: '',
        userName: '',
        provinceID: null,
        cityID: null,
        countyID: null,
        streetID: null,
      },
      // 各省信息列表
      provinceListArr: [],
      value: '',
      props: {
        lazy: true,
        lazyLoad: this.lazyLoad,
      },
      // 收货地址
      receiveAddressArr: [],
      // 是否修改地址
      isUpdate: false,
      // 各省运费信息
      freightObj: {},
      // 选择折扣券
      value1: '',
      // 添加发票操作参数
      addInvoinceQueryInfo: {
        invoiceRise: null,
        invoiceType: 1,
        contentType: null,
        email: '',
        //单位名称
        companyName: '',
        // 纳税人识别号
        taxpayerNo: '',
      },
      // 表单验证
      rules: {
        invoiceRise: [{ required: true, message: '请选择发票抬头', trigger: 'blur' }],
        contentType: [{ required: true, message: '请填写单位名称', trigger: 'blur' }],
        email: [{ required: true, message: '请填写电子邮箱', trigger: 'blur' }],
        companyName: [{ required: true, message: '请填写单位名称', trigger: 'blur' }],
        taxpayerNo: [{ required: true, message: '请填写单位名称', trigger: 'blur' }],
      },
      // 发票列表数据
      invoiceListArr: [],
      // 当前选择的发票
      currentInvoice: {},
    }
  },
  created() {
    this.getReceiveAddress()
    this.getFreightInfo()
  },
  computed: {
    ...mapState(['checkedShops']),
    // 显示发票
    invoiceShow() {
      let obj = JSON.stringify(this.currentInvoice)
      let invoice = this.currentInvoice
      let str = ''
      if (obj === '{}') return '不开发票'
      invoice.invoiceType === 1 ? (str += '电子发票') : (str += '纸质发票')
      str += invoice.companyName
      invoice.contentType === 1 ? (str += '商品明细') : (str += '商品类别')
      return str
    },
    // 计算总价格
    calcPrice() {
      let price = 0
      this.checkedShops.forEach((item) => {
        price += item.count * item.price
      })
      return price.toFixed(2)
    },
  },
  methods: {
    // 获取各地运费信息
    getFreightInfo() {
      freightInfo().then((res) => {
        this.freightObj = res.data
      })
    },
    // 获取省份列表
    getProvinceList() {
      provinceList().then((res) => {
        this.provinceListArr = res.data
        this.provinceListArr.forEach((item) => {
          if (item.regionName) {
            item.label = item.regionName
            delete item.regionName
          }
          if (item.regionID) {
            item.value = item.regionID
            delete item.regionID
          }
          // item.children = []
        })
      })
    },
    // 打开添加收货地址表单
    openDialogAddress() {
      this.dialogAddressVisible = true
      this.getProvinceList()
    },
    // 动态加载地址信息
    lazyLoad(node, resolve) {
      const { level, value } = node
      detailAddress(value).then((res) => {
        const nodes = res.data.map((item) => ({
          value: item.regionID,
          label: item.regionName,
          leaf: level >= 3, //控制有几层节点
        }))
        resolve(nodes)
      })
    },
    // 保存收货地址
    saveAddress() {
      this.addressQueryInfo.provinceID = this.value[0]
      this.addressQueryInfo.cityID = this.value[1]
      this.addressQueryInfo.countyID = this.value[2]
      this.addressQueryInfo.streetID = this.value[3]
      if (!this.isUpdate) {
        saveReceiveAddress(this.addressQueryInfo).then((res) => {
          if (res.code === 200) {
            this.getReceiveAddress()
            this.dialogAddressVisible = false
          }
        })
      } else {
        updateReceiveAddress(this.addressQueryInfo).then((res) => {
          if (res.code === 200) {
            this.getReceiveAddress()
            this.dialogAddressVisible = false
          }
        })
      }
    },
    // 获取收货地址
    getReceiveAddress() {
      getAddress().then((res) => {
        this.receiveAddressArr = res.data
      })
    },
    // 修改收货地址
    updateAddressBtn(val) {
      provinceList().then((res) => {
        this.provinceListArr = res.data
        this.provinceListArr.forEach((item) => {
          if (item.regionName) {
            item.label = item.regionName
            delete item.regionName
          }
          if (item.regionID) {
            item.value = item.regionID
            delete item.regionID
          }
          this.addressQueryInfo = val
          this.isUpdate = true
          this.dialogAddressVisible = true
        })
      })
    },
    closeDialog() {
      this.isUpdate = false
      this.getReceiveAddress()
    },
    // 删除收货地址
    deleteAddressBtn(val) {
      deleteAddress(val.addressID).then((res) => {
        if (res.code === 200) {
          this.getReceiveAddress()
        }
      })
    },
    // 返回购物车按钮
    backToCart() {
      this.$router.push('/front/cart')
    },
    // 获取发票信息
    getInvoiceList() {
      invoiceList().then((res) => {
        this.invoiceListArr = res.data
      })
    },
    // 修改发票信息
    updateInvoice() {
      this.getInvoiceList()
      this.outerInvoiceVisible = true
    },
    // 添加发票信息
    saveInvoinceInfo() {
      this.$refs.InvoinceRef.validate((valid) => {
        if (valid) {
          saveUserInvoice(this.addInvoinceQueryInfo).then((res) => {
            if (res.code === 200) {
              this.innerInvoiceVisible = false
            }
          })
        }
      })
    },
    // 选择当前发票
    selectInvoice(val) {
      this.currentInvoice = val
      this.outerInvoiceVisible = false
    },
    // 删除当前发票
    deleteInvoice(id) {
      deleteUserInvoice(id).then((res) => {
        if (res.code === 200) {
          this.getInvoiceList()
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.pay-order {
  background-color: #f5f5f5;
  overflow: hidden;
  main {
    padding: 20px;
    margin: 30px auto;
    max-width: 1230px;
    background-color: #fff;
    box-sizing: border-box;
    .top-confirm-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      h2 {
        font-size: 27px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      p {
        font-size: 16px;
        color: #f63440;
      }
    }
    .address {
      .el-row {
        .el-col {
          margin-top: 20px;
        }
      }
      .add-address {
        display: flex;
        padding: 10px;
        height: 200px;
        width: 350px;
        background: url('~assets/img/border_bc.png') no-repeat 50%;
        background-size: cover;
        box-sizing: border-box;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .add-img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: #ccc;
          color: #fff;
          line-height: 70px;
          font-size: 55px;
          text-align: center;
          cursor: pointer;
        }
      }
      .address-item {
        display: flex;
        padding: 25px;
        height: 200px;
        width: 350px;
        background: url('~assets/img/border_bc.png') no-repeat 50%;
        background-size: cover;
        box-sizing: border-box;
        flex-direction: column;
        p {
          font-size: 14px;
          &:first-child {
            margin-bottom: 10px;
            color: #000;
            font-size: 17px;
          }
        }
        div {
          align-self: flex-end;
          a {
            margin-right: 10px;
            color: #1fa2f8;
            font-size: 13px;
            cursor: pointer;
          }
        }
      }
    }
    .shop-info {
      margin-top: 60px;
      .shop-info-head {
        display: flex;
        height: 46px;
        line-height: 46px;
        border-bottom: 1px solid #dedede;
        justify-content: space-between;
        p {
          width: 600px;
          font-size: 23px;
          font-weight: 700;
        }
        a {
          color: #1fa2f8;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .shop-info-list {
        .shop-item {
          display: flex;
          padding: 10px 0;
          background-color: #e8f3ff;
          align-items: center;
          img {
            width: 100px;
            height: 60px;
          }
          p {
            margin-left: 10px;
            font-size: 14px;
            &:nth-of-type(1) {
              width: 650px;
            }
            &:nth-of-type(3) {
              color: #f55f4b;
            }
          }
          .el-select {
            margin: 0 30px;
          }
        }
      }
      .open-membership {
        display: flex;
        height: 80px;
        padding: 20px 48px;
        font-size: 20px;
        box-sizing: border-box;
        .open-vip-one {
          margin-right: 20px;
          color: #feaa5c;
        }
        .open-vip-two {
          background: linear-gradient(90deg, #ffd659, #ffa524);
          color: #fff;
          height: 35px;
          line-height: 35px;
          width: 100px;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .invoice-info {
      margin-top: 110px;
      .invoice-info-head {
        font-size: 23px;
        font-weight: 700;
      }
      .invoice-info-main {
        margin-top: 15px;
        a {
          margin-left: 80px;
          color: #1fa2f8;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .pay-methods {
      margin-top: 20px;
      margin-bottom: 20px;
      .pay-methods-head {
        margin-bottom: 15px;
        font-size: 23px;
        font-weight: 700;
      }
      .pay-methods-list {
        display: flex;
        .method-item {
          display: flex;
          padding: 5px 20px;
          margin-right: 30px;
          height: 60px;
          width: 200px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          justify-content: center;
          align-items: center;
          img {
            width: 30px;
            height: 30px;
          }
          span {
            margin-left: 10px;
            font-size: 18px;
            font-weight: 700;
          }
        }
      }
    }
    .payment {
      display: flex;
      padding: 20px;
      border-top: 1px solid #ccc;
      flex-direction: column;
      align-items: flex-end;
      div {
        margin-top: 20px;
        width: 158px;
        height: 38px;
        line-height: 38px;
        background: linear-gradient(90deg, #f6d97a, #ffa559);
        color: #fff;
        text-align: center;
        cursor: pointer;
        border-radius: 4px;
      }
      p {
        margin-top: 15px;
        font-size: 14px;
        span {
          color: #f55f4b;
          font-size: 24px;
        }
        &:nth-child(2) {
          font-size: 18px;
          color: #ff9e27;
          background-color: rgb(232, 243, 255);
        }
      }
    }
  }
  .el-row {
    margin-top: 20px;
    .detail-address {
      width: 100%;
    }
  }
}
.province-list-price {
  padding: 3px 8px;
  line-height: 28px;
}
</style>
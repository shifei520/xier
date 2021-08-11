<template>
  <div class="self-addr">
    <div class="page-title">收货地址</div>
    <!-- 收货地址展示 -->
    <div class="address">
      <div class="address-title">收货地址</div>
      <el-row
        ><el-col :span="12">
          <div class="add-address">
            <div class="add-img" @click="openDialogAddress">+</div>
            <p>添加收货地址</p>
          </div>
        </el-col>
        <el-col :span="12" v-for="(item, index) in receiveAddressArr" :key="index">
          <div class="address-item">
            <p>{{ item.userName }}</p>
            <p>{{ item.phone }}</p>
            <p>{{ item.provinceName }}{{ item.cityName }}{{ item.countyName }}</p>
            <p>{{ item.address }}{{ item.postCode }}</p>
            <div><a @click="updateAddressBtn(item)">修改</a><a @click="deleteAddressBtn(item)">删除</a></div>
          </div>
        </el-col>
      </el-row>
    </div>
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
  </div>
</template>

<script>
import { getAddress, provinceList, saveReceiveAddress, updateReceiveAddress, detailAddress, deleteAddress } from 'network/order_data.js'
export default {
  name: 'SelfAddr',
  data() {
    return {
      // 收货地址列表
      receiveAddressArr: [],
      // 新增地址弹出框
      dialogAddressVisible: false,
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
      // 是否修改地址
      isUpdate: false,
      props: {
        lazy: true,
        lazyLoad: this.lazyLoad,
      },
    }
  },
  created() {
    this.getReceiveAddress()
  },
  methods: {
    // 获取收货地址
    getReceiveAddress() {
      getAddress().then((res) => {
        this.receiveAddressArr = res.data
      })
    },
    // 打开添加收货地址表单
    openDialogAddress() {
      this.dialogAddressVisible = true
      this.getProvinceList()
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
    closeDialog() {
      this.isUpdate = false
      this.getReceiveAddress()
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
    // 删除收货地址
    deleteAddressBtn(val) {
      deleteAddress(val.addressID).then((res) => {
        if (res.code === 200) {
          this.getReceiveAddress()
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.self-addr {
  .page-title {
    margin: 20px 0;
    font-size: 28px;
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
}
.el-row {
  margin-top: 20px;
  .detail-address {
    width: 100%;
  }
}
</style>
<template>
  <div class="cartshop">
    <main>
      <el-table :data="cartListArr" style="width: 100%" @select="selectOneShop" @select-all="selectAllShops">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="日期" width="400">
          <template slot-scope="scope">
            <img :src="scope.row.thumbnailUrl" alt="" class="shop-img" />
            <p>{{ scope.row.productName }}</p>
          </template>
        </el-table-column>
        <el-table-column label="单价">
          <template slot-scope="scope"> ￥{{ scope.row.price }} </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.count" controls-position="right" :min="1" :max="10" :disabled="scope.row.productType === 1" @change="updateCart(scope.row)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="库存">
          <template slot-scope="scope">
            {{ scope.row.remainingAmount ? scope.row.remainingAmount : '' }}
          </template>
        </el-table-column>
        <el-table-column label="小计">
          <template slot-scope="scope"> ￥{{ (scope.row.count * scope.row.price).toFixed(2) }} </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteShop(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <footer>
      <a>继续购物</a>
      <p>
        共<span>{{ calcNum(cartListArr) }}</span
        >件商品，已选择<span>{{ calcNum(checkedShpsArr) }}</span
        >件
      </p>
      <p>满80元包邮</p>
      <div class="cart-price">
        <p>
          合计：￥<span>{{ calcPrice }}</span
          >元
        </p>
        <p>已减：￥0元</p>
      </div>
      <div class="cart-btn" @click="goAccount">去结算</div>
    </footer>
  </div>
</template>

<script>
// 购物车信息
import { cardList, updateCardNum, deleteOneShop } from 'network/user_data.js'
import { mapMutations } from 'vuex'
export default {
  name: 'Cart',
  data() {
    return {
      // 购物车列表数据
      cartListArr: [],
      // 已选商品列表
      checkedShpsArr: [],
      // 更新商品数量参数
      updateQueryInfo: {
        cardID: null,
        count: null,
        price: null,
      },
    }
  },
  created() {
    this.getCardList()
  },
  computed: {
    calcNum() {
      return (arr) => {
        let num = 0
        arr.forEach((item) => {
          num += 1
        })
        return num
      }
    },
    calcPrice() {
      let price = 0
      this.checkedShpsArr.forEach((item) => {
        price += item.count * item.price
      })
      return price
    },
  },
  methods: {
    ...mapMutations(['ADD_TO_CART']),
    // 获取购物车列表
    getCardList() {
      cardList().then((res) => {
        this.cartListArr = res.data[0].productList
      })
    },
    // 商品数量改变更新
    updateCart(val) {
      this.updateQueryInfo.cardID = val.cardID
      this.updateQueryInfo.count = val.count
      this.updateQueryInfo.price = val.price
      updateCardNum(this.updateQueryInfo).then((res) => {
        if (res.code === 200) {
          this.getCardList()
        }
      })
    },
    // 删除商品
    deleteShop(val) {
      deleteOneShop({ cardID: val.cardID, count: val.count }).then((res) => {
        if (res.code === 200) {
          this.getCardList()
        }
      })
    },
    selectOneShop(row) {
      this.checkedShpsArr = row
    },
    selectAllShops(row) {
      this.checkedShpsArr = row
    },
    // 购物车结算
    goAccount() {
      if (this.checkedShpsArr.length === 0)
        return this.$message({
          message: '请选择商品',
          type: 'error',
        })
      this.ADD_TO_CART(this.checkedShpsArr)
      this.$router.push('/front/sorder')
    },
  },
}
</script>

<style lang="less" scoped>
.cartshop {
  background-color: #f5f5f5;
  overflow: hidden;
  main {
    margin: 20px auto;
    max-width: 1230px;
    background-color: #fff;
    .shop-img {
      width: 120px;
      height: 80px;
    }
  }
  footer {
    display: flex;
    max-width: 1230px;
    margin: 30px auto;
    height: 53px;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    a {
      position: relative;
      margin-left: 40px;
      margin-right: 50px;
      font-size: 14px;
      &::after {
        content: '|';
        position: absolute;
        right: -25px;
        color: #dedede;
      }
    }
    p {
      font-size: 14px;
      span {
        margin: 0 10px;
        color: red;
      }
    }
    .cart-btn {
      margin-left: 50px;
      width: 200px;
      height: 48px;
      line-height: 48px;
      color: #fff;
      text-align: center;
      background: #f55f4b;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        color: blue;
        background-color: #fff;
      }
    }
    .cart-price {
      p {
        &:first-child {
          color: red;
          span {
            font-size: 28px;
          }
        }
      }
    }
  }
  /deep/ .cell {
    display: flex;
    align-items: center;
    p {
      margin-left: 10px;
    }
  }
}
</style>
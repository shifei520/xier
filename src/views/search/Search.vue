<template>
  <div class="search">
    <section>
      <el-row>
        <el-col :span="20">
          <el-row :gutter="20">
            <el-col :span="6" v-for="(item, index) in allProductArr" :key="index">
              <router-link
                tag="div"
                class="product-item"
                :to="{
                  path: `/front/${item.productType === 2 ? 'bdetail' : 'cdetail'}`,
                  query: {
                    id: item.productID,
                  },
                }"
              >
                <img :src="item.thumbnailUrl" alt="" class="thumbnail-img" />
                <span class="product-type">
                  {{ item.productType === 1 ? '在线' : '' }}
                  {{ item.productType === 3 ? '远程' : '' }}
                </span>
                <p class="product-name">
                  {{ item.productName }}
                </p>
                <div class="type_1" v-if="item.productType === 1">
                  <span class="iconfont"
                    >&#xe60e;&nbsp;<i>{{ item.teacherName }}</i></span
                  >
                  <div>
                    <span class="iconfont"><i class="love">&#xe62a;</i>&nbsp;{{ item.likeCount }}人喜欢</span>
                    <span class="iconfont"><i class="double">&#xe605;</i>&nbsp;&nbsp;{{ item.buyCount }}人购买 </span>
                  </div>
                  <div class="product-price">
                    <span>￥{{ item.basicPrice }}</span>
                    <span v-if="item.productType !== 2" :style="{ color: surplusTime(item.startTime, item.closeTime) === '已结束' ? '#d7dbde' : '#ff5d4c' }">{{
                      surplusTime(item.startTime, item.closeTime)
                    }}</span>
                  </div>
                  <img src="~assets/img/icon_5.png" alt="" class="icon-img" />
                </div>
                <div class="type_2" v-else-if="item.productType === 2">
                  <div class="product-price">
                    <span>￥{{ item.basicPrice }}</span>
                  </div>
                </div>
                <div class="type_3" v-else>
                  <div>
                    <span class="iconfont"><i class="love">&#xe603;</i>&nbsp;&nbsp;{{ item.startTime }}至{{ item.closeTime }} </span>
                  </div>
                  <span class="iconfont double"
                    >&#xe60e;&nbsp;<i>{{ item.teacherName }}</i></span
                  >

                  <div class="product-price">
                    <span>￥{{ item.basicPrice }}</span>
                    <span v-if="item.productType !== 2" :style="{ color: surplusTime(item.startTime, item.closeTime) === '已结束' ? '#d7dbde' : '#ff5d4c' }">{{
                      surplusTime(item.startTime, item.closeTime)
                    }}</span>
                  </div>
                  <img src="~assets/img/icon_5.png" alt="" class="icon-img" />
                </div>
              </router-link>
            </el-col>
          </el-row>
          <el-pagination background layout="prev, pager, next" :total="totalRows" :current-page="params.pageNo" @current-change="changeProductPage" :page-size="params.pageSize"> </el-pagination>
        </el-col>
        <el-col :span="4">&nbsp;</el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import { allProducts } from 'network/all_product.js'
export default {
  name: 'Search',
  data() {
    return {
      // 产品列表
      allProductArr: [],
      // 总的产品数
      totalRows: 0,
      // 产品参数
      params: {
        name: '',
        pageNo: 1,
        pageSize: 20,
      },
    }
  },
  created() {
    this.params.name = this.$route.query.content
    this.getAllProducts()
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        this.params.name = val.query.content
        this.getAllProducts()
      },
    },
  },
  computed: {
    surplusTime() {
      return (val_1, val_2) => {
        if (!val_1) return
        if (!val_2) return
        let now = new Date().valueOf()
        let close = new Date(val_2).valueOf()
        let start = new Date(val_1).valueOf()
        let a = close - now
        let b = now - start
        if (a >= 0 && b >= 0) {
          return '正在招生'
        }
        if (a < 0) return '已结束'
      }
    },
  },
  methods: {
    // 获取检索类型的产品
    getAllProducts() {
      allProducts(this.params).then((res) => {
        this.totalRows = res.data.totalRows
        this.allProductArr = res.data.rows
      })
    },
    // 分页器页数改变触发事件
    changeProductPage(val) {
      this.params.pageNo = val
      this.getAllProducts()
    },
  },
}
</script>

<style lang="less" scoped>
.search {
  overflow: hidden;
  background-color: #f0f2f5;
  section {
    width: 1230px;
    margin: 0 auto;
    .product-item {
      display: flex;
      position: relative;
      padding: 15px;
      font-size: 12px;
      min-height: 262px;
      background-color: #fff;
      border-radius: 10px;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.3s;
      .thumbnail-img {
        height: 120px;
      }
      .product-type {
        position: absolute;
        top: 24px;
        right: 24px;
        color: #fff;
        padding: 1px 5px;
        font-size: 12px;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
      }
      .product-name {
        margin-top: 5px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        font-size: 14px;
      }
      .type_1 {
        span {
          font-size: 12px;
        }
        > div {
          display: flex;
          justify-content: space-between;
        }
      }
      .type_3 {
        span {
          font-size: 12px;
        }
        .iconfont {
          margin-bottom: 10px;
        }
      }
      .product-price {
        display: flex;
        color: #ff5d4c;
        justify-content: space-between;
        span {
          font-size: 16px;
          &:last-child {
            margin-right: 20px;
          }
        }
      }
      .icon-img {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 50px;
        height: 50px;
      }
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.3);
      }
    }
  }
}
.el-col {
  margin-top: 20px;
}
.acticeClass {
  color: #fff;
  background-color: #1fa2f8;
}
.love {
  color: #ffac4c;
}
.double {
  color: #1fa2f8;
}
/deep/ .el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
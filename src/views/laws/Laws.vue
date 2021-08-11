<template>
  <div class="laws">
    <main>
      <!-- 搜索参数区域 -->
      <header>
        <div class="laws-time">
          <el-row>
            <el-col>发布时间查询范围：</el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-date-picker v-model="lawQueryInfo.publishTimeStart" type="date" value-format="yyyy-MM-dd" size="small" placeholder="开始时间" @change="selectTimeStart"> </el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-input placeholder="搜索法律法规、政策标准" v-model="lawQueryInfo.keyWord" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="keywordSearch"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-date-picker v-model="lawQueryInfo.publishTimeEnd" type="date" value-format="yyyy-MM-dd" size="small" placeholder="结束时间" @change="selectTimeEnd"> </el-date-picker>
            </el-col>
          </el-row>
        </div>
      </header>
      <!-- 分类区域 -->
      <div class="category-region">
        <div class="category_1">
          <span>筛选:</span>
          <ul>
            <li>
              <span :class="{ acticeClass: lawSeriesInfo.lawSeriesIDList === null }" @click="seriesSwitch(null)">全部</span>
            </li>
            <li v-for="(item, index) in lawSeriesArr" :key="index">
              <span :class="{ acticeClass: lawSeriesInfo.lawSeriesIDList === item.lawSeriesID }" @click="seriesSwitch(item.lawSeriesID)">{{ item.lawSeriesName }}</span>
            </li>
          </ul>
        </div>
        <div class="category_2" v-if="lawSeriesInfo.lawSeriesIDList !== null">
          <span>筛选:</span>
          <ul>
            <li>
              <span :class="{ acticeClass: lawSeriesInfo.lawCategoryIDList === null }" @click="cateGorySwitch(null)">全部</span>
            </li>
            <li v-for="(item, index) in lawCategoryArr" :key="index">
              <span :class="{ acticeClass: lawSeriesInfo.lawCategoryIDList === item.lawCategoryID }" @click="cateGorySwitch(item.lawCategoryID)">{{ item.lawCategoryName }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 结果列表区域 -->
      <div class="law-result-list">
        <p>
          总共搜索到<span>{{ totalLaws }}</span
          >篇
        </p>
        <ul>
          <li v-for="(item, index) in lawsListArr" :key="index">
            <div class="law-item-header">
              <router-link
                tag="span"
                :to="{
                  name: 'LawsID',
                  params: {
                    id: item.lawID,
                  },
                }"
                >{{ item.lawName }}</router-link
              >
              <el-dropdown @command="download">
                <span class="el-dropdown-link"> 操作<i class="el-icon-arrow-down el-icon--right"></i> </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>下载</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="law-item-time">
              <span>{{ item.isTimeliness === 1 ? '现行有效' : '' }}</span>
              <span>{{ item.publishTime }}发布</span>
              <span>{{ item.implementationTime }}实施</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 分页区域 -->
      <el-pagination background layout="prev, pager, next" :total="totalLaws" :current-page="lawSeriesInfo.pageNo" @current-change="changeLawsPage" :page-size="lawSeriesInfo.pageSize">
      </el-pagination>
    </main>
    <sider-bar />
  </div>
</template>

<script>
import { lawSeriesList, lawCategoryList, searchLawsByKeywords, screenLaws } from 'network/law_data.js'
import SiderBar from 'components/common/SiderBar'
export default {
  components: { SiderBar },
  name: 'Laws',
  data() {
    return {
      // 查询法律法规的参数
      lawQueryInfo: {
        // 开始时间
        publishTimeStart: null,
        // 结束时间
        publishTimeEnd: null,
        // 排序方式
        sort: 'desc',
        // 搜素关键词
        keyWord: '',
      },
      // 根据分类筛选法律法规
      lawSeriesInfo: {
        lawSeriesIDList: null,
        lawCategoryIDList: null,
        // 排序方式
        sort: 'desc',
        pageNo: 1,
        pageSize: 10,
      },
      // 法律法规分类
      lawSeriesArr: [],
      // 某一系列法律详细分类
      lawCategoryArr: [],
      // 法律法规内容数据
      lawsListArr: [],
      // 总的法律条数
      totalLaws: 0,
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      // 获取法律法规分类
      lawSeriesList().then((res) => {
        this.lawSeriesArr = res.data
      })
      // 初始获取无关键词的所有条数
      this.keyWordSearchLaws()
    },
    // 点击切换法律法规分类
    seriesSwitch(val) {
      this.lawSeriesInfo.lawSeriesIDList = val
      if (this.lawSeriesInfo.lawSeriesIDList !== null) {
        lawCategoryList(this.lawSeriesInfo.lawSeriesIDList).then((res) => {
          this.lawCategoryArr = res.data
          this.getScreenLaws()
        })
      } else {
        this.lawCategoryArr = []
        this.lawSeriesInfo.lawCategoryIDList = null
        this.getScreenLaws()
      }
    },
    // 详细法律法规分类切换
    cateGorySwitch(val) {
      this.lawSeriesInfo.lawCategoryIDList = val
      this.getScreenLaws()
    },
    // 根据关键词检索数据
    keyWordSearchLaws() {
      searchLawsByKeywords(this.lawQueryInfo).then((res) => {
        this.lawsListArr = res.data.rows
        this.totalLaws = res.data.totalRows
      })
    },
    // 获取筛选分类的法律法规数据
    getScreenLaws() {
      screenLaws(this.lawSeriesInfo).then((res) => {
        this.lawsListArr = res.data.rows
        this.totalLaws = res.data.totalRows
      })
    },
    // 下载
    download() {
      return this.$message({
        message: '下载失败！',
        type: 'error',
      })
    },
    // 分页器页数改变
    changeLawsPage(val) {
      this.lawSeriesInfo.pageNo = val
      this.getScreenLaws()
    },
    // 选择开始时间
    selectTimeStart() {
      this.keyWordSearchLaws()
    },
    // 选择结束时间
    selectTimeEnd() {
      this.keyWordSearchLaws()
    },
    // 关键词搜索数据
    keywordSearch() {
      this.keyWordSearchLaws()
    },
  },
}
</script>

<style lang="less" scoped>
.laws {
  background: #f0f2f5;
  main {
    width: 75%;
    margin: 0 auto;
    header {
      display: flex;
      position: relative;
      height: 210px;
      background-color: #fff;
      z-index: 9;
      .laws-time {
        padding: 20px;
        width: 50%;
        box-sizing: border-box;
        .el-row {
          margin-top: 10px;
        }
      }
    }
    .category-region {
      padding: 15px 20px;
      margin-top: 20px;
      background-color: #fff;
      box-sizing: border-box;
      .category_1,
      .category_2 {
        display: flex;
        span {
          width: 40px;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            margin-left: 8px;
            margin-bottom: 10px;
            span {
              padding: 4px 8px;
              border-radius: 6px;
              transition: all 0.5s;
              cursor: pointer;
            }
          }
        }
      }
    }
    .law-result-list {
      margin-top: 20px;
      background-color: #fff;
      > p {
        font-size: 14px;
        span {
          color: red;
        }
      }
      ul {
        li {
          border: 1px solid #e8e8e8;
          .law-item-header {
            display: flex;
            padding: 20px;
            border-bottom: 1px solid #e8e8e8;
            box-sizing: border-box;
            justify-content: space-between;
            span {
              color: #1fa2f8;
              cursor: pointer;
            }
          }
          .law-item-time {
            padding: 24px;
            font-size: 14px;
          }
        }
      }
    }
    /deep/ .el-pagination {
      margin-top: 20px;
      text-align: center;
    }
  }
}
.acticeClass {
  color: #fff;
  background-color: #1fa2f8;
}
</style>
<template>
  <div class="swiper-nav">
    <swiper ref="mySwiper" :options="swiperOptions" :pagination="{ clickable: true }" @swiper="onSwiper" @slideChange="onSlideChange">
      <swiper-slide v-for="(item, index) in swiperDataArr" :key="index" :style="{ 'background-image': 'url(' + item.appImageUrl + ')' }"></swiper-slide>
    </swiper>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper' //使用swiper6的模组扩展
// import style (>= Swiper 6.x)
// import 'swiper/swiper-bundle.css'

import 'swiper/swiper-bundle.min.css'
SwiperCore.use([Navigation, Autoplay, Pagination])
// 引入轮播数据请求函数
import { swiperData } from 'network/front_data.js'

export default {
  name: 'SwiperNav',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      // 轮播图数据
      swiperDataArr: [],
      // 轮播图配置
      swiperOptions: {
        slidesPerView: 1,
        grabCursor: true,
        // spaceBetween: 50,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return '<span class="' + className + '">' + this.swiperDataArr[index].channelName + '</span>'
          },
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          hideOnClick: true,
        },
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    },
  },
  created() {
    this.getSwiperData()
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false)
  },
  methods: {
    onSwiper(swiper) {
      console.log(swiper)
    },
    onSlideChange() {},
    // 获取轮播图数据
    getSwiperData() {
      swiperData().then((res) => {
        this.swiperDataArr = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
.swiper-nav {
  position: relative;
  height: 460px;
  width: 100%;
}
.swiper-container /deep/ .swiper-wrapper {
  height: 460px;
}
/deep/ .swiper-slide {
  height: 460px;
  background: center center no-repeat;
  background-size: 100% 100%;
}
.swpier-picture {
  width: 100%;
  height: 100%;
}
.swiper-pagination {
  color: #000;
}
/deep/ .swiper-pagination-bullet {
  width: 150px;
  height: 50px;
  line-height: 50px;
  color: #fff;
  text-align: center;
  border-radius: 0;
  opacity: 0.5;
  background-color: rgba(0, 0, 0, 0.8);
}
/deep/ .swiper-pagination-bullet-active {
  opacity: 1;
}
/deep/ .swiper-pagination {
  left: 50%;
  white-space: nowrap;
  transform: translate(-50%, -100%);
}
</style>
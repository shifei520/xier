<template>
  <div class="swiper-honor">
    <swiper ref="mySwiper" :options="swiperOptions" @swiper="onSwiper" @slideChange="onSlideChange">
      <swiper-slide><img src="~assets/img/honor_pic_1.jpg" alt="" /></swiper-slide>
      <swiper-slide><img src="~assets/img/honor_pic_2.jpg" alt="" /></swiper-slide>
      <swiper-slide><img src="~assets/img/honor_pic_3.jpg" alt="" /></swiper-slide>
    </swiper>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import SwiperCore, { Navigation } from 'swiper' //使用swiper6的模组扩展
// import style (>= Swiper 6.x)
// import 'swiper/swiper-bundle.css'

import 'swiper/swiper-bundle.min.css'
SwiperCore.use([Navigation])
export default {
  name: 'SwiperHonor',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      // 轮播图配置
      swiperOptions: {
        slidesPerView: 1,
        grabCursor: true,
        // spaceBetween: 50,
        centeredSlides: true,
        loop: true,
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
  methods: {
    onSwiper(swiper) {
      console.log(swiper)
    },
    onSlideChange() {},
  },
}
</script>

<style lang="less" scoped>
.swiper-honor {
  position: relative;
  width: 100%;
  height: 100%;
  img {
    height: 360px;
  }
}
.swiper-button-prev,
.swiper-button-next {
  height: 100px;
  width: 40px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
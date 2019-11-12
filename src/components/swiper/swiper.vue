<template>
  <div class="swiper">
    <div></div>
    <swiper-item :banners="banner"/>
  </div>
</template>

<script>
  // import request from "../../utils";

  import swiperItem from './swiper-item'

  export default {
    name: "swiper",
    data() {
      return {
        banner: []
      }
    },
    created() {
      this.$request('banner', res => {
        this.banner = res.data.banners
      }, err => {
        console.log('err', err)
      })
    },
    components: {
      swiperItem
    }
  }
</script>

<style scoped>
  .swiper {
    display: flex;
    overflow: hidden;
    height: 150px;
    width: 100%;
    margin:15px;
    transition: all 2s;
    border-radius: 3%;
  }
</style>

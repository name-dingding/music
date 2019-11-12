<template>
  <div id="explore" >
    <Scroll @scroller="scroll" @pullingUp="uprefresh" ref="wrapper">
      <template>
        <go-top @click.native="gotop" v-show="top"/>
        <swiper :uprefresh="uprefresh"/>
        <explorenav/>
        <exploremain :uprefresh="uprefresh"/>
      </template>
    </Scroll>
  </div>
</template>

<script>
  import swiper from "../../components/swiper/swiper";
  import explorenav from './explore/explore-nav';
  import exploremain from './explore/explore-main';
  import goTop from "../../components/gotop/goTop";
  import Scroll from "../../components/scroll/Scroll";

  export default {
    name: "explore",
    data() {
      return {
        top: false
      }
    },
    components: {
      swiper, explorenav, exploremain,goTop,Scroll
    },
    methods:{
      scroll(position){
        this.top= -position.y > 600
      },
      gotop(){
        this.$refs.wrapper.scrollto(0,0)
      },
      uprefresh(){
        console.log('上拉刷新')
      }
    }
  }
</script>

<style scoped>
  #explore {
    display: flex;
    position: absolute;
    top: 59px;
    height: calc(100% - 49px);
  }
</style>

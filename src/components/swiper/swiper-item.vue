<template>
  <div class="swiper-item" ref="swiperItem" @mouseenter="enter" @mouseleave="leave">
    <a v-for="(item,index) in banners" :key="index" v-show="index===currentIndex">
      <img :src='item.imageUrl' alt="">
    </a>
    <div><a v-for="(item,index) in banners" class="a" :class="{active:index===currentIndex}" @click="aclick(index)"></a></div>
  </div>
</template>

<script>
  export default {
    name: "swiper-item",
    props:{
      banners: {
      }
    },
    data(){
      return {
        currentIndex: 0,
        count: 0
      }
    },
    mounted() {
      this.play=window.setInterval(()=>{
        this.swiperplay()
      },3000)
      this.count=this.banners.length
      this.$refs.swiperItem.style.width= this.count*384+'px'
    },
    methods:{
      swiperplay(){
        this.currentIndex++
        this.currentIndex=this.currentIndex%this.banners.length
      },
      aclick(index){
        this.currentIndex=index
      },
      enter(){
        clearInterval(this.play)
      },
      leave(){
        this.play=window.setInterval(()=>{
          this.swiperplay()
        },3000)
      }
    }
  }
</script>

<style scoped>
  .swiper-item{
    display: flex;
    flex-wrap: nowrap;
    position: relative;
  }
  .swiper-item>a{
    flex: 1;
  }
  .swiper-item img{
    height: 100%;
}
  .swiper-item>div{
    display: flex;
    position: absolute;
    justify-content: center;
    top: 120px;
    left: 120px;
  }
  .a{
    flex: 1;
    display: block;
    /*position: absolute;*/
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: #f1f1f1;
    margin: 3px;
  }
  .active{
    background-color: red;
  }
</style>

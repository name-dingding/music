<template>
  <div class="explore-nav">
    <div>
      <img src="@/assets/image/music.svg" alt="">
      <p>每日推荐</p>
    </div>
    <div @click="songlistclick">
      <img src="@/assets/image/gedan.svg" alt="">
      <p>歌单</p></div>
    <div>
      <img src="@/assets/image/paihangbang.svg" alt="">
      <p>排行榜</p></div>
    <div>
      <img src="@/assets/image/zhibo.svg" alt="">
      <p>直播</p></div>
  </div>
</template>

<script>
  export default {
    name: "explore-nav",
    methods:{
      songlistclick(){
        this.$router.push('songlist')
      }
    }
  }
</script>

<style scoped>
.explore-nav{
  position: relative;
  display: flex;
  align-content: space-between;
  height: 90px;
  box-shadow: 0 1px 1px #f1f1f1;
}
  .explore-nav div{
    margin: 15px;
    flex: 1;
    text-align: center;
  }
  img{
    height: 50px;
    width: 50px;
  }
  p{
    font-size: 12px;
    font-family: 新宋;
  }
</style>

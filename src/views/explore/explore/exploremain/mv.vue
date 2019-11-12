<template>
  <div class="mv">
    <div class="mvnav">
      <p>推荐MV</p>
      <p class="navg">更多MV</p>
    </div>

    <div class="mvitem">
      <a v-for="(item,index) in mv">
        <img :src="item.picUrl" alt="">
        <p>{{item.name}}</p>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mv",
    data(){
      return {
        mv: []
      }
    },
    created() {
      this.$request('personalized/mv',res=>{
        this.mv=res.data.result
      },err=>{
        console.log(err)
      })
    }
  }
</script>

<style scoped>
  .mvnav{
    height: 20px;
    margin: 10px 10px 20px 10px;
    line-height: 20px;
  }
  .mvnav :after{
    content: '';
    clear: both;
  }
  .mvnav>p{
    display: inline-block;
    /*font-weight: bold;*/
    margin: 5px 10px;
  }
  .navg{
    float: right;
    padding: 3px 10px;
    font-size: 10px;
    font-weight: normal;
    border: 1px rgba(200,200,200,.8) solid;
    border-radius: 20%;
  }
  .mvitem{
    height: 120px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .mvitem a{
    margin: 5px;
    width: 30%;
  }
  .mvitem a p{
    font-size: 10px;
    font-family: 新宋;
  }
  img{
    width: 100%;
    border-radius: 5%;
  }
</style>

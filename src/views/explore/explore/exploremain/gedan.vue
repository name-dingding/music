<template>
  <div class="gedan">
    <div class="gedannav">
      <p>推荐歌单</p>
      <p class="navg">歌单广场</p>
    </div>
    <div class="gedanitem">
      <a v-for="(item,index) in gedan" @click="aclick(index)">
        <img :src="item.picUrl" alt="">
        <p>{{item.name}}</p>
      </a>
    </div>
  </div>
</template>

<script>
  import {songlistclick} from "@/components/mixin/songlist";

  export default {
    name: "gedan",
    data(){
      return {
        gedan: [],

      }
    },
    mixins:[songlistclick],
    created() {
      this.$request('personalized?limit=10',res=>{
        this.gedan=res.data.result
      },err=>{
        console.log(err)
      })
    },
    methods:{
      aclick(index) {
        this.$store.commit('listsend', this.gedan[index].id)
        this.$router.push({
          path: `list`,
          query: {
            Id: this.gedan[index].id
          }
        })
      }
    }
  }
</script>

<style scoped>
.gedannav{
  height: 20px;
  margin: 10px 10px 20px 10px;
  line-height: 20px;
}
  .gedannav :after{
    content: '';
    clear: both;
  }
  .gedannav>p{
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
  .gedanitem{
    height: 335px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .gedanitem a{
    margin: 5px;
    width: 30%;
  }
  .gedanitem a p{
    font-size: 10px;
    font-family: 新宋;
  }
  img{
    width: 100%;
    border-radius: 5%;
  }
</style>

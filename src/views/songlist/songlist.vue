<template>
  <div>
    <songlistnav class="sln">
      <template v-slot:navleft>
        <a><img src="@/assets/image/back.png" alt=""></a>
      </template>
      <template v-slot:navmid>
        <p>精选歌单</p>
      </template>
      <template v-slot:navright>
      </template>
    </songlistnav>

    <Scroll class="wrapper" ref="slmain">
      <template>
        <div>
          <a v-for="(item,index) in songlist" @click="aclick(index)">
            <img :src="item.coverImgUrl" :title="item.description">
            <p>{{item.name| nameset}}</p>
          </a>
        </div>
      </template>
    </Scroll>
  </div>
</template>

<script>
  import songlistnav from "../../components/main/navbar";
  import Scroll from "../../components/scroll/Scroll";
  import goTop from "../../components/gotop/goTop";
import nameset from "../../components/mixin/nameset";
  export default {
    name: "songlist",
    data(){
      return {
        songlist: []
      }
    },
    components:{
      Scroll,
      songlistnav,
      goTop,
    },
    mixins:[nameset],
    created() {
      this.$request('top/playlist',res=>{
        this.songlist=res.data.playlists
        // this.$store.
      },err=>{
        console.log(err)
      })
    },
    methods:{
      aclick(index) {
        this.$store.commit('listsend',this.songlist[index].id)
        this.$router.push({
          path:`list`,
          query:{
            Id: this.songlist[index].id
          }
        })
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    position: absolute;
    overflow: hidden;
    top: 49px;
    height: calc(100% - 49px);
  }
  .wrapper div{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 15px;
    margin: 25px 10px 0px;
  }
  .wrapper a{
    width: 30%;
    height: 160px;
  }
  .wrapper p{
    font-size: 12px;
    font-family: 行楷;
  }
  .wrapper img{
    width: 100%;
    border-radius: 5%;
  }
</style>

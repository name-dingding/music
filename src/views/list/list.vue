<template>
  <div class="list">
    <navbar>
      <template v-slot:navleft>
        <a><img src="@/assets/image/back.png" alt=""></a>
      </template>
      <template v-slot:navmid>
        <p>歌单</p>
      </template>
      <template v-slot:navright>
      </template>
    </navbar>

    <go-top @click.native="gotop" v-show="top"/>
    <Scroll class="wrapper" ref="wrapper" @scroller="scroller">
      <template>
        <div class="listhead">
          <a class="imgpic"><img :src="playlist.coverimgurl" alt=""></a>
          <div>
            <p>{{playlist.name}}</p>
            <p>{{playlist.description}}</p>
          </div>
        </div>

        <div class="main-list">
          <div class="lists" v-for="(i,index) in songlist" @click="playclick(index)">
            <div class="index">
              <p>{{index+1}}</p>
            </div>
            <div class="content">
              <p>{{i.name| nameset}}</p>
              <p>{{i.ar}} - {{i.al.name}}</p>
            </div>
            <div class="set">
              <img src="@/assets/image/play.svg">
            </div>
          </div>
        </div>
      </template>
    </Scroll>
  </div>
</template>

<script>
  import navbar from "../../components/main/navbar";
  import goTop from "../../components/gotop/goTop";
  import Scroll from "../../components/scroll/Scroll";
  import nameset from "../../components/mixin/nameset";

  export default {
    name: "list",
    data() {
      return {
        listurl: null,
        playlist: {
          coverimgurl: null,
          name: null,
          description: null
        },
        privileges: [],
        songid: [],
        songids: '',
        songlist: [],
        top: false
      }
    },
    mixins:[nameset],
    components: {
      navbar,goTop,Scroll
    },
    created() {
      this.listurl = this.$store.state.listid
      this.$request('playlist/detail?id=' + this.listurl, res => {
        this.playlist.name = res.data.playlist.name
        this.playlist.description = res.data.playlist.description
        this.playlist.coverimgurl = res.data.playlist.coverImgUrl
        this.privileges = res.data.privileges
        for (let i in this.privileges) {
          this.songid[i] = this.privileges[i].id
        }

        /*
        * 获取歌名，歌手，专辑，封面图片
        * */
        this.songids = this.songid.join(',')
        this.$request('song/detail?ids=' + this.songids, res => {
          const arr = res.data.songs
          for (let i in arr) {
            var obj = {}
            obj.name = res.data.songs[i].name
            obj.ar = res.data.songs[i].ar[0].name
            obj.al = res.data.songs[i].al
            obj.picUrl=res.data.songs[i].al.picUrl
            obj.id=res.data.songs[i].id
            this.songlist.push(obj)
          }
        }, err => {
          console.log('ids error', err)
        })
      }, err => {
        console.log('detail error', err)
      })
    },
    methods: {
      playclick(index) {
        this.$store.commit('playlist',this.songlist)
        this.$store.dispatch('songidd',{
          songlist:this.songlist[index],
          index: index
        })
      },
      scroller(position){
        this.top= -position.y>600
      },
      gotop(){
        this.$refs.wrapper.scrollto(0,50,300)
      }
    },
  }
</script>

<style scoped>
  .wrapper {
    background-color: #00456b;
    position: absolute;
    top: 49px;
    height: calc( 100% - 49px );
  }

  .imgpic > img {
    width: 100px;
    height: 100px;
    border-radius: 5%;
  }

  .listhead {
    background-color: transparent;
    display: flex;
    padding: 20px;
  }

  .listhead > div {
    padding: 5px;
    margin-left: 15px;
  }

  .listhead p {
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 18px;
    font-weight: bolder;
    font-family: 楷体;
    color: #fff;
  }

  .listhead p:nth-last-child(1) {
    margin-top: 15px;
    font-size: 12px;
    font-weight: lighter;
  }

  .main-list{
    padding-top: 20px;
    box-sizing: border-box;
    /*border: 1px blanchedalmond solid;*/
    border-radius: 10% 10% 0 0
  }
  .lists {
    display: flex;
    background-color: #fff;
    width: 100%;
    padding: 8px;
  }

  .index {
    width: 10%;
    text-align: center;
    line-height: 200%;
    border-radius: 50%;
    box-sizing: border-box;
    /*border-bottom: 1px #f1f1f1 solid;*/
  }

  .content {
    flex: 1;
    text-align: left;
    margin-left: 10px;
    border-bottom: 1px #f1f1f1 solid;
  }

  .content p {
    font-weight: normal;
    margin-bottom: 2px;
    font-size: 22px;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }

  .content p:nth-last-child(1) {
    font-size: 12px;
    font-family: 新宋;
  }

  .set {
    width: 15%;
    margin-top: 10px;
    padding-left: 20px;
    border-bottom: 1px #f1f1f1 solid;

  }

  .set img {
    height: 30px;
  }
</style>

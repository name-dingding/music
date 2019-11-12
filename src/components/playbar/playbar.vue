<template>
  <div class="playbar" @click="toliric">
    <div class="img">
      <img :src="songimg" alt="">
    </div>
    <div class="song">
      <p>{{songname?songnameset:'随便听听吧(●"◡"●)'}}</p>
      <p>{{singer?singer:'(*≧︶≦))(￣▽￣* )ゞ'}}</p>
    </div>
    <div class="play" @click="toggleclick">
      <img src="@/assets/image/isplay.svg" alt="" :class="{nowplay:songurl?$store.state.toggle:false}">
    </div>
    <div class="list" @click="playlistclick">
      <img src="@/assets/image/playlist.svg" alt="">
    </div>
    <Scroll class="wrapper" ref="playlist" :class="{playlist:isplaylist}">
      <template>
        <span @click="close">close</span>
        <p v-for="(i,index) in playlist"
           @click="tosong(index)">
          {{i.name| nameset}}
          <img src="../../assets/image/X.png" alt="">
        </p>
      </template>
    </Scroll>
    <audio :src="songurl===null?ended:songurl" ref="mp3" @canplay="play" @ended="ended" autoplay></audio>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import Scroll from "../scroll/Scroll";

  export default {
    name: "playbar",
    components: {Scroll},
    data() {
      return {
        isplaylist: false
      }
    },
    computed: {
      ...mapState({
        songurl: state => state.songurl,
        song: state => state.song,
        songimg: state => state.songimg,
        singer: state => state.singer,
        songname: state => state.songname,
        index: state => state.index,
        playlist: state => state.playlist
      }),
      songnameset(){
        return this.songname.slice(0,7)+'...'
      }
    },
    filters:{
      nameset(val){
        if(val.length>7) return val.slice(0,7)+'...'
        return val
      }
    },
    methods: {
      play() {
        this.$refs.mp3.pause && this.$refs.mp3.play()
      },
      toggleclick(e) {
        e.stopPropagation()
        if (this.$store.state.toggle) {
          this.$refs.mp3.pause()
        } else {
          this.$refs.mp3.play()
        }
        this.$store.state.toggle = !this.$store.state.toggle
      },
      toliric() {
        this.$router.push({
          path: 'song',
          query: {
            id: this.song
          }
        })
      },
      ended() {
        let mode=this.$store.state.mode
        let index = this.index + 1
        this.$store.commit('end')
        if(mode==0){
          this.$store.dispatch('songidd', {
            songlist: this.playlist[index],
            index: index
          })
        }else if(mode==1){

        }else {
          let n=Math.floor(Math.random()*this.playlist.length)
          this.$store.dispatch('songidd', {
            songlist: this.playlist[n],
            index: n
          })
        }

        // this.$router.push({
        //   path: 'song',
        //   query: {
        //     id: this.song
        //   }
        // })
      },
      tosong(index){
        this.$store.commit('end')
        this.$store.dispatch('songidd', {
          songlist: this.playlist[index],
          index: index
        })
      },
      playlistclick(e) {
        e.stopPropagation()
        this.isplaylist = true
        // this.scroll = new BScroll(this.$refs.playlist, {
        //   click: true,
        //   tap: true
        // })
      },
      close(e) {
        e.stopPropagation()
        this.isplaylist = false
      }
    },
  }
</script>

<style scoped>
  .playbar {
    position: fixed;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    padding-top: 5px;
    box-shadow: 0 2px 5px red;
    z-index: 999;
    background-color: #fff;
  }

  .playbar > div {
  }

  .img {
    width: 15%;
    padding-left: 10px;
  }

  img {
    margin-top: 5px;
    border-radius: 50%;
    height: 50px;
    /*width: 30px;*/
  }

  .song {
    flex: 1;
    margin-left: 10px;
  }

  .song p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .song p:nth-last-child(1) {
    margin-top: 10px;
    font-size: 14px;
    font-family: 新宋;
    padding-left: 5px;
  }

  .play {
    width: 15%;
  }

  .play img {
    height: 45px;
  }

  .nowplay {
    animation: playmove 5s infinite linear;
  }

  @keyframes playmove {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .list {
    width: 15%;
    margin-right: 5px;
  }

  .list img {
    height: 45px;
  }

  .wrapper {
    position: fixed;
    overflow: hidden;
    /*margin-bottom: 60px;*/
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 20px 0px 10px;

    height: 0;
    background-color: #fff;
    transition: height .5s;
  }

  .playlist {
    height: 400px;
    border-top: 30px gray solid;
    border-radius: 5% 5% 0 0;

  }

  .wrapper span {
    float: right;
  }

  .wrapper span:after {
    content: '';
    clear: both;
  }

  .wrapper img {
    height: 25px;
    float: right;
  }

  /*.wrapper img:after {*/
  /*  content: '';*/
  /*  clear: both;*/
  /*}*/

  .wrapper p {
    text-align: left;
    line-height: 40px;
    padding: 0 10px 0 0;
    border-bottom-style: solid;
    border-bottom-color: skyblue;
    border-bottom-width: 2px;
  }
.wrapper>div{
}
  .wrapper span {
    width:100%;
    text-align: right;
  }
</style>

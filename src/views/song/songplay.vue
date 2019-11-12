<template>
  <div id="songplay">
    <navbar>
      <template slot="navleft">
        <img src="@/assets/image/back.png" alt="">
      </template>
      <template slot="navmid">
        <a>{{songname}}</a>
      </template>
      <template slot="navright">
        <a class="mode" @click="modeclick">
          <img src="@/assets/image/xunhuan.svg" alt="" v-if="mode===0" name="0">
          <img src="@/assets/image/danqu.svg" alt="" v-else-if="mode===1" name="1">
          <img src="@/assets/image/suiji.svg" alt="" v-else name="2">
        </a>
      </template>
    </navbar>

    <toast v-show="modedisplay">
      <template>
        <div class="modedisplay">
          {{modename[mode]}}
        </div>
      </template>
    </toast>
    <toast v-show="cr">
      <template>
        没有版权！
      </template>
    </toast>
    <div class="songplay">
      <div class="bgc" @click="lyricClick" ref="bgc">
        <img :src="songimg" alt="" v-show="islyric">
        <div class="wrapper" ref="lyric">
          <div v-show="!islyric" ref="refp">
            <p v-for="(item,index) in obj.lyric"
               :class="{issong:currentIndex==index}">
              {{item}}
            </p>
            <p>{{lyrics===null? error:''}}</p>
          </div>
        </div>
      </div>

      <div class="timer">
        <p>{{current}}</p>
        <div class="time" @click="move" @mousemove="move">
          <div ref="timebar"></div>
        </div>
        <p>{{/NaN/.test(total)?'0:00':total}}</p>
      </div>
      <div class="play">
        <img src="@/assets/image/pre.svg" alt="" @click="pre">
        <img src="@/assets/image/bofang.svg" alt="" @click="toggle">
        <img src="@/assets/image/next.svg" alt="" @click="next">
      </div>
    </div>
  </div>
</template>

<script>
  import navbar from "../../components/main/navbar";
  import BScroll from 'better-scroll'
  import {mapState} from "vuex"
  import Toast from "../../components/Toast/Toast";

  export default {
    name: "songplay",
    data() {
      return {
        duration: 0,
        currenttime: 0,
        islyric: true,
        lyrics: null,
        error: '无歌词',
        obj: {},
        currentIndex: 0,
        tem: null,
        settimer: null,
        Index: [],
        scroll: null,
        position: 0,
        cr: false,
        mode: 0,
        modename: ['顺序播放','单曲循环','随机播放'],
        modedisplay: false
      }
    },
    components: {
      navbar, Toast
    },
    computed: {
      ...mapState({
        songurl: state => state.songurl,
        song: state => state.song,
        songimg: state => state.songimg,
        singer: state => state.singer,
        songname: state => state.songname,
        playlist: state => state.playlist,
        end: state => state.end
      }),
      current() {
        const sec = this.currenttime % 60
        if (sec.toString().length == 1)
          return Math.floor(this.currenttime / 60) + ':0' + this.currenttime % 60
        else
          return Math.floor(this.currenttime / 60) + ':' + this.currenttime % 60
      },
      total() {
        const dursec = this.duration % 60
        if (dursec.toString().length == 1)
          return Math.floor(this.duration / 60) + ':0' + this.duration % 60
        else
          return Math.floor(this.duration / 60) + ':' + this.duration % 60
      }
    },
    activated() {
      this.request()
      this.refreshlyric()
      this.$store.commit('playbardisplay')
    },
    deactivated() {
      this.$store.commit('playbar')
      this.settimer && window.clearInterval(this.settimer)
      this.refresh && window.clearInterval(this.refresh)
      this.scroll = null
    },
    // mounted(){
    //   document.querySelector('audio').onended=this.next
    // },
    methods: {
      //自动播放 更新歌词
      refreshlyric() {
        this.refresh = window.setInterval(() => {
          if (this.$store.state.end) {
            this.$store.state.end = false
            this.settimer && window.clearInterval(this.settimer)
            if(this.mode===1){
              this.currenttime=0
              document.querySelector('audio').play()
              this.set()
              return ;
            }
            this.request()
          }
        }, 500)
      },
      //暂无版权 toast
      copyright() {
        this.cr= false
        if (this.$store.state.songurl===null)
          this.cr = true
      },
      //歌词请求
      request() {
        this.copyright()
        let mp3 = document.querySelector('audio')
        this.duration = mp3.duration.toFixed(0)
        this.$request('lyric?id=' + this.song, res => {
          this.lyrics = res.data.lrc.lyric.split('\n')
          this.initlyric()
          this.togglelyric()
          this.set()
        }, err => {
          this.error = '获取歌词失败'
        })
      },
      set() {
        var mp3 = document.querySelector('audio')
        this.tolyric()
        this.settimer = window.setInterval(() => {
          this.currenttime = mp3.currentTime.toFixed(0)
          this.$refs.timebar.style.width = (this.currenttime / this.duration * 100) + '%';
          this.foo()

          this.scroll.scrollToElement(document.querySelector('.issong'), 500, false, true)

        }, 100)
      },
      foo() {
        var length = this.tem.length
        for (let i in this.tem) {
          if (this.currenttime >= this.tem[length - 1]) {
            return this.currentIndex = length - 1
          }
          if (this.currenttime >= this.tem[i] && this.currenttime < this.tem[i * 1 + 1]) {
            return this.currentIndex = i * 1
          }
        }
      },
      //将歌词和时间储存到obj里
      initlyric() {
        var ly = this.lyrics
        var temp, tem
        var time = []
        var lyric = []
        ly = ly.filter(function (val) {
          return val.match(/[^(\[\d{2}\:\d{2}\.\d{2}\])]$/)
        })
        for (let i in ly) {
          ly[i] = ly[i].replace(/\[|\]/g, '')
          temp = ly[i].match(/\d+\:\d+\.\d+/)
          tem = ly[i].replace(/\d+\:\d+\.\d+/, '')
          lyric.push(tem)
          time.push(temp)
        }
        for (let i in time)
          time[i] = time[i][0]
        this.obj = {
          time, lyric
        }
      },
      //转化歌词
      togglelyric() {
        var array = []
        var tem = []
        for (let i of this.obj.time) {
          i = i.replace(/(\d+)\:(\d+\.\d+)/, '$1,$2')
          i = i.split(',')
          array.push(i)
        }
        for (let i of array) {
          let t
          t = i[0] * 60 + i[1] * 1
          tem.push(t)
        }
        this.tem = tem
      },
      //暂停开始
      toggle() {
        this.$store.commit('toggles')
        if (this.$store.state.toggle) {
          document.querySelector('audio').play()
        } else
          document.querySelector('audio').pause()
      },
      lyricClick() {
        this.islyric = !this.islyric
      },
      move(e) {
        //先暂停计时器
        this.settimer && window.clearInterval(this.settimer)
        this.$refs.timebar.style.width = e.offsetX / this.$refs.timebar.parentElement.offsetWidth * 100 + '%'
        const width = parseFloat(this.$refs.timebar.style.width) / 100
        // this.currenttime=(width*this.duration).toFixed(0)
        document.querySelector('audio').currentTime = (width * this.duration)
        this.set()
      },
      //调整歌词位置
      tolyric() {
        this.scroll = null
        this.scroll = new BScroll(this.$refs.lyric, {
          probeType: 2,
          tap: true,
          click: true
        })
        // this.scroll.on('scroll', position => {
        //   let y = -position.y
        //   if (!this.islyric)
        //     this.currentIndex = (y / 40).toFixed(0) + this.currentIndex
        //
        //   // this.scroll.scrollBy(0,position.y)
        // })
      },

      //上一首 下一首
      nextbar() {
        for (let i in this.playlist)
          if (this.song === this.playlist[i].id) {
            this.$store.dispatch('songidd', {
              songlist: this.playlist[i * 1 + 1],
              index: i * 1 + 1
            })
            return this.$store.state.song = this.playlist[i * 1 + 1].id
          }
      },
      prebar() {
        for (let i in this.playlist)
          if (this.song === this.playlist[i].id) {
            this.$store.dispatch('songidd', {
              songlist: this.playlist[i * 1 - 1],
              index: i * 1 - 1
            })
            return this.$store.state.song = this.playlist[i * 1 - 1].id
          }
      },
      next() {
        // this.$store.commit('playlist',this.songlist)
        this.nextbar()
        this.$store.state.toggle = true
        this.settimer && window.clearInterval(this.settimer)
        this.request()
      },
      pre() {
        this.prebar()
        this.$store.state.toggle = true
        this.settimer && window.clearInterval(this.settimer)
        this.request()
      },

      //0： 顺序， 1：单曲，2：随机
      modeclick() {
        this.mode= ++this.mode % 3
        this.$store.commit('mode',this.mode)
        this.modedisplay= true
        setTimeout(()=>{
          this.modedisplay= false
        },1500)
      }
    }
  }
</script>

<style scoped>
  #songplay {
    background-color: #ccc;
    height: 100%;
  }
.mode{
  margin: 10px auto;
  display: flex;
}
  .mode img{
    flex: 1;
    height: 30px;
    /*width: 20px;*/
  }
.modedisplay{
  background-color: #777;
  color: white;
  border-radius: 5%;
  margin-top: 25px;
  padding: 3px;
}
  .bgc {
    display: flex;
    flex-wrap: nowrap;
    margin: 50px auto 250px;
    padding-top: 150px;
    position: relative;
    height: 200px;
    width: 200px;
  }

  .wrapper {
    overflow: hidden;
    position: absolute;
    top: 20%;
    left: -10%;
    width: 120%;
    height: 125%;
  }

  .bgc p {
    line-height: 40px;
    display: block;
    text-align: center;
  }

  /**播放歌词字体颜色
  */
  .issong {
    color: blue;
    font-family: 新宋;
    font-size: 30px;
    text-shadow: 2px 2px 3px yellow;
  }

  .bgc img {
    flex: 1;
    border-radius: 50%;
    border: 35px skyblue solid;
    box-shadow: 0px 0px 20px rgba(100, 100, 100, .6);
    height: 75%;
    left: -10%;
    position: absolute;
    box-sizing: border-box;
    animation: picmove 10s linear infinite;
  }

  @keyframes picmove {
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

  .timer {
    display: flex;
    height: 10px;
    align-content: center;
    justify-content: space-between;
    margin: 0 10px;
    text-align: center;
  }

  .timer p {
    width: 15%;
    display: inline-block;
  }

  .time {
    flex: 1;
    margin: auto;
    height: 5px;
    width: 100%;
    background-color: #f1f1f1;
  }

  .time > div {
    height: 100%;
    background-color: #aaa;
  }

  .play {
    height: 50px;
    display: flex;
    justify-content: space-around;
    padding: 3vh;
  }

  .play img {
    flex: 1;
    height: 30px;
  }
</style>

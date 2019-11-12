<template>
  <div>
    <Tabbar>
      <Tabbaritem>
        <Tabbarmid>
          <template v-slot:bar-profile>
            <a @click="profileclick" :class="{active:index===1&&select}">我的</a>
          </template >
          <template v-slot:bar-explore>
            <a @click="exploreclick" :class="{active:index===2&&select}">探索</a>
          </template>
          <template v-slot:bar-other>
            <a @click="groundclick" :class="{active:index===3&&select}">广场</a>
          </template>
          <template v-slot:bar-video>
            <a @click="videoclick" :class="{active:index===4&&select}">视频</a>
          </template>
        </Tabbarmid>
      </Tabbaritem>
    </Tabbar>
  </div>
</template>

<script>
  import Tabbar from "components/Tabbar/Tabbar";
  import Tabbaritem from "components/Tabbar/Tabbar-item"
  import Tabbarmid from "components/Tabbar/Tabbaritem-mid"

  export default {
    name: "main-tabbar",
    data(){
      return {
        index: 0,
        select: false
      }
    },
    components: {
      Tabbar,Tabbaritem,Tabbarmid
    },
    methods:{
      display(){
        this.select= true
        setTimeout(()=>{
          this.select= false
        },2000)
      },
      push(path,index){
        this.$router.push(path)
        this.index= index
        this.display()
      },
      profileclick(){
        this.push('profile',1)
      },
      exploreclick(){
        this.push('explore',2)
      },
      groundclick(){
        this.push('ground',3)
      },
      videoclick(){
        this.push('video',4)
      },
    }
  }
</script>

<style scoped>
.active{
  transition: all .1s linear;
  border-bottom: 2px red solid;
}
</style>

<template>
  <div>
    <Tabbar>
      <div class="left" @click="backclick">
        <slot name="navleft"></slot>
      </div>
      <div class="mid">
        <slot name="navmid"></slot>
      </div>
      <div class="right">
        <slot name="navright"></slot>
      </div>
    </Tabbar>
  </div>
</template>

<script>
  import Tabbar from "components/Tabbar/Tabbar";
  export default {
    name: "songlistnav",
    components:{
      Tabbar
    },
    methods:{
      backclick(e){
        e.stopPropagation()
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
.left{
  margin-top: 4px;
  width: 15%;
}
  .mid{
    line-height: 250%;
    flex: 1;
  }
  .right{
    height: 49px;
    width: 15%;
  }
</style>

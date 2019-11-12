<template>
  <div id="app">
    <maintabbar/>
    <playbar :class="{active: isplaybar}"/>
        <keep-alive exclude="song,list">
          <router-view :key="$route.fullPath"/>
        </keep-alive>
      </div>
</template>

<script>
  import playbar from "./components/playbar/playbar";
  import maintabbar from './components/main/main-tabbar';
import {mapState} from 'vuex'

  export default {
    name: 'App',
    data(){
      return {
        scroll: null,
      }
    },
    components: {
      maintabbar,playbar
    },
    methods:{
    },
    computed:{
      ...mapState({
        isplaybar: state => state.isplaybar,
        // istabbar: state => state.istabbar
      })
    }
  }
</script>
<style scoped>
  @import "assets/css/base.css";
  .active{
    display: none;
  }
</style>

<template>
  <div class="explore-main">
    <gedan/>
    <mv/>
  </div>
</template>

<script>
  import gedan from "./exploremain/gedan"
  import mv from './exploremain/mv'
  export default {
    name: "explore-main",
    components:{
      gedan,mv
    }
  }
</script>

<style scoped>

</style>

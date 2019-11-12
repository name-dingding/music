<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Tabbar"
  }
</script>


<style scoped>
  .tabbar{
    position: fixed;
    display: flex;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 49px;
    width: 100%;
    box-shadow: 0 -2px 10px rgba(100,100,100,.4);
    background-color: #fff;
    z-index: 9;
  }
</style>

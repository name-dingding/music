<template>
  <div class="goTop">
    <img src="../../assets/image/gotop.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "goTop",

  }
</script>

<style scoped>
  .goTop{
    position: fixed;
    right: 20px;
    bottom: 70px;
    z-index: 999;
    background-color: #f1f1aa;
  }
.goTop>img{
  width: 50px;
  border-radius: 50%;
}
</style>

<template>
  <div class="tabbar-item">
    <div class="barleft">
      <a><img src="@/assets/image/set.svg" alt="设置"></a>
    </div>
    <div class="barmid">
      <slot></slot>
    </div>
    <div class="barright">
      <a><img src="@/assets/image/search.svg" alt="搜索" class="right"></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Tabbar-item",
    methods: {
    }
  }
</script>

<style scoped>
.tabbar-item{
  display: flex;
  height: 100%;
  justify-content: space-between;
}
  .barleft{
    width: 25%;
    line-height: 49px;
  }
  img{
    margin-top: 12px;
    height: 50%;
    width: 50%;
  }
  .right{
    padding-left: 45px;
  }
  .barmid{
    flex: 1;
  }
  .barright{
    width: 25%;
    line-height: 49px;
  }
</style>

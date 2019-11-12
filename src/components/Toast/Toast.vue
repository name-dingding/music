<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Toast"
  }
</script>

<style scoped>
.toast{
  position: absolute;
  left: 50%;
  top: 80%;
  transform: translate(-50%);
  /*background-color: red;*/
  color: black;
  text-align: center;
}
</style>

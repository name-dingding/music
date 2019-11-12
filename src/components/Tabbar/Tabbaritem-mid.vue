<template>
  <div class="barmid-item">
    <slot name="bar-profile"></slot>
    <slot name="bar-explore"></slot>
    <slot name="bar-other"></slot>
    <slot name="bar-video"></slot>
  </div>

</template>

<script>
  export default {
    name: "Tabbaritem-mid"
  }
</script>

<style scoped>
.barmid-item {
  display: flex;
  line-height: 49px;
  justify-content: space-between;
}
</style>

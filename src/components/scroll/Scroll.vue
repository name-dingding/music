<template>
  <div class="wrapper" ref="wrap">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data(){
      return{
        roll: null,
        pics: null
      }
    },
    props:{
      probe:{
        type: Number,
        default: 3
      }
    },
    mounted(){
      this.load()
    },
    methods:{
      load() {
        this.roll = new BScroll(this.$refs.wrap, {
          probeType: this.probe,
          click: true,
          tap: true,
          pullUpLoad: true,
          pullDownRefresh: true
        })
        this.roll.on('scroll', (position) => {
          this.$emit('scroller',position)
        })
        this.roll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      },
      scrollto(x,y,time=500){
        this.roll.scrollTo(x,y,time)
      },
      refresh(){
        this.roll.refresh()
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    height: inherit;
  }
</style>

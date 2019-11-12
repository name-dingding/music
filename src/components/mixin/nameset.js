const nameset={
  filters:{
    nameset(val){
      if(val.length>20) return val.slice(0,20)+'...'
      return val
    }
  }
}
export default nameset

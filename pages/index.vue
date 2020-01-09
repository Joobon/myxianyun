<template>
  <div class="container">
    <el-carousel height="700px" :interval='5000' arrow="always">
      <el-carousel-item v-for="(item,index) in banner" :key="index">
        <div class="banner-image" :style="`background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;background-size:contain contain;` "></div>
      </el-carousel-item>
    </el-carousel>
    <!-- <input type="button" value="按钮" @click="dian"> -->
  </div>
</template>

<script>
export default {
data () {
  return {
    banner:[]
  }
},
mounted () {
  this.$axios({
    url:'/scenics/banners'
  }).then(res=>{
    // console.log(res);
    let {data}=res.data;
    this.banner=data
    
  })
}
//测试
// methods: {
//   dian(){
//     this.$store.commit('user/setName','我有病')
//   }
// }
}
</script>

<style lang='less' scoped>
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;
    // /deep/.el-carousel__container{
    //     height:700px;
    // }
    .banner-image{
        width:100%;
        height:100%;
    }
}
</style>
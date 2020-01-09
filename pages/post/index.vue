<template>
  <div class="main">
    <div class="left">
      <PostAside/>
    </div>
    <div class="right">
      <PostHeader />
    </div>
  </div>
</template>

<script>
import PostAside from "@/components/post/postAside.vue";
import PostHeader from "@/components/post/postHeader.vue";
export default {
  data() {
    return {} 
  },
  components: {
    PostAside,
    PostHeader
  }
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 20px auto 0;
.right{
flex: 1;
margin-left: 40px
 }
}
</style>
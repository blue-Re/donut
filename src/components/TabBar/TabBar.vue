<template>
  <div id="tabbar" v-if="$route.meta.isRequireFooter">
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item name="home" icon="home-o" to="/home">主页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search" to="/more">更多</van-tabbar-item>
      <van-tabbar-item name="publish" icon="plus" to="/publish">发布动态</van-tabbar-item>
      <van-tabbar-item name="frinds" icon="friends-o" to="/friends">好友</van-tabbar-item>
      <van-tabbar-item name="mine" icon="setting-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'home',
    }
  },
};
</script>

<style>
  #tabbar{
    height: 46px;
  }
</style>

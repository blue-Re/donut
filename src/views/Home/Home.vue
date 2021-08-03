<template>
  <div id="home">
    <van-nav-bar title="主页" class="nav" fixed></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="推荐"> 
        <Recommend></Recommend>
      </van-tab>
      <van-tab title="图文">内容 2</van-tab>
      <van-tab title="GIF">内容 3</van-tab>
      <van-tab title="视频">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Recommend from './child/Recommend.vue'
export default {
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  components: {
    Recommend
  },
};
</script>

<style lang="less">
.nav {
  background-color: deeppink;
  color: white;
  @nav-bar-title-text-color: white;
}
</style>

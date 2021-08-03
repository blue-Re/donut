<template>
  <div id="app">
    <TabBar/>
    <router-view />
  </div>
</template>
<script>
import TabBar from './components/TabBar/TabBar.vue'
export default {
  data() {
    return {};
  },
  components:{
    TabBar,
  },
  created(){
    this.$store.dispatch("getAllUser");
  }
};
</script>
<style lang="less">
  #app{
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: pink;
  }
</style>

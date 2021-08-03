<template>
  <div id="friends">
    <van-nav-bar title="好友列表" fixed class="nav"> </van-nav-bar>
    <ul class="userList">
      <van-search v-model="value" placeholder="请输入搜索关键词" />
      <li class="user" v-if="allUser">
        <div
          class="info"
          v-for="(item, index) in allUser"
          @click="goToChat(`/chat/${item.id}/${item.username}`)"
        >
          <img :src="item.avatar_url" alt="" style="width: 50px" />
          <div class="username">
            {{ item.username }}
            <div class="content">你好</div>
          </div>
        </div>
      </li>
    </ul>

    <div style="marginbottom: 50px"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import socket from '../../socketIo/socket'
export default {
  data() {
    return {
      value: "",
      // allUser:[]
    };
  },
  created() {
    // this.$store.dispatch("getAllUser");
    // socket.on('friendList',(data)=>{
    //   console.log('服务端出过来的好友数据',data);
    //   this.allUser = data
    // })
  },
  computed: {
    ...mapState(["allUser"]),
  },
  methods: {
    goToChat(path) {
      this.$router.push({ path });
    },
  },
};
</script>

<style lang="less">
#friends {
  height: 100%;
  width: 100%;
}
.nav {
  background-color: deeppink;
  color: white;
  @nav-bar-title-text-color: white;
}
.userList {
  // margin-top: 46px;
  margin-bottom: 50px;
}

.info {
  // background-color: yellowgreen;
  padding: 5%;
  border-bottom: 1px solid gray;
  img {
    border-radius: 50%;
    background-color: pink;
  }
  .username {
    float: right;
    /* margin-right: 60%; */
    /* margin-top: 2%; */
    line-height: 28px;
  }
  .content {
    font-size: 12px;
  }
}
</style>

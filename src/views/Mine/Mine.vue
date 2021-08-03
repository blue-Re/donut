<template>
  <div id="mine">
    <van-nav-bar title="我的" fixed class="nav"> </van-nav-bar>
    <div class="userInfo" v-if="token">
      <img class="avatar" :src="userInfo.avatar_url" alt="" />
      <div class="info">
        用户名：{{ userInfo.username }}<br />邮箱：{{
          userInfo.email === null ? "暂无邮箱" : userInfo.email
        }}
      </div>
      <router-link class="edit" to="/edit">></router-link>
    </div>
    <div class="nologin" v-else>
      <img class="avatar" src="../../assets/logo.png" alt="" />
      <router-link class="hrefs" to="/login">登录</router-link>&nbsp;
      <router-link class="hrefs" to="/register">注册</router-link>
    </div>
    <ul class="options" v-if="token">
      <li class="options-list">
        <i class="iconfont icon-qizi"></i> 我的钱包<span class="tag">></span>
      </li>
      <li class="options-list">
        <i class="iconfont icon-wenjuan"></i> 我的帖子<span class="tag">></span>
      </li>
      <li class="options-list">
        <i class="iconfont icon-pinglun"></i> 我的评论<span class="tag">></span>
      </li>
      <li class="options-list">
        <i class="iconfont icon-dianzan"></i> 我赞过的<span class="tag">></span>
      </li>
      <li class="options-list">
        <i class="iconfont icon-wujiaoxing"></i> 我收藏的<span class="tag">></span>
      </li>
      <li class="options-list">
        <i class="iconfont icon-liulanqi"></i> 浏览历史<span class="tag">></span>
      </li>
    </ul>
    <van-button round type="danger" v-if="token" class="logout" @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { reqCurrentUser } from "../../api/index";
import { mapState } from "vuex";
import { Dialog } from "vant";
export default {
  async mounted() {
    let result = await reqCurrentUser(this.current_user_id);
    console.log(result);
    if (result.code === 0) {
      this.userInfo = result.data;
    }
  },
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState(["current_user_id", "token"]),
  },
  methods: {
    logout() {
      console.log("退出登录~！");
      Dialog.confirm({
        message: "确定要退出嘛？",
      })
        .then(() => {
          // 清除token
          localStorage.removeItem("token");
          this.$store.dispatch("clear_token");
        })
        .catch(() => {
          alert('您已取消！')
        });
    },
  },
};
</script>

<style lang="less" scoped>
#mine {
  height: 100vh;
  width: 100vw;
  // overflow: hidden;
  touch-action: none;
  .userInfo {
    padding: 5%;
    background-color: pink;
    display: flex;
    position: relative;
    border-bottom: 1px solid white;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      padding-top: 10px;
    }
    .info {
      padding-left: 8%;
      border: 0;
      margin-top: 5%;
    }
    .edit {
      // margin-left: 25%;
      // float: right;
      // text-align: center;
      position: absolute;
      // margin-top: 5%;
      color: whitesmoke;
      right: 5%;
      bottom: 40%;
    }
  }
  .nologin {
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar {
      // flex: 1;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .hrefs {
      display: flex;
      // flex: 1;
      align-items: center;
      align-content: center;
    }
  }
  .options {
    background-color: pink;
    padding: 2% 4%;
    .options-list {
      // background-color: pink;
      padding: 3% 2%;
      position: relative;
      color: white;
      .iconfont {
        margin-right: 4%;
        font-size: 18px;
      }
      .tag {
        position: absolute;
        right: 1%;
        line-height: -2%;
        color: white;
        // top: 0%;
      }
    }
  }
  .logout {
    width: 100%;
  }
}
</style>

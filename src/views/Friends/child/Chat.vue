<template>
  <div id="chat">
    <van-nav-bar
      @click-left="onClickLeft"
      :title="friend_username"
      left-arrow
      left-text="返回"
      fixed
      class="nav"
    >
    </van-nav-bar>

    <div class="userInfo" ref="chatbox">
      <!-- 这个是other -->
      <div>
        <div class="me" v-for="(item, index) in newMsg" :key="index">
          <div v-if="friend_id !== item.friend.friend_id">
            <img src="../../../assets/logo.png" style="width: 50px !important" alt="" />
            <div class="message">{{ item.content }}</div>
          </div>
        </div>
        <hr />
      </div>
      <!-- 这个才是me -->
      <div class="other" v-for="(item, index) in message" :key="">
        <div class="message">
          <span>{{ item.content }}</span>
        </div>
        <img src="../../../assets/logo.png" style="width: 50px" alt="" />
      </div>
    </div>

    <div class="bottomTools">
      <input class="inputContent" type="text" v-model="content" @keydown.enter="send" />
      <van-button class="send" type="primary" size="small" @click="send">发送</van-button>
    </div>
  </div>
</template>

<script>
import socket from "../../../socketIo/socket";
import { mapState } from "vuex";
import { reqCurrentUserAllMessage, reqSend } from "../../../api/index";
export default {
  mounted() {
    // this.$store.dispatch("getAllMessage");
    // reqCurrentUserAllMessage(this.current_user_id, this.friend_id);
  },
  data() {
    return {
      content: "",
      message: [],
      newMsg: [],
    };
  },
  computed: {
    ...mapState(["current_user_id", "note_msg"]),
    friend_id() {
      return this.$route.params.id;
    },
    friend_username() {
      return this.$route.params.username;
    },
  },
  methods: {
    async send() {
      // let result = await reqSend(this.current_user_id, this.friend_id, this.content);
      // console.log(result);
      let msg = {
        user: {
          user_id: this.current_user_id,
        },
        friend: {
          friend_id: this.friend_id,
          friend_username: this.friend_username,
        },
        content: this.content,
      };
      // 发送消息事件
      socket.emit("sendMsg", msg);
      this.message.push(msg);
      this.content = "";
    },
    onClickLeft() {
      this.$router.back();
    },
    // toBottom() {
    //   let chatbox = this.$refs.chatbox;
    //   console.log(chatbox.scrollHeight,chatbox.clientHeight);
    //   chatbox.scrollTop = chatbox.scrollHeight - chatbox.clientHeight ;
    // },
  },
  mounted() {
    // console.log(this.note_msg);
    this.message = JSON.parse(localStorage.getItem("message"));
    // console.log(this.message);
    // 接收消息事件
    socket.on("accept", (data) => {
      console.log("服务器接收到消息", data);
      // this.newMsg = data
      this.newMsg.push(data);
    });
  },
  updated() {
    // this.$store.dispatch('getAllNoteMsg')
    // this.toBottom()
  },
  beforeMount() {
    this.$store.dispatch("getAllNoteMsg");
    // 记录谁给谁发的标识
    let noted = {
      user_id: this.current_user_id,
      friend_id: this.friend_id,
    };

    // 查找聊天记录事件
    socket.emit("findMsg", noted);
  },
};
</script>

<style lang="less">
#chat {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: scroll;
  border: none;
  .block {
    margin-top: 46px;
  }
  .bottomTools {
    width: 90%;
    // position: absolute;
    bottom: 0;
    padding: 0 0%;
    // margin: 0 auto;
    .inputContent {
      // padding-bottom: 3%;
      width: 90%;
      border: 1px solid white;
      // position: absolute;
      bottom: 0%;
    }
    .send {
      position: absolute;
      right: 0;
    }
  }
  .userInfo {
    margin-top: 46px;
    // background-color: orange;
    position: relative;
    padding: 4%;
    overflow: scroll;
    .me {
      display: flex;
      // background-color: #bfa;
      justify-content: space-between;
      img {
        border-radius: 50%;
      }
      .message {
        // width: 80%;
        position: relative;
        float: right;
        span {
          position: absolute;
          bottom: 30%;
          left: 5%;
          word-break: break-all;
          word-break: break-word;
        }
      }
    }
    .other {
      display: flex;
      // background-color: #bfa;
      justify-content: space-between;
      img {
        border-radius: 50%;
      }
      .message {
        width: 80%;
        // height: 50px;
        // background-color: deeppink;
        // border-radius: 45px;
        position: relative;
        span {
          position: absolute;
          bottom: 30%;
          left: 5%;
          word-break: break-all;
          word-break: break-word;
        }
      }
    }
  }
}
</style>

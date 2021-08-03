<template>
  <div id="recommend">
    <ul class="infobox" v-for="(item, index) in allDynamic" :key="item.id">
      <li class="list">
        <img class="avatar" :src="item.avatar_url" alt="" />
        <span class="username">{{ item.username }}</span>
        <div class="right">
          <div
            v-if="allRemarkList.length !== 0"
            @click="isFocus(item.dynamic_id, index)"
            class="focus"
            ref="focu"
          >
            +关注
          </div>
          <span>×</span>
        </div>
      </li>
      <li class="content">
        {{ item.content }}
      </li>
      <li class="imgList">
        <img :src="item.imglist1" alt="" />
      </li>
      <li
        class="remarkList"
        v-if="item.dynamic_id === remark.dynamic_id"
        v-for="(remark, index1) in allRemarkList"
        :key="remark.id"
      >
        <img :src="remark.remark_user_avatar" alt="" />
        <span class="remarkusername">{{ remark.remark_username }} </span>
        <span class="remarktime">{{ remark.create_time }}</span>
        <br />
        <div class="remarkcontent">
          {{ remark.remark_content }}
        </div>
      </li>
      <hr />
      <li class="bottomTools">
        <van-icon name="share-o" @click="showShare = true" class="icon" /><span>{{
          item.shared_count
        }}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-icon name="chat-o" class="icon" /><span>{{
          item.dynamic_id === (allRemarkList[index] ? allRemarkList[index].dynamic_id : 0)
            ? allRemarkList.length
            : 0
        }}</span>
        <br />
        <input class="remark" type="text" v-model="remark_content" />
        <van-button
          type="primary"
          class="button"
          size="small"
          @click="userRemark(item.dynamic_id)"
          >发表</van-button
        >
      </li>
    </ul>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { findAllDynamic, dynamic_remark, findAllRemark } from "../../../api";
export default {
  async mounted() {
    let result = await findAllDynamic();
    if (result.code === 0) {
      this.allDynamic = result.data;
      // console.log(result);
    }
  },
  data() {
    return {
      focus: false,
      showShare: false,
      remark_content: "",
      allDynamic: [],
      allRemarkList: [],
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
    };
  },
  methods: {
    isFocus(dynamic_id, index) {
      console.log(dynamic_id, index);
      this.focus = !this.focus;
      if (this.focus === true) {
        this.$refs.focu.forEach((element) => {
          if (
            dynamic_id ===
            (this.allRemarkList[index].dynamic_id
              ? this.allRemarkList[index].dynamic_id
              : 0)
          ) {
            element.innerHTML = "已关注";
          }
        });
      } else {
        this.$refs.focu.forEach((element) => {
          if (
            dynamic_id ===
            (this.allRemarkList[index].dynamic_id
              ? this.allRemarkList[index].dynamic_id
              : 0)
          ) {
            element.innerHTML = "+关注";
          }
        });
      }
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    async userRemark(dynamic_id) {
      // console.log(dynamic_id);
      // 拿到当前用户的信息
      let user = JSON.parse(localStorage.getItem("current_User"));
      let remark_username = user.username;
      // console.log(remark_username);
      // 接下来就是动态的id，此时的id是查询到的数组的index值，所以，动态的id为 item.dynamic_id
      // 将上述的item.dynamic_id传进来，用dynamic_id接收，此时就是该动态的id
      let result = await dynamic_remark(remark_username, dynamic_id, this.remark_content);
      if (result.code === 0) {
        // 此时已经将评论的数据保存到数据库当中
        // 清空输入框
        this.remark_content = "";
        // console.log(result);
        this.allRemarkList = result.data;
      }
      // 当我评论其中一个动态的时候，记录就会显示出来
      let result2 = await findAllRemark(dynamic_id);
      if (result2.code === 0) {
        // console.log(result2.data);
        this.allRemarkList = result2.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#recommend {
  margin-bottom: 50px;
  .infobox {
    background-color: pink;
    padding: 3% 6%;
    border-bottom: 1px solid white;
    .list {
      display: flex;
      align-items: center;
      justify-content: space-around;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .username {
        // line-height: 20px;
        margin-right: 10%;
      }
      .right {
        // flex: 1;
        // float: right;
        display: flex;
        div {
          width: 60px;
          text-align: center;
          border-radius: 15px;
          color: aliceblue;
          border: 1px solid;
          margin-right: 10px;
          z-index: 2;
        }
      }
    }
    .content {
      font-size: 0.8rem;
      margin: 4% 6%;
    }
    .imgList {
      display: flex;
      img {
        flex: 1;
        width: 100px;
        height: 150px;
      }
    }
    .remarkList {
      // display: flex;
      position: relative;
      margin: 3% 0;
      height: 50px;
      padding: 3% 0;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .remarktime {
        font-size: 12px;
        position: absolute;
        right: 0;
        top: 2%;
      }
      .remarkusername {
        font-size: 12px;
        position: absolute;
        top: 2px;
        left: 40px;
      }
      .remarkcontent {
        font-size: 15px;
        position: absolute;
        top: 16px;
        left: 15%;
        word-wrap: break-word;
        //word-break设置强行换行;
        word-break: normal;
        width: 230px;
      }
    }
    .bottomTools {
      position: relative;
      padding: 2% 0;
      .remark {
        border: 2px solid white;
      }
      .button {
        height: 25px;
        position: absolute;
        right: 4%;
      }
      .icon {
        margin: 0 2%;
      }
    }
    // display: flex;
  }
}
</style>

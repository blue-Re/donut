<template>
  <div id="publish">
    <van-nav-bar class="nav" title="发布动态" fixed>
      <template #right> <div @click="publish">发表</div> </template>
    </van-nav-bar>
    <textarea class="text" rows="10" v-model="content" placeholder="说点什么吧"> </textarea>
    <van-uploader
      class="upload"
      :after-read="afterRead"
      v-model="fileList"
      multiple
      :max-count="2"
    />
  </div>
</template>

<script>
import { publishDynamic } from "../../api/index";
export default {
  data() {
    return {
      fileList: [],
      content:'',
      dynamicList:[],
      file:''
    };
  },
  methods: {
    afterRead(file) {
      this.file = file
    },
    // 发布动态
    async publish() {
      // 得到本地的当前user对象
      let user = JSON.parse(localStorage.getItem('current_User'))
      // console.log(localStorage.getItem("current_User"));
      user.content = this.content
      console.log(user);
      // 接收上传的图片
      let formData = new FormData()
      formData.append('file',this.file.file)

      let result = await publishDynamic(formData,user)
      if (result.code===0) {
        console.log(result);
        this.dynamicList = result.data
      }
      // 发布完成之后，将内容区清空
      this.content = ''
      this.fileList = []
    },
  },
};
</script>

<style lang="less">
#publish {
  position: relative;
  .text {
    width: 100vw;
    text-align: left;
    // border: 1px solid whitesmoke;
    padding: 3% 0;
    background-color: pink;
    border: 1px solid pink;
  }
  .upload {
    position: absolute;
    z-index: 5;
    bottom: 0;
    left: 1%;
  }
}
</style>

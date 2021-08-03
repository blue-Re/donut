<template>
  <div id="edit">
    <van-nav-bar left-arrow @click-left="onClickLeft" title="编辑信息" fixed class="nav"></van-nav-bar>
    <van-form class="form" @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="email"
        type="email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field name="avatar" label="更改头像">
        <template #input>
          <van-uploader name="avatar" :deletable="false" :after-read="uploadAvatar" max-count="1" v-model="uploader" />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">保存</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {reqUploadImg,updateUserInfo} from '../../api/index'
export default {
  // created(){
  //   console.log(this.current_user_id);
  // },
  data() {
    return {
      username: "",
      password: "",
      avatar_url: "",
      email: "",
      update_time: new Date().toTimeString(),
      uploader: [],
    };
  },
  computed: {
    ...mapState(["current_user_id"]),
  },
  methods: {
    async onSubmit(values) {
      console.log(values);
      // 点击之后，修改user表的信息
      let result = await updateUserInfo(values.username,values.password,values.email,this.current_user_id)
      if (result.code===0) {
        console.log(result);
      }
    },
    
    async uploadAvatar(file){
      console.log(file);
      let formData = new FormData()
      formData.append('avatar',file.file)
      let result = await reqUploadImg(formData,this.current_user_id)
      if (result) {
        console.log(result);
      }
    },
    onClickLeft(){
      this.$router.back()
    }
  },
};
</script>

<style lang="less" scoped>
#edit {
  .form {
    margin-top: 46px;
  }
}
</style>

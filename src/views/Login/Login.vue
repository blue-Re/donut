<template>
  <div id="login">
    <van-form @submit="onSubmit">
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
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">登录</van-button>
        <br>
        <van-button round block type="primary" to="/register">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reqLogin } from "../../api/index";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(values) {
      console.log(values);
      const { username, password } = values;

      let result = await reqLogin(username, password);
      console.log(result);
      if (result.code === 0) {
        // 保存token
        localStorage.setItem("token", result.token);
        this.$store.dispatch('set_token',result.token)
        
        localStorage.setItem('current_user_id',result.data.id)
        // 将当前用户的信息保存到本地
        localStorage.setItem('current_User',JSON.stringify(result.data))
        // 跳转页面
        this.$router.push("/home");
      }
    },
  },
};
</script>

<style></style>

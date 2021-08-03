<template>
  <div id="register">
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
      <van-field
        v-model="email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reqRegister } from "../../api";
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
    };
  },
  methods: {
    async onSubmit(values) {
      const { username, password, email } = values;
      let result = await reqRegister(username, password, email);
      console.log(result);
      if (result.code === 0) {
        // 注册成功，跳转到登录页面
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style></style>

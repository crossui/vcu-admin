<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <v-card :bordered="false">
        <div slot="title">
          <v-icon type="login"></v-icon>
          欢迎登录
        </div>
        <div class="form-con">
          <v-form ref="loginForm" :model="form" :rules="rules" class='login-form'>
            <v-form-item prop="userName">
              <v-input v-model="form.userName" placeholder='请输入用户名'>
                <v-icon slot="prefix" type='user' color="rgba(0,0,0,.25)"></v-icon>
              </v-input>
            </v-form-item>
            <v-form-item prop="password">
              <v-input type='password' v-model="form.password" placeholder='请输入密码'>
                <v-icon slot="prefix" type='lock' color="rgba(0,0,0,.25)"></v-icon>
              </v-input>
            </v-form-item>
            <v-form-item>
              <v-button type='primary' @click="handleSubmit" class='login-form-button'>
                登录
              </v-button>
            </v-form-item>
          </v-form>
          <div class="login-tip">版权信息</div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import md5 from "md5";
import util from "@/libs/util.js";
export default {
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          Cookies.set("user", this.form.userName);
          Cookies.set("password", md5(this.form.password));
          this.$router.push({
            name: "home_index"
          });
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
@import "./login.less";
</style>
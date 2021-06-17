<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <v-card :bordered="false">
        <div slot="title"><v-icon type="login" />欢迎登录</div>
        <div class="form-con">
          <v-form :form="loginForm" @submit="handleSubmit">
            <v-form-item>
              <v-input v-decorator="rules.userName" placeholder="请输入用户名">
                <v-icon
                  slot="prefix"
                  type="user"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </v-input>
            </v-form-item>
            <v-form-item>
              <v-input
                type="password"
                v-decorator="rules.password"
                placeholder="请输入密码"
              >
                <v-icon
                  slot="prefix"
                  type="lock"
                  style="color: rgba(0, 0, 0, 0.25)"
                />
              </v-input>
            </v-form-item>
            <v-form-item>
              <v-button type="primary" block html-type="submit">登 录</v-button>
            </v-form-item>
          </v-form>
          <div class="login-tip">版权信息</div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: this.$form.createForm(this, { name: "login" }),
      rules: {
        userName: [
          "username",
          { rules: [{ required: true, message: "用户名不能为空" }] },
        ],
        password: [
          "password",
          { rules: [{ required: true, message: "密码不能为空" }] },
        ],
      },
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.loginForm.validateFields((err) => {
        if (!err) {
          this.$store.commit("setToken", "aaaaaaaaa23222");
          this.$store.commit("setLoginUser", {
            userId: 4569,
            userName: this.loginForm.getFieldValue("username"),
            password: this.loginForm.getFieldValue("password"),
          });
          this.$router.push({
            name: this.appConfig.homepage.name,
          });
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
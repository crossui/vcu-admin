

<template>
  <div class="error403">
    <div class="error403-body-con">
      <v-card>
        <div class="error403-body-con-title">
          4
          <span class="error403-0-span">
            <v-icon type="bell"></v-icon>
          </span>
          <span class="error403-key-span">
            <v-icon size="220" type="thunderbolt-fill"></v-icon>
          </span>
        </div>
        <p class="error403-body-con-message">你没有权限，请联系管理员。</p>
        <div class="error403-btn-con">
          <v-button @click="goHome" size="large" style="width: 200px;" type="text">返回首页</v-button>
          <v-button
            @click="backPage"
            size="large"
            style="width: 200px;margin-left: 40px;"
            type="primary"
          >返回上一页</v-button>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error403",
  methods: {
    backPage() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push({
        name: this.appConfig.homepage.name
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "./403.less";
</style>
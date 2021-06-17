<template>
  <div class="lockingWrap">
    <div @keydown.enter="handleUnlock" class="unlock-body-con">
      <div class="error-message" v-if="showError">密码错误，请重新输入</div>
      <div
        :style="{ marginLeft: avatorLeft }"
        @click="handleClickAvator"
        class="unlock-avator-con"
      >
        <img
          class="unlock-avator-img"
          src="@/assets/images/defaultHeader.png"
        />
      </div>
      <div
        :style="{ marginLeft: avatorLeft }"
        class="unlock-avator-under-back"
      ></div>
      <div class="unlock-input-con">
        <div class="unlock-input-overflow-con">
          <div :style="{ right: inputLeft }" class="unlock-overflow-body">
            <input
              placeholder="您好，请输入密码"
              class="unlock-input"
              ref="inputEle"
              type="password"
              v-model="password"
            />
            <button @click="handleUnlock" class="unlock-btn" ref="unlockBtn">
              <v-icon type="unlock" style="color: #fff" />
            </button>
          </div>
        </div>
      </div>
      <div class="unlock-locking-tip-con">
        <div @click="exitOutSys" class="excitSystem">退出系统</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "lockingModal",
  components: {},
  data: function () {
    return {
      showError: false,
      avatorLeft: "-180px",
      inputLeft: "0px",
      password: "",
      check: null,
    };
  },
  mixins: [],
  watch: {
    password(val) {
      this.showError = false;
    },
  },
  mounted() {
    this.$refs.inputEle.focus();
  },
  methods: {
    validator() {
      if (this.password == localStorage.getItem("userPassWord")) {
        return true;
      } else {
        this.showError = true;
        return false;
      }
    },
    handleUnlock() {
      if (this.validator()) {
        setTimeout(() => {
          this.password = "";
          this.$store.commit("setLocking", false);
        }, 500);
      }
    },
    handleClickAvator() {
      this.$refs.inputEle.focus();
    },
    //退出系统
    exitOutSys() {
      window.location.href = window.commonUrl;
    },
  },
  created() {},
};
</script>
<style lang="less" scoped>
@import "./style/lock.less";
.lockingWrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #068d87;
  z-index: 9999;
}
.excitSystem {
  width: 100px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #fff;
  border-radius: 3px;
  background: #f00;
  cursor: pointer;
}
</style>

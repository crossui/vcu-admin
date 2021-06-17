<template>
  <v-spin :class="{'ptb-200': !pageInit}" :spinning="spinLoading" :tip="textLoading">
    <div class="current-content" v-show="pageInit">
      <div class="header-content plr-10 ptb-5">header</div>
      <div class="header-content plr-10 ptb-5">header</div>
      <div class="middle-content">middle</div>
      <div class="footer-content plr-10 ptb-5">footer</div>
    </div>
  </v-spin>
</template>

<script>
export default {
  name: "demo",
  components: {},
  props: {},
  mixins: [],
  watch: {},
  computed: {},
  data() {
    return {
      textLoading: "",
      loadingTextObj: {
        loading: "页面初始化中...",
        updata: "数据提交中..."
      },
      pageInit: false,
      spinLoading: true
    };
  },
  created() {},
  mounted() {
    //初始化
    this.testInit();
  },
  methods: {
    openLoading(text) {
      this.textLoading = text;
      this.spinLoading = true;
    },
    closeLoading() {
      this.spinLoading = false;
    },
    testInit() {
      let _this = this;
      this.openLoading(this.loadingTextObj.loading);

      setTimeout(() => {
        //pageInit请自己手动开启
        _this.closeLoading();
      }, 1000);
    }
  },
  activated() {},
  deactivated() {}
};
</script>

<style lang="less" scoped>
</style>
<template>
  <div class="quote-page-wrap" ref="quotePage" v-if="isMainAlive"></div>
</template>

<script>
import Vue from "vue";
export default {
  name: "quote-page",
  data() {
    return {};
  },
  computed: {
    isMainAlive() {
      return this.$store.state ? this.$store.state.app.isMainAlive : true;
    },
  },
  watch: {
    isMainAlive(val) {
      if (!val) {
        this.$nextTick(() => {
          this.$store.commit("setIsMainAlive", true);
        });
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.setSkinTheme();
    },
    // 设置皮肤主题
    setSkinTheme(item) {
      this.$nextTick(() => {
        if (!item || _.isEmpty(item)) item = this.appConfig.skinTheme;
        if (item.class == "skin-blue") return;
        this.util.themeColor.changeColor(item.color);
        this.$store.commit("setSkinTheme", item);
      });
    },
    initComponent() {
      let componentName = this.$route.query.pathUrl;
      if (componentName && componentName != "") {
        this.registerComponent(componentName).then((Component) => {
          new Component({
            el: this.$refs.quotePage,
          });
        });
      } else {
        this.$error({
          title: "提示",
          content: "要引用的页面“pathUrl”不能为空！！！",
        });
      }
    },
    registerComponent(componentName) {
      return import(`@/${componentName}.vue`).then((component) => {
        return Vue.extend(component.default);
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
<template>
  <v-layout class="app-main">
    <v-layout-header v-if="quotePage">
      <commonHeader @on-click="handleClickMenu" />
    </v-layout-header>
    <v-layout>
      <v-layout-sider
        :trigger="null"
        class="sider-wrap"
        collapsedWidth="50"
        collapsible
        v-if="appConfig.navigationMode == 'sidemenu' && quotePage"
        v-model="collapsed"
        width="180"
      >
        <template v-if="quotePage">
          <sideMenu :menu-list="menuList" @on-click="handleClickMenu" />
        </template>
      </v-layout-sider>
      <v-layout class="main-content-con">
        <div class="tag-nav-wrapper" v-if="quotePage">
          <TagsNav :list="tagNavList" :value="$route"></TagsNav>
        </div>
        <v-layout-content
          :class="{ 'content-wrapper ': quotePage }"
          id="contentWrapper"
        >
          <keep-alive :include="cachePage">
            <router-view
              v-if="isMainAlive"
              v-show="
                $route.meta.redirect == null ||
                $route.meta.redirect == 'noCache'
              "
            />
          </keep-alive>
          <iframes v-show="$route.meta.redirect == 'cache'" />
        </v-layout-content>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script>
import commonHeader from "./components/commonHeader";
import sideMenu from "./components/sideMenu";
import TagsNav from "./components/tagsNav";
import iframes from "./components/iframes";

export default {
  name: "appMain",
  components: {
    commonHeader,
    sideMenu,
    TagsNav,
    iframes,
  },
  data() {
    return {};
  },
  computed: {
    quotePage() {
      return this.$store.state.app.quotePage;
    },
    isMainAlive() {
      return this.$store.state.app.isMainAlive;
    },
    collapsed() {
      return this.$store.state.app.collapsed;
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    tagNavList() {
      return this.$store.state.app.tagNavList;
    },
    menuList() {
      return this.$store.state.app.menuList;
    },
  },
  watch: {
    $route(to) {
      this.addTag(to);
      this.$store.commit(
        "setTagNavList",
        this.util.getNewTagList(this.tagNavList, to)
      );
    },
    isMainAlive(val) {
      if (!val) {
        this.util.delCachePage(this.$route.name);
        this.$nextTick(() => {
          this.$store.commit("setIsMainAlive", true);
          this.$store.commit("addCachePage", [this.$route.name]);
        });
      }
    },
  },
  created() {
    this.$store.commit("setMessageCount", 3);
    this.setSkinTheme();
  },
  mounted() {
    // 如果当前打开页面不在标签栏中
    if (!this.tagNavList.find((item) => item.name === this.$route.name)) {
      this.addTag(this.$route);
    }
  },
  methods: {
    //初始化用户信息
    initUserInfo() {},
    // 设置皮肤主题
    setSkinTheme(item) {
      this.$nextTick(() => {
        if (!item || _.isEmpty(item)) item = this.appConfig.skinTheme;
        if (item.class == "skin-blue") return;
        this.util.themeColor.changeColor(item.color);
        this.$store.commit("setSkinTheme", item);
      });
    },
    addTag(item) {
      const { name, query, params, meta } = item;
      this.$store.commit("addTag", {
        route: { name, query, params, meta },
        type: "push",
      });
    },
    handleClickMenu({ item, key, keyPath }) {
      //是否跳转新页面
      if (key.indexOf("isTurnByHref_") > -1) {
        window.open(key.split("_")[1]);
        return;
      }
      this.$router.push({
        name: key,
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "./main.less";
</style>

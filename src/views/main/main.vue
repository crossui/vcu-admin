<template>
  <v-layout class="app-main">
    <v-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo"></div>
      <side-menu :menu-list="menuList"></side-menu>
      <menu-clock v-show="!collapsed"></menu-clock>
    </v-layout-sider>
    <v-layout style="overflow: hidden">
      <v-layout-header style="background: #fff; padding: 0">
        <div class="clearfix">
          <div class="navicon-con fl">
            <v-icon class="trigger" :type="collapsed ? 'indent' : 'outdent'" @click="()=> collapsed = !collapsed"></v-icon>
          </div>
          <div class="breadcrumb-con fl">
            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
          </div>
          <div class="avator-con fr margin-right-15">
            <message-tip v-model="mesCount"></message-tip>
            <div @click="handleRefreshPage" class="refresh-current-page-btn fl margin-right-10">
              <v-tooltip title="刷新当前页" placement="bottom">
                <v-icon type="reload" :size="22"></v-icon>
              </v-tooltip>
            </div>
            <v-row type="flex" justify="end" align="middle" class="user-dropdown-innercon margin-left-20">
              <v-dropdown placement="bottomRight">
                <a class="user-name" href="javascript:void(0)">
                  <span class="main-user-name">{{ userName }}</span>
                  <v-icon type="down"></v-icon>
                </a>
                <v-menu slot="overlay" @click="handleClickUserDropdown">
                  <v-menu-item key="ownSpace">个人中心</v-menu-item>
                  <v-menu-item key="loginout" divided>退出登录</v-menu-item>
                </v-menu>
              </v-dropdown>
              <v-avatar style="background-color: #2d8cf0" icon="user" class="margin-left-10"></v-avatar>
            </v-row>
          </div>
        </div>
      </v-layout-header>
      <v-layout-content :style="{overflow: 'hidden', height: '100%'}">
        <div class="tag-nav-wrapper">
          <TagsNav :value="$route" :list="tagNavList"></TagsNav>
        </div>
        <div class="content-wrapper">
          <div class="single-page" v-if="loadingRefresh">
            <transition name="fade-transform" mode="out-in">
              <keep-alive :include="cachePage">
                <router-view />
              </keep-alive>
            </transition>
          </div>
        </div>
      </v-layout-content>
    </v-layout>
  </v-layout>
</template>

<script>
import SideMenu from './components/side-menu'
import TagsNav from './components/tags-nav'
import menuClock from './components/menu-clock'
import messageTip from "./components/message-tip";
import breadcrumbNav from "./components/breadcrumb-nav";

import Cookies from "js-cookie";
import util from "@/libs/util.js";


export default {
  components: {
    TagsNav,
    SideMenu,
    menuClock,
    messageTip,
    breadcrumbNav
  },
  data() {
    return {
      loadingRefresh: true,
      collapsed: false,
      userName: "admin"
    }
  },
  computed: {
    tagNavList() {
      return this.$store.state.app.tagNavList
    },
    menuList() {
      return this.$store.state.app.menuList;
    },
    mesCount() {
      return this.$store.state.app.messageCount;
    },
    cachePage() {
      return this.$store.state.app.cachePage;
    },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    }
  },
  watch: {
    $route(to) {
      util.setCurrentPath(this, to);
      this.$store.commit("setTagNavList", util.getNewTagList(this.tagNavList, to));
    }
  },
  mounted() {
    this.userName = Cookies.get("user");

    util.setCurrentPath(this, this.$route);

    this.$store.commit("setTagNavList");
    this.$store.commit("updateMenulist");
    this.$store.commit("setMessageCount", 3);
  },
  methods: {
    handleClickUserDropdown(name) {
      if (name.key === "ownSpace") {
        this.$router.push({
          name: "ownspace_index"
        });
      } else {
        this.$store.commit("setTagNavList", [{
          title: '首页',
          path: '/',
          name: 'home_index'
        }]);
        this.$store.commit("logout", this);
        this.$router.push({
          name: "login"
        });
      }
    },
    handleRefreshPage() {
      util.domReset(this, "loadingRefresh");
    }
  }
}
</script>
<style lang="less">
@import "./main.less";
</style>
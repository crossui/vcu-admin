<template>
  <v-menu
    :mode="menuMode"
    :selectedKeys="[$route.name]"
    @click="handleClickMenu"
    :inlineIndent="14"
    :openKeys="openKeys"
    @openChange="onOpenChange"
  >
    <template v-for="item in menuList">
      <template v-if="item.hidden == undefined || item.hidden == false">
        <v-menu-item
          :key="!item.children ? item.name : item.children[0].name"
          v-if="
            !item.children ||
            (item.children.length && item.children.length <= 1 &&
              item.children[0].name.indexOf('_index') >= 0)
          "
        >
          <v-icon v-if="item.icon" :type="item.icon"></v-icon>
          <icon-font
            v-else-if="item.iconfont"
            :type="item.iconfont"
            class="menu-iconfont"
          />
          <span>{{ item.meta.title }}</span>
        </v-menu-item>
        <sub-menu v-else :menuInfo="item" :key="item.name" />
      </template>
    </template>
  </v-menu>
</template>

<script>
import SubMenu from "./SubMenu";
export default {
  components: {
    "sub-menu": SubMenu,
  },
  props: {
    menuList: {
      type: Array,
      required: true,
    },
    menuMode: {
      type: String,
      default: "inline",
    },
  },
  data() {
    return {
      rootSubmenuKeys: [],
      openKeys: [],
    };
  },
  computed: {
    collapsed() {
      return this.$store.state.app.collapsed;
    },
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    updateOpenKeys() {
      if (this.appConfig.navigationMode != "topmenu") {
        this.openKeys = this.$route.matched.map((item) => item.name);
      }
    },
    handleClickMenu({ item, key, keyPath }) {
      this.$emit("on-click", { item, key, keyPath });
    },
  },
  watch: {
    $route(to) {
      this.updateOpenKeys();
    },
    collapsed(val) {
      if (val) this.openKeys = [];
    },
  },
  mounted() {
    this.updateOpenKeys();
  },
};
</script>
<style lang="less" scoped>
.menu-iconfont {
  font-size: 14px;
  min-width: 14px;
  margin-right: 10px;
}

.vcu-menu-inline-collapsed {
  li.vcu-menu-item,
  li.vcu-menu-submenu {
    .menu-iconfont + span {
      display: inline-block;
      max-width: 0;
      opacity: 0;
    }
  }
}
</style>
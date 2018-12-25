<template>
  <v-scrollbar
    :style="{height:menuHeight + 'px'}"
    :zIndex=10000
  >
    <v-menu
      theme="dark"
      mode="inline"
      :selectedKeys="[$route.name]"
      :openKeys="openKeys"
      @click="handleClickMenu"
      @openChange="onOpenChange"
    >
      <template v-for="item in menuList">
        <v-menu-item
          :key="item.children[0].name"
          v-if="item.children.length <= 1 && item.children[0].name.indexOf('_index') >= 0"
        >
          <v-icon :type="item.children[0].icon || item.icon"></v-icon>
          <span>{{ itemTitle(item.children[0]) }}</span>
        </v-menu-item>
        <sub-menu
          v-else
          :menuInfo="item"
          :key="item.name"
        />
      </template>
    </v-menu>
  </v-scrollbar>
</template>

<script>
import util from '@/libs/util'
import SubMenu from './SubMenu'
export default {
  components: {
    'sub-menu': SubMenu,
  },
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      menuHeight: "200",
      rootSubmenuKeys: [],
      openKeys: []
    }
  },
  computed: {
  },
  methods: {
    menuHeightResize() {
      this.menuHeight = document.documentElement.clientHeight - 250;
    },
    itemTitle(item) {
      return util.showTitle(item, this);
    },
    handleClickMenu(e) {
      this.$router.push({
        name: e.key
      });
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    updateOpenKeys() {
      this.openKeys = this.$route.matched.map(item => item.name)
    }
  },
  watch: {
    $route(to) {
      this.updateOpenKeys()
    }
  },
  mounted() {
    this.updateOpenKeys()
    this.rootSubmenuKeys = this.$store.state.app.routers.map(item => item.name)
    this.menuHeightResize();
    window.addEventListener("resize", this.menuHeightResize);
  }
}
</script>
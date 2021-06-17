<template>
  <div class="iframes-wrap" :style="{ height: iframeHeight + 'px' }">
    <template v-for="(item, index) in redirectList">
      <iframe
        v-if="handleCache(item.name)"
        frameborder="no"
        :src="item.href"
        width="100%"
        height="100%"
        data-iframe="0"
        data-left="0"
        v-show="$route.name == item.name"
        :key="index"
      ></iframe>
    </template>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      iframeHeight: 200,
    };
  },
  computed: {
    redirectList() {
      return this.$store.state.app.redirectList;
    },
    tagNavList() {
      return this.$store.state.app.tagNavList;
    },
  },
  created() {
    this.iframeHeight = document.documentElement.clientHeight - 108;
  },
  methods: {
    handleCache(name) {
      let res = _.filter(this.tagNavList, (item) => {
        return item.name == name;
      });
      return res.length ? true : false;
    },
  },
};
</script>
<style lang="less" scoped>
.iframes-wrap {
  width: 100%;
}
</style>
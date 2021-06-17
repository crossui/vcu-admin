<template>
  <div class="singleWrap">
    <iframe frameborder="no" :src="href" width="100%" height="100%" data-iframe="0" data-left="0"></iframe>
  </div>
</template>
<script>
export default {
  name: "EmbedPage",
  props: {
    href: {
      required: true,
      type: String,
      default: ""
    }
  },
  methods: {
    
  }
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>

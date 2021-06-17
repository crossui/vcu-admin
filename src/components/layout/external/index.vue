<template>
  <EmbedPage :href="inhref" />
</template>

<script>
export default {
  computed: {
    inhref() {
      return this.$route.meta.href
    },
  },
}
</script>
<style lang="less" scoped>
</style>
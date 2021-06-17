<template>
  <v-card title="自定义滚动条" class="mb-20">
    <Scrollbar class="scroll-container">
      <p v-for="i in 100" :key="`item-${i}`">item - {{ i }}</p>
    </Scrollbar>
  </v-card>
</template>

<script>
export default {
  name: "scrollbar",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.scroll-container {
  height: 200px;
}
</style>
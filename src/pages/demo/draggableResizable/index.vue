<template>
  <v-card title="基础">
    <div class="draggableResizable-demo">
      <draggable-resizable>
        <p>你可以拖着我，按照自己的意愿调整大小。</p>
      </draggable-resizable>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "draggableResizableDemo",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.draggableResizable-demo {
  background: #f1f1f1;
  height: 300px;
  position: relative;
  overflow: hidden;
}
</style>
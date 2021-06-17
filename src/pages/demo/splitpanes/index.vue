<template>
  <div>
    <v-card class="mb-20" title="左右分割">
      <splitpanes class="default-theme">
        <pane v-for="i in 3" :key="i">
          <div>{{ i }}</div>
        </pane>
      </splitpanes>
    </v-card>

    <v-card class="mb-20" title="上下分割">
      <splitpanes class="default-theme" horizontal style="height: 400px">
        <pane v-for="i in 3" :key="i">
          <div>{{ i }}</div>
        </pane>
      </splitpanes>
    </v-card>

    <v-card class="mb-20" title="最小、最大宽度（%）">
      <splitpanes class="default-theme">
        <pane v-for="i in 3" :key="i" min-size="5" max-size="70">
          <div>{{ i }}</div>
        </pane>
      </splitpanes>
    </v-card>

    <v-card class="mb-20" title="嵌套">
      <splitpanes style="height: 400px" class="default-theme">
        <pane min-size="20">1</pane>
        <pane>
          <splitpanes horizontal class="child">
            <pane>2</pane>
            <pane>3</pane>
            <pane>4</pane>
          </splitpanes>
        </pane>
        <pane>5</pane>
      </splitpanes>
    </v-card>

    <v-card class="mb-20" title="嵌套2">
      <splitpanes class="default-theme" horizontal :push-other-panes="false" style="height: 400px">
        <pane>
          <span>1</span>
        </pane>
        <pane>
          <splitpanes :push-other-panes="false">
            <pane>
              <span>2</span>
            </pane>
            <pane>
              <span>3</span>
            </pane>
            <pane>
              <span>4</span>
            </pane>
          </splitpanes>
        </pane>
        <pane>
          <span>5</span>
        </pane>
      </splitpanes>
    </v-card>

    <v-card class="mb-20" title="动态添加">
      <v-button @click="panesNumber++">Add pane</v-button>
      <v-button @click="panesNumber--">Remove pane</v-button>
      <splitpanes class="default-theme">
        <pane v-for="i in panesNumber" :key="i">
          <span>{{ i }}</span>
        </pane>
      </splitpanes>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "splitpanesDemo",
  data() {
    return {
      panesNumber:3
    };
  },
  computed: {},
  methods: {}
};
</script>
<style lang="less" scoped>
.default-theme {
  color: rgba(0, 0, 0, 0.3);
  font-size: 5em;
  text-align: center;
  .child {
    font-size: 1.25em;
  }
}
</style>
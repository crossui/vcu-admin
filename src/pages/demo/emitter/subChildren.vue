<template>
  <v-card title="孙子组件">
    <v-button @click="handleDispatch" class="mr-10">调用祖父组件方法</v-button>
    <sub-children-children class="mt-20" />
  </v-card>
</template>

<script>
import emitter from "@/mixins/emitter";
import subChildrenChildren from "./subChildrenChildren";

export default {
  name: "subChildren",
  components: {
    subChildrenChildren,
  },
  mixins: [emitter],
  data() {
    return {};
  },
  created() {
    this.$on("console-alert", this.consoleAlert);
  },
  methods: {
    handleDispatch() {
      this.dispatch("emitter", "emitter-fun", "成功叫到我爸爸的爸爸");
    },
    consoleAlert(val) {
      alert(val);
    },
  },
};
</script>
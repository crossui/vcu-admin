<template>
  <v-card title="子组件">
    <v-button @click="handleDispatch" class="mr-10">调用父组件方法</v-button>
    <sub-children class="mt-20" />
  </v-card>
</template>

<script>
import emitter from "@/mixins/emitter";
import subChildren from "./subChildren";

export default {
  name: "subEmitter",
  components: {
    subChildren,
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
      this.dispatch("emitter", "emitter-fun", "成功叫到我爸爸");
    },
    consoleAlert(val) {
      confirm(val);
    },
  },
};
</script>
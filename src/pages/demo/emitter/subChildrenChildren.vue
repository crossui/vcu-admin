<template>
  <v-card title="曾孙组件">
    <v-button @click="handleDispatch" class="mr-10"
      >调用曾祖父组件方法</v-button
    >

    <v-button @click="handleInvoked" class="mr-10"
      >调用远房兄弟组件方法</v-button
    >
  </v-card>
</template>

<script>
import emitter from "@/mixins/emitter";

export default {
  name: "subChildrenChildren",
  components: {},
  mixins: [emitter],
  created() {
    this.$on("console-alert", this.consoleAlert);
  },
  data() {
    return {};
  },
  methods: {
    handleInvoked() {
      this.invoked("otherCom", "otherConsoleAlert", "成功叫到曾叔叔");
    },
    handleDispatch() {
      this.dispatch("emitter", "emitter-fun", "成功叫到我爸爸的爸爸的爸爸");
    },
    consoleAlert(val) {
      alert(val);
    },
  },
};
</script>
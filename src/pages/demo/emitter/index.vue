<template>
  <v-card title="组件间通信">
    <v-button @click="handleInvoked" class="mr-10">
      调用页面方法（ 弹窗可拖拽--页面必须打开过 ）
    </v-button>
    <v-button @click="handleBroadcast" class="mr-10"> 调用子组件方法 </v-button>
    <v-button @click="handleBroadcast1" class="mr-10">
      调用孙子组件方法
    </v-button>
    <v-button @click="handleBroadcast2" class="mr-10">
      调用曾孙组件方法
    </v-button>
    <subEmitter class="mt-20" />
    <otherCom class="mt-20" />
  </v-card>
</template>

<script>
import emitter from "@/mixins/emitter";
import subEmitter from "./subEmitter";
import otherCom from "./otherCom";

export default {
  name: "emitter",
  components: {
    subEmitter,
    otherCom,
  },
  mixins: [emitter],
  data() {
    return {};
  },
  created() {
    this.$on("emitter-fun", (val) => {
      alert(val);
    });
  },
  methods: {
    handleInvoked() {
      this.invoked("modalDrag", "otherPageFun", "成功调到其他页面方法");
    },
    handleBroadcast() {
      this.broadcast("subEmitter", "console-alert", "成功叫到我的儿子");
    },
    handleBroadcast1() {
      this.broadcast("subChildren", "console-alert", "成功叫到我的儿子的儿子");
    },
    handleBroadcast2() {
      this.broadcast(
        "subChildrenChildren",
        "console-alert",
        "成功叫到我的儿子的儿子的儿子"
      );
    },
  },
};
</script>
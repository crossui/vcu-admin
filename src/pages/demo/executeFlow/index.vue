<template>
  <v-spin :class="{'ptb-200': !pageInit}" :spinning="spinLoading" :tip="textLoading">
    <div v-show="pageInit">
      <v-card title="执行流引擎">
        <v-button @click="handleExecuteFlow1" class="mr-30">常规流程引擎</v-button>
        <v-button @click="handleExecuteFlow2" class="mr-30">个性流程引擎</v-button>
        <v-button @click="handleExecuteFlowArrFun" class="mr-30">多点流程引擎</v-button>
        <div class="mt-30">{{(new Date()).getTime()}}</div>
      </v-card>
    </div>

    <v-modal destroyOnClose title="Title" :visible="visible" @ok="handleOk" @cancel="handleCancel">
      <v-input v-model="inputValue" placeholder="Basic usage" />
    </v-modal>

    <v-modal
      destroyOnClose
      title="Title1"
      :visible="visible1"
      @ok="handleOk1"
      @cancel="handleCancel1"
    >
      <v-input v-model="inputValue1" placeholder="Basic usage" />
    </v-modal>
  </v-spin>
</template>

<script>
import baseFlow from "@/mixins/baseExecuteFlow";
import flow1 from "./mixins/flow1";
import flow2 from "./mixins/flow2";
import flowArr from "./mixins/flowArr";
export default {
  name: "executeFlow",
  components: {},
  props: {},
  mixins: [baseFlow, flow1, flow2, flowArr],
  watch: {},
  computed: {},
  data() {
    return {
      textLoading: "",
      loadingTextObj: {
        loading: "页面初始化中...",
        updata: "数据提交中..."
      },
      pageInit: false,
      spinLoading: true
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    openLoading(text) {
      this.textLoading = text;
      this.spinLoading = true;
    },
    closeLoading() {
      this.spinLoading = false;
    },
    init() {
      this.openLoading(this.loadingTextObj.loading);
      //根据实际情况关闭加载状态
      setTimeout(() => {
        this.pageInit = true;
        this.closeLoading();
      }, 500);
    }
  },
  activated() {},
  deactivated() {},
};
</script>
<style lang="less" scoped>
</style>
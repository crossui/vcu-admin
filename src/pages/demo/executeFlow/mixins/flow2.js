import flowJson2 from "../json/flow2.json"

export default {
  components: {},
  props: {},
  mixins: [],
  watch: {},
  computed: {},
  data() {
    return {
      executeFlowRes2: null,
      currReturnRes: null,
      visible: false,
      inputValue: "",
    };
  },
  created() { },
  mounted() { },
  methods: {
    //开始
    handleExecuteFlow2() {
      this.executeFlowRes2 = _.merge({}, flowJson2, {
        response: {
          PTSXX00: 1
        }
      });
      this.handleExecuteFlow("executeFlowRes2");
    },
    //结束
    endFlow2(res) {
      console.info("成功", res)
      this.executeFlowRes2 = null;
    },
    //错误
    errorFlow2() {
      console.error("失败")
      this.util.mainReload()
    },
    handleOk() {
      this.executeFlowRes2.response.IXX00 = this.inputValue
      this.splitJointOdcDecision("executeFlowRes2", 1, this.currReturnRes.data)
      this.handleExecuteFlow("executeFlowRes2")
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
      this.endFlow2(this.currReturnRes)
    },
    async odcTestThree(res) {
      this.currReturnRes = res;
      let _res = await this.showConfirmModal(res.data)
      if (_res) {
        this.visible = true;
      } else {
        this.splitJointOdcDecision("executeFlowRes2", 0, this.currReturnRes.data)
        this.handleExecuteFlow("executeFlowRes2")
      }

    }
  },
  activated() {
  },
  deactivated() {
  }
}
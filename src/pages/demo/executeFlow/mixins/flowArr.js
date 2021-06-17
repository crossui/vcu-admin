import flowArr from "../json/flowArr.json"

export default {
  components: {},
  props: {},
  mixins: [],
  watch: {},
  computed: {},
  data() {
    return {
      visible1: false,
      inputValue1: "",
      executeFlowResArr: null,
      currReturnResArr: null
    };
  },
  created() { },
  mounted() { },
  methods: {
    //开始
    handleExecuteFlowArrFun() {
      this.executeFlowResArr = _.merge({}, flowArr, {
        initResponse: {
          PTSXX00: 2
        }
      });
      this.handleExecuteFlowArr("executeFlowResArr", 0);
    },
    //结束
    endFlowArrLast(res) {

    },
    //错误
    errorFlowArrLast() {

    },
    //第二个接口 个性处理
    odcTestThreeArr(res) {
      this.currReturnResArr = res;
      this.visible1 = true;
    },
    handleOk1() {
      this.executeFlowResArr.flowArr[this.executeFlowResArr.currIndex].response.bXX00 = this.inputValue1
      this.splitJointOdcDecision("executeFlowResArr", 1, this.currReturnResArr.data, true)
      this.handleExecuteFlow("executeFlowResArr", true);
      this.visible1 = false;
    },
    handleCancel1() {
      this.visible1 = false;
    },

    errorFlowArr1() {
      console.error("失败1")
      this.util.mainReload()
    },
    errorFlowArr2() {
      console.error("失败2")
      this.util.mainReload()
    },
    endFlowArr2(res) {
      console.info("成功2", res)
      if(res.data.payload == "0"){
        this.handleExecuteFlowArr("executeFlowResArr", 2);
      }else{
        this.handleExecuteFlowArr("executeFlowResArr", 3);
      }
    },
    errorFlowArr3() {
      console.error("失败3")
      this.util.mainReload()
    },
    errorFlowArr4() {
      console.error("失败4")
      this.util.mainReload()
    },
    errorFlowArrLast() {
      console.error("失败LAST")
      this.util.mainReload()
    },
    endFlowArrLast(){
      console.info("成功LAST")
      this.util.mainReload()
    }
  },
  activated() {
  },
  deactivated() {
  }
}
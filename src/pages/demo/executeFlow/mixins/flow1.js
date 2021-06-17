import flowJson1 from "../json/flow1.json"

export default {
  components: {},
  props: {},
  mixins: [],
  watch: {},
  computed: {},
  data() {
    return {
      executeFlowRes1: null
    };
  },
  created() { },
  mounted() { },
  methods: {
    //开始
    handleExecuteFlow1() {
      this.executeFlowRes1 = _.merge({}, flowJson1, {
        response: {
          PTSXX00: 2
        }
      });
      this.handleExecuteFlow("executeFlowRes1");
    },
    //结束
    endFlow1(res) {
      console.info("成功", res)
      this.executeFlowRes1 = null;
    },
    //错误
    errorFlow1() {
      console.error("失败")
      this.util.mainReload()
    }
  },
  activated() {
  },
  deactivated() {
  }
}
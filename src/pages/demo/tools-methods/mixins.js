export default {
  computed: {
    collapsed() {
      return this.$store.state.app.collapsed;
    },
    keyMap() {
      return [
        {
          keyVal: "F4",
          callBack: this.handleF4
        },
        {
          keyVal: "alt+enter",
          callBack: this.handleAltEnter
        }
      ];
    }
  },
  data() {
    return {
      isShow: true,
      staticDict: [],
      dict: [],
      xdict: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {

    },
    handleF4() {
      alert("F4");
    },
    handleAltEnter() {
      alert("ALT+Enter");
    },
    createTagParams() {
      const id = parseInt(Math.random() * 100000);
      this.$router.push({
        name: "params_page",
        params: {
          id
        }
      });
    },
    createTagQuery() {
      const id = parseInt(Math.random() * 100000);
      this.$router.push({
        name: "query_page",
        query: {
          id
        }
      });
    },
    handleCloseTag() {
      this.util.colsePage(this.$route.name);
    },
    handleDelCache() {
      this.util.delCachePage("formStylesOne");
    },
    handleCollapsed() {
      this.$store.commit("setCollapsed", !this.collapsed);
    },
    handleConsoleDict(){
      console.info(this.pageInitDict["性别"])
    }
  },
  activated() {
    this.isShow = true;
  },
  deactivated() {
    this.isShow = false;
  }
};
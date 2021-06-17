/* 
* 执行流引擎
* handleExecuteFlow(resName)  resName:数据源名称
*/
import request from '@/utils/request';
export default {
  components: {},
  props: {},
  mixins: [],
  watch: {},
  computed: {},
  data() {
    return {
    };
  },
  created() { },
  mounted() { },
  methods: {
    //处理数组节点
    async handleExecuteFlowArr(resName, index) {
      try {
        let vm = this[resName];
        vm.currIndex = index
        if (vm.flowArr[vm.currIndex]) {
          vm.flowArr[vm.currIndex].response = _.merge({}, vm.initResponse);
          this.handleExecuteFlow(resName, true)
        } else {
          this[vm.endMethodsFun]()
        }
      } catch (err) {
        this[vm.errorMethodsFun]()
      }
    },
    //处理节点
    async handleExecuteFlow(resName, isArr) {
      let vm = isArr ? this[resName].flowArr[this[resName].currIndex] : this[resName]
      let res = await this.requestFlow(vm)
      if (res) {
        let { data, headers } = res;
        if (data.status == 100) {
          if (vm.node[data.payload] && vm.node[data.payload].methodsFun && vm.node[data.payload].methodsFun != "") {
            //个性节点，自行处理 （由后端口头告知）
            this[vm.node[data.payload].methodsFun](res)
          } else {
            //常规节点，递归处理
            if (data.nodeStatus == "1") {
              //有下一个节点
              if (data.modalShow == "1") {
                //是否显示弹窗
                let currObj = _.merge({}, vm.node[data.payload], data);
                let modalRes = null
                switch (data.modalType) {
                  case "1":
                    //ConfirmModal
                    //1 y下一个节点, n结束
                    modalRes = await this.showConfirmModal(currObj)
                    if (modalRes) {
                      //y下一个节点
                      this.splitJointOdcDecision(resName, 1, data, isArr)
                      this.handleExecuteFlow(resName, isArr)
                    } else {
                      //n结束
                      if (isArr && !vm.endMethodsFun) {
                        this[this[resName].endMethodsFun](res, false)
                      } else {
                        this[vm.endMethodsFun](res, false)
                      }
                    }
                    break;
                  case "2":
                    //ConfirmModal
                    //y 下一个节点,n 下一个节点
                    modalRes = await this.showConfirmModal(currObj)
                    if (modalRes) {
                      //y下一个节点
                      this.splitJointOdcDecision(resName, 1, data, isArr)
                    } else {
                      //n 下一个节点
                      this.splitJointOdcDecision(resName, 0, data, isArr)
                    }
                    this.handleExecuteFlow(resName, isArr)
                    break;
                  case "3":
                    //InfoModal
                    //y 下一个节点
                    modalRes = await this.showInfoModal(currObj)
                    if (modalRes) {
                      //y下一个节点
                      this.splitJointOdcDecision(resName, 1, data, isArr)
                    }
                    this.handleExecuteFlow(resName, isArr)
                    break;
                  case "4":
                    //InfoModal
                    //y 结束
                    modalRes = await this.showInfoModal(currObj)
                    if (modalRes) {
                      //y结束
                      if (isArr && !vm.endMethodsFun) {
                        this[this[resName].endMethodsFun](res, false)
                      } else {
                        this[vm.endMethodsFun](res, false)
                      }
                    }
                    break;
                }
              } else {
                //有下一个节点 不显示弹窗 归为个性流程（由后端口头告知）
                this[vm.node[data.payload].methodsFun](res)
              }
            } else {
              //流程结束
              if (isArr && !vm.endMethodsFun) {
                this[this[resName].endMethodsFun](res, false)
              } else {
                this[vm.endMethodsFun](res, false)
              }
            }
          }
        } else if (data.status == 200) {
          //流程正常结束
          if (isArr) {
            if (vm.endMethodsFun && vm.endMethodsFun != "") {
              this[vm.endMethodsFun](res, true)
            } else {
              this.handleExecuteFlowArr(resName, ++this[resName].currIndex)
            }
          } else {
            this[vm.endMethodsFun](res, true)
          }
        } else {
          //接口报错流程中断
          this[vm.errorMethodsFun](res)
        }
      } else {
        //接口报错流程中断
        this[vm.errorMethodsFun](res)
      }
    },
    //请求节点接口
    async requestFlow(obj) {
      try {
        !obj.isHideSpin && this.util.appSpinLoad(true)
        const res = await request({
          url: obj.ajaxUrl,
          method: 'POST',
          data: obj.response,
          headers: obj.headers ? obj.headers : undefined,
          isHandleErr500: obj.isHandleErr500 ? obj.isHandleErr500 : false
        })
        !obj.isHideSpin && this.util.appSpinLoad(false)
        return res;
      } catch (err) {
        this.util.appSpinLoad(false)
        return false;
      }
    },
    //拼接x-odc-decision数据
    splitJointOdcDecision(resName, status, res, isArr) {
      let vm = isArr ? this[resName].flowArr[this[resName].currIndex] : this[resName]
      let decisionList = [];
      if (!vm.response) {
        vm.response = {}
      }
      if (vm.response["x-odc-decision"]) {
        decisionList = JSON.parse(vm.response["x-odc-decision"]).data
      }

      //删除已经存在的节点
      decisionList.forEach((item, index) => {
        if (item.node == res.payload) {
          decisionList.splice(index, 1);
        }
      })
      decisionList.push({ "node": res.payload, "nodeStatus": status, "parameter": res.pamamJson })
      vm.response["x-odc-decision"] = JSON.stringify({ data: decisionList })
    },
    //弹出确认框
    showConfirmModal(obj) {
      return new Promise((resolve, reject) => {
        try {
          this.$confirm({
            class: "modal-confirm-enter-event",
            autoFocusButton: obj.autoFocusButton ? obj.autoFocusButton : null,
            maskClosable: false,
            keyboard: false,
            zIndex: 9999,
            centered: true,
            title: obj.modal && obj.modal.title ? obj.modal.title : "提示",
            content: h => {
              return h("div", {
                domProps: {
                  innerHTML: obj.title ? obj.title : ""
                }
              });
            },
            okText: obj.modal && obj.modal.okText != undefined ? obj.modal.okText : "是",
            cancelText: obj.modal && obj.modal.cancelText != undefined ? obj.modal.cancelText : "否",
            onOk() {
              resolve(true)
            },
            onCancel() {
              resolve(false)
            },
          });
        } catch (err) {
          reject(false);
        }
      })
    },
    //弹出info对话框
    showInfoModal(obj) {
      return new Promise((resolve, reject) => {
        try {
          this.$info({
            class: "modal-confirm-enter-event",
            autoFocusButton: null,
            maskClosable: false,
            keyboard: false,
            zIndex: 9999,
            centered: true,
            title: obj.modal && obj.modal.title ? obj.modal.title : "提示",
            content: h => {
              return h("div", {
                domProps: {
                  innerHTML: obj.title ? obj.title : ""
                }
              });
            },
            okText: obj.modal && obj.modal.okText != undefined ? obj.modal.okText : "是",
            onOk() { resolve(true) },
          });
        } catch (err) {
          reject(false);
        }
      })
    }
  },
  activated() { },
  deactivated() { }
}
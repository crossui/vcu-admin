<template>
  <v-card title="select" class="mb-10">
    <v-row :gutter="16">
      <v-col :span="12">
        <h5 class="mb-20">固定选项：</h5>
        <editCell
          :formData="formData"
          :objData="objData"
          :editValue="editValue"
          :size="appConfig.elementSize"
          @getEditValue="getEditValue"
        >{{inputValue}}</editCell>
      </v-col>
      <v-col :span="12">
        <h5 class="mb-20">动态选项：</h5>
        <editCell
          :formData="formData1"
          :objData="objData1"
          :editValue="editValue1"
          :size="appConfig.elementSize"
          @getEditValue="getEditValue1"
        >{{inputValue1}}</editCell>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      editValue: "1",
      inputValue: "男",
      formData: {
        edit: {
          onChange: val => {
            console.info(val);
          }
        }
      },
      objData: {
        name: "edit", //唯一标识
        uiComponentType: "select", //应用控件类型
        disabled: false, //是否禁用
        style: {
          width: "80" //容器宽度
        },
        selectDictContent: "", //字典编码
        selectType: "0", //0选项可配;1本地字典;2动态字典
        selectDictUrl: "", //select动态字典请求地址
        selectIsAll: "true", //select是否显示全部选项
        transfer: true, // 是否将select弹层放置于 body 内
        data: [
          //数据源
          {
            value: "男",
            key: "1"
          },
          {
            value: "女",
            key: "2"
          }
        ]
      },

      editValue1: "7",
      inputValue1: "正常分娩",
      formData1: {
        edit: {
          onChange: val => {
            console.info(val);
          },
          onLoadData: res => {
            this.selectDatas = res;
          }
        }
      },
      objData1: {
        name: "edit1",
        uiComponentType: "select",
        disabled: false,
        style: {
          width: "140"
        },
        selectDictContent: "27",
        selectType: "2",
        selectDictUrl: "dataq/api/xdict",
        selectIsAll: "true",
        data: ""
      },
      selectDatas: []
    };
  },
  computed: {},
  methods: {
    getEditValue(val) {
      this.editValue = val;
      switch (val) {
        case "1":
          this.inputValue = "男";
          break;
        case "2":
          this.inputValue = "女";
          break;
        default:
          this.inputValue = "全部";
      }
    },
    //动态
    getEditValue1(val) {
      this.editValue1 = val;
      _.forEach(this.selectDatas, (item, key) => {
        if (val == item.KEY) {
          this.inputValue1 = item.VALUE;
        }
      });
    }
  }
};
</script>
<template>
  <v-card title="autoTypewrit" class="mb-10">
    <editCell
      ref="editCellDom"
      :formData="formData"
      :objData="objData"
      :editValue="editValue"
      :size="appConfig.elementSize"
      @getEditValue="getEditValue"
      >{{ inputValue }}</editCell
    >
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      editValue: null,
      inputValue: "null",
      formData: {
        edit: {
          formData: { "aaaa": "2222" },
          onChange: (val) => {
            console.info(val);
          },
        },
      },
      objData: {
        name: "edit", //唯一标识
        uiComponentType: "autoTypewrit", //应用控件类型
        disabled: false, //是否禁用
        style: {
          width: "200", //容器宽度
        },
        transfer: true, // 是否将select弹层放置于 body 内
        dynamicDictUrl: "getApproveArrearageList", //动态字典查询地址
        dynamicDictWidth: "600", //输入法字典控件表格宽度
        dynamicDictValueName: "pName", //输入法字典回填字段key值
        isAllowInput: "false", //输入法字典是否允许可输入值
      },
    };
  },
  computed: {},
  methods: {
    getEditValue(val) {
      this.editValue = val;
      this.inputValue = val ? val[this.objData.dynamicDictValueName] : "null";
    },
  },
};
</script>
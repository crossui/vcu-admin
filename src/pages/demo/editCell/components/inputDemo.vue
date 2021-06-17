<template>
  <v-card title="input" class="mb-10">
    <div class="mb-30">
      <editCell
        :formData="formData"
        :objData="objData"
        :editValue="inputValue"
        :size="appConfig.elementSize"
        @getEditValue="getEditValue"
        >{{ inputValue }}</editCell
      >
    </div>

    <div>
      <editCell
        isEditStatus
        :formData="formData"
        :objData="objData"
        :editValue="inputValue"
        :size="appConfig.elementSize"
        @getEditValue="getEditValue"
        >{{ inputValue }}</editCell
      >
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "我是可编辑的",
      formData: {
        edit: {
          onChange: (val) => {
            console.info(val);
          },
        },
      },
      objData: {
        name: "edit", //唯一标识
        uiComponentType: "input", //应用控件类型
        disabled: false, //是否禁用
        style: {
          width: "200", //容器宽度
        },
      },
    };
  },
  computed: {},
  methods: {
    getEditValue(val) {
      this.inputValue = val;
    },
  },
};
</script>
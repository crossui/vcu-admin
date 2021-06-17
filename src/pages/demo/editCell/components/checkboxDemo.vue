<template>
  <v-card title="checkbox" class="mb-10">
    <editCell
      :formData="formData"
      :objData="objData"
      :editValue="editValue"
      :size="appConfig.elementSize"
      @getEditValue="getEditValue"
    >{{inputValue}}</editCell>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      editValue: ["1"],
      inputValue: "全院公告",
      formData: {
        edit: {
          onChange: val => {
            console.info(val);
          }
        }
      },
      objData: {
        name: "edit", //唯一标识
        uiComponentType: "checkbox",  //应用控件类型
        disabled: false,  //是否禁用
        data: [   //数据源
          {
            value: "全院公告",
            key: "1"
          },
          {
            value: "科室公告",
            key: "2"
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    getEditValue(val) {
      this.editValue = val;
      let inputValue = [];
      _.forEach(this.objData.data, (item, key) => {
        if (_.includes(val, item.key)) {
          inputValue.push(item.value)
        }
      });
      this.inputValue = _.join(inputValue, ',');
    }
  }
};
</script>
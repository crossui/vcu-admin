<template>
  <v-card title="dateTime" class="mb-10">
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
      editValue: {
        startDate: this.util.formatDate(new Date(), "yyyy-MM-dd"),
        startTime: this.util.formatDate(new Date(), "hh:mm:ss")
      },
      inputValue: `${this.util.formatDate(
        new Date(),
        "yyyy-MM-dd"
      )} ${this.util.formatDate(new Date(), "hh:mm:ss")}`,
      formData: {
        edit: {
          onChange: val => {
            console.info(val);
          }
        }
      },
      objData: {
        name: "edit", //唯一标识
        uiComponentType: "dateTime",  //应用控件类型
        disabled: false,  //是否禁用
        transfer: true, // 是否将弹层放置于 body 内
        dateTimeInterval: "", //  1 1天, 3 3天, 5 5天, 7 1周, 14 2周, 30 1月, 90 3月, 180 半年, 360 1年
        dateTimeType: "3" //  0 起止日期时间, 1 起止日期, 2 起止时间, 3 日期时间, 4 日期, 5 时间
      }
    };
  },
  computed: {},
  methods: {
    getEditValue(val) {
      this.inputValue = `${val.startDate} ${val.startTime}`;
      this.editValue = {
        startDate: val.startDate,
        startTime: val.startTime
      };
    }
  }
};
</script>
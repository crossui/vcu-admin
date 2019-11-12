<template>
  <v-radio-group :options="optionLists" :defaultValue="defaultValue" @change="onChange"></v-radio-group>
</template>
<script>
export default {
  name: "radios",
  data() {
    return {
      optionLists: []
    };
  },
  props: {
    plainOptions: {
      //默认
      type: Array,
      default() {
        return [];
      }
    },
    defaultValue: {
      type: Array,
      default: []
    },
    optionsType: {
      type: String,
      default: "1"
    },
    dataSourceUrl: {
      type: String,
      default: ""
    },
    dataSourceType: {
      type: String,
      default: "GET"
    }
  },
  mounted() {
    if (this.optionsType == "2") {
      this.getDataSource();
    } else {
      this.optionLists = this.plainOptions;
    }
  },
  watch: {
    plainOptions(val){
      this.optionLists = val;
    },
    optionsType(val) {
      if (val == "2") this.getDataSource();
    },
    dataSourceUrl(){
      this.getDataSource();
    },
    dataSourceType(){
      this.getDataSource();
    }
  },
  methods: {
    onChange(checkedValues) {
      this.$emit("handleChangeValue", checkedValues);
    },
    getDataSource() {
      this.request(this.dataSourceUrl,{method: this.dataSourceType}).then(res => {
        this.optionLists = res.data
      });
    }
  }
};
</script>
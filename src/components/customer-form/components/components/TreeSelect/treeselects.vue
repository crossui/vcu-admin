<template>
  <v-tree-select
    :treeData="optionLists"
    :defaultValue="defaultValue"
    @change="onChange"
    :multiple="multiple"
    :placeholder="placeholder"
    :dropdownStyle="dropdownStyle"
    :allowClear="true"
  ></v-tree-select>
</template>
<script>
export default {
  name: "treeselects",
  data() {
    return {
      optionLists: [],
      multiple: false,
      dropdownStyle: { maxHeight: "400px", overflow: "auto" }
    };
  },
  props: {
    modeType: {
      type: String,
      default: "default"
    },
    placeholder: {
      type: String
    },
    plainOptions: {
      //默认
      type: Array,
      default() {
        return [];
      }
    },
    defaultValue: {
      type: [String,Array],
      default: ""
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

    this.multiple = this.modeType == "default" ? false : true;
  },
  watch: {
    plainOptions(val) {
      this.optionLists = val;
    },
    modeType(val) {
      this.multiple = val == "default" ? false : true;
    },
    optionsType(val) {
      if (val == "2") this.getDataSource();
    },
    dataSourceUrl() {
      this.getDataSource();
    },
    dataSourceType() {
      this.getDataSource();
    }
  },
  methods: {
    onChange(checkedValues) {
      this.$emit("handleChangeValue", checkedValues);
    },
    getDataSource() {
      this.request(this.dataSourceUrl, { method: this.dataSourceType }).then(
        res => {
          this.optionLists = res.data;
        }
      );
    }
  }
};
</script>
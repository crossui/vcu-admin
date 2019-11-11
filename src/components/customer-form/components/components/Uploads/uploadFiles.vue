<template>
  <div>
    <v-upload-dragger
      :name="name"
      :multiple="true"
      :action="action"
      listType="picture"
      :defaultFileList="defaultList"
      @change="handleChange"
    >
      <p class="vcu-upload-drag-icon">
        <v-icon type="cloud-upload"></v-icon>
      </p>
      <p class="vcu-upload-text">单击或拖动文件到此区域以上传</p>
      <p
        class="vcu-upload-hint"
      >支持单次或批量上传。</p>
    </v-upload-dragger>
  </div>
</template>
<script>
export default {
  name: "uploadFiles",
  data() {
    return {
      
    };
  },
  methods: {
    handleChange(info){
      this.$emit('handleUploadsValue', info);
    }
  },
  mounted() {

  },
  props: {
    defaultList: {
      //默认
      type: Array,
      default() {
        return [];
      }
    },
    action: {
      //提交地址
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: "file"
    }
  }
};
</script>
<style lang="less" scoped>
</style>

<template>
  <div>
    <v-upload-dragger
      :name="uploadAdminName"
      :multiple="true"
      :action="action"
      listType="picture"
      :defaultFileList="defaultList"
      :accept="accept"
      @change="handleChange"
    >
      <p class="vcu-upload-drag-icon">
        <v-icon type="cloud-upload"></v-icon>
      </p>
      <p class="vcu-upload-text">单击或拖动文件到此区域以上传</p>
      <p class="vcu-upload-hint">支持单次或批量上传。</p>
    </v-upload-dragger>
  </div>
</template>
<script>
export default {
  name: "uploadFiles",
  data() {
    return {
      accept: ''
    };
  },
  watch:{
    fileFormat(val){
      this.accept = val.join(",")
    }
  },
  methods: {
    handleChange({file, fileList}){
      this.$emit('handleUploadsValue', fileList);
    }
  },
  mounted() {
    this.accept = this.fileFormat.join(",")
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
    uploadAdminName: {
      type: String,
      default: "file"
    },
    fileFormat: {
      type: Array,
      default: []
    }
  }
};
</script>
<style lang="less" scoped>
</style>

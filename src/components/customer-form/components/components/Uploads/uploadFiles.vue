<template>
  <div>
    <v-upload-dragger
      :name="uploadAdminName"
      :multiple="true"
      :action="uploadAction"
      listType="picture"
      type="drag"
      :defaultFileList="defaultList"
      @change="handleChange"
      :accept="accept"
      :beforeUpload="beforeUpload"
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
import { updateLocale } from 'moment';
export default {
  name: "uploadFiles",
  data() {
    return {
      accept: ""
    };
  },
  watch: {
    fileFormat() {
      //this.updateAccept()
    },
    customFileFormat() {
      //this.updateAccept()
    }
  },
  methods: {
    beforeUpload(file){
      console.info(file)
    },
    handleChange({ file, fileList }) {
      this.$emit("handleUploadsValue", fileList);
    },
    updateAccept(){
      let _accept = ''
      if(this.fileFormat.length){
        _accept = this.fileFormat.join(",");
      }
      if(this.customFileFormat!=''){
        if(this.fileFormat.length != 0) _accept += ','
        _accept += this.customFileFormat
      }
      this.accept = _accept
    }
  },
  mounted() {
    //this.updateAccept()
  },
  props: {
    defaultList: {
      //默认
      type: Array,
      default() {
        return [];
      }
    },
    uploadAction: {
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
    },
    customFileFormat: {
      type: String,
      default: ""
    },
    maxSize: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style lang="less" scoped>
</style>

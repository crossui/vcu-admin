<template>
  <div class="clearfix">
    <v-upload-dragger
      :name="uploadAdminName"
      :multiple="true"
      :action="uploadAction"
      :fileList="fileList"
      listType="picture"
      :accept="accept"
      @change="handleChange"
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
import mimes from "@/libs/mime";
export default {
  name: "uploadstyleones",
  data() {
    return {
      accept: "",
      fileList: []
    };
  },
  watch: {
    fileFormat() {
      this.updateAccept();
    }
  },
  methods: {
    beforeUpload(file,fileList) {
      const isMaxSize = file.size <= this.maxSize
      if(!isMaxSize){
        this.$message.error(`文件超过限制 ${this.maxSize} 字节.`);
      }
      return isMaxSize
    },
    handleChange(info) {
      /* let fileList = [...info.fileList];
      console.info(fileList)
      fileList = fileList.filter((file) => {
        if (file.status && file.status == "done") {
          return true
        }
        return false;
      });

      this.fileList = fileList
      this.$emit("handleUploadsValue", this.fileList); */
      
      console.log(info.file, info.fileList);
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    updateAccept() {
      let _accept = [];
      mimes.forEach(element => {
        this.fileFormat.forEach(item => {
          if (element.label == item) {
            _accept.push(element.value);
          }
        });
      });
      this.accept = _accept.join(",");
    }
  },
  mounted() {
    this.updateAccept();
    this.fileList = [...this.defaultList]
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

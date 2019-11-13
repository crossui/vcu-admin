<template>
  <div>
    <v-upload-dragger
      :name="uploadAdminName"
      :multiple="true"
      :action="uploadAction"
      listType="picture"
      type="drag"
      :fileList="fileList"
      @change="handleChange"
      :accept="accept"
      
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
//:beforeUpload="beforeUpload"
import mimes from "@/libs/mime";
export default {
  name: "uploadFiles",
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
      return true
    },
    handleChange(info) {
      let fileList = info.fileList;
      fileList = fileList.filter((file) => {
        console.info(file.response)
        if (file.response) {
          return file.response.status === 'success';
        }
        return false;
      });

      this.fileList = fileList

      this.$emit("handleUploadsValue", this.fileList);
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

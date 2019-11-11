<template>
  <div class="clearfix">
    <v-upload
      action="//jsonplaceholder.typicode.com/posts/"
      listType="picture-card"
      :fileList="fileList"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 3">
        <v-icon type="plus"></v-icon>
        <div class="vcu-upload-text">图片上传</div>
      </div>
    </v-upload>
    <v-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </v-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
  },
}
</script>
<style>
  /* you can make up upload button and sample style by using stylesheets */
  .vcu-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .vcu-upload-select-picture-card .vcu-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
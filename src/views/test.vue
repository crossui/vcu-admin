<template>
  <div class>
    <v-upload-dragger
      name="file"
      :multiple="true"
      action="//jsonplaceholder.typicode.com/posts/"
      @change="handleChange"
    >
      <p class="vcu-upload-drag-icon">
        <v-icon type="cloud-upload"></v-icon>
      </p>
      <p class="vcu-upload-text">Click or drag file to this area to upload</p>
      <p
        class="vcu-upload-hint"
      >Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
    </v-upload-dragger>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    handleChange(info) {
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
  },
}
</script>

<style scoped>
</style>

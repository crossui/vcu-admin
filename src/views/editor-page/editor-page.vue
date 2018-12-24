<style lang="less">
@import "./editor-page.less";
</style>

<template>
  <v-card class="editor-page">
    <textarea
      class='tinymce-textarea'
      id="tinymceEditer"
    ></textarea>
  </v-card>
</template>

<script>
import tinymce from 'tinymce';
export default {
  name: 'editorpage_index',
  data() {
    return {

    }
  },
  mounted() {
    this.initTinymce()
  },
  destoryed() {
    tinymce.get('tinymceEditer').destroy();
  },
  methods: {
    initTinymce(value) {
      this.$nextTick(() => {
        tinymce.baseURL = './static';
        let vm = this;
        tinymce.init({
          selector: '#tinymceEditer',
          branding: false,
          elementpath: false,
          height: 300,
          language: 'zh_CN',
          plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
            'searchreplace visualblocks visualchars code fullpage',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons paste textcolor colorpicker textpattern imagetools codesample'
          ],
          toolbar1: ' preview undo redo fontselect fontsizeselect insert styleselect forecolor backcolor bold italic alignleft aligncenter alignright alignjustify bullist numlist outdent indent ',
          images_upload_handler: (blobInfo, success, failure) => {
            setTimeout(function () {
              success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
            }, 2000);
          },
          autosave_interval: '20s',
          image_advtab: true,
          table_default_styles: {
            width: '100%',
            borderCollapse: 'collapse'
          },
          setup: (editor) => {
            editor.on('init', (e) => {
              if (value) {
                editor.setContent(value)
              }
            });
          }
        });
      });
    },
  }
};
</script>

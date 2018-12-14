<style lang="less">
@import "./cropper.min.css";
@import "./image-editor.less";
</style>

<template>
    <div class="image-editor">
        <v-card>
            <div slot="title">
                <v-icon type="border-inner"></v-icon>
                基础实例
            </div>
            <v-row :gutter="10">
                <v-col :span="14" class="image-editor-con1">
                    <div class="cropper">
                        <img id="cropimg1" alt="">
                    </div>
                </v-col>
                <v-col :span="10" class="image-editor-con1">
                    <v-row type="flex" justify="center" align="middle" class="image-editor-con1-preview-con">
                        <div id="preview1"></div>
                    </v-row>
                    <div class="image-editor-con1-btn-con margin-top-10">
                        <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChange1" id="fileinput1" class="fileinput" />
                        <label class="filelabel" for="fileinput1">
                            <v-icon type="image"></v-icon>&nbsp;选择图片
                        </label>
                        <span>
                            <v-button @click="handlecrop1" type="primary" icon="crop">裁剪</v-button>
                        </span>
                    </div>
                    <v-modal title="预览裁剪之后的图片" v-model="option1.showCropedImage" :footer="null">
                        <img :src="option1.cropedImg" alt="" v-if="option1.showCropedImage" style="width: 100%;">
                    </v-modal>
                </v-col>
            </v-row>
        </v-card>

        <v-card style="margin-top:10px">
            <div slot="title">
                <v-icon type="pic-center"></v-icon>
                获取图片数据
            </div>
            <v-row :gutter="10">
                <v-col :span="10" class="image-editor-con2">
                    <div class="cropper">
                        <img id="cropimg2" src="/static/images/timg.jpg" alt="">
                    </div>
                </v-col>
                <v-col :span="10" class="image-editor-con2">
                    <p><b>x:</b>{{ cropdata2.x }}</p>
                    <p><b>y:</b>{{ cropdata2.y }}</p>
                    <p><b>width:</b>{{ cropdata2.w }}</p>
                    <p><b>heigh:</b>{{ cropdata2.h }}</p>
                    <p><b>deg:</b>{{ cropdata2.deg }}</p>
                    <p><b>scaleX:</b>{{ cropdata2.scaleX }}</p>
                    <p><b>scaleY:</b>{{ cropdata2.scaleY }}</p>
                </v-col>
                <v-col :span="4" class="image-editor-con2">
                    <div class="text-center">
                        <v-button @click="cropper2.rotate(-90)" type="primary">
                            <v-icon type="undo"></v-icon>
                        </v-button>
                        <v-button @click="cropper2.rotate(90)" type="primary">
                            <v-icon type="redo"></v-icon>
                        </v-button>
                        <v-button @click="cropper2.zoom(0.1)" type="primary">
                            <v-icon type="fullscreen"></v-icon>
                        </v-button>

                        <div class="margin-top-10">
                            <v-button @click="cropper2.zoom(-0.1)" type="primary">
                                <v-icon type="fullscreen-exit"></v-icon>
                            </v-button>
                            <v-button @click="cropper2.scaleX(-cropper2.getData().scaleX)" type="primary">
                                <v-icon type="swap"></v-icon>
                            </v-button>
                            <v-button @click="cropper2.scaleY(-cropper2.getData().scaleY)" type="primary">
                                <v-icon type="colum-height"></v-icon>
                            </v-button>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import Cropper from 'cropperjs';
export default {
    name: 'imageeditor_index',
    data() {
        return {
            cropper1: {},
            option1: {
                showCropedImage: false,
                cropedImg: ''
            },
            cropper2: {},
            cropdata2: {
                x: '',
                y: '',
                w: '',
                h: '',
                deg: '',
                scaleX: '',
                scaleY: ''
            },
        }
    },
    mounted() {
        let img1 = document.getElementById('cropimg1');
        this.cropper1 = new Cropper(img1, {
            dragMode: 'move',
            preview: '#preview1',
            restore: false,
            center: false,
            highlight: false,
            cropBoxMovable: false,
            toggleDragModeOnDblclick: false
        });

        let img2 = document.getElementById('cropimg2');
        this.cropper2 = new Cropper(img2, {
            dragMode: 'move',
            restore: false,
            center: false,
            highlight: false,
            cropBoxMovable: false,
            toggleDragModeOnDblclick: false
        });
        img2.addEventListener('crop', (e) => {
            this.cropdata2.x = parseInt(e.detail.x);
            this.cropdata2.y = parseInt(e.detail.y);
            this.cropdata2.w = parseInt(e.detail.width);
            this.cropdata2.h = parseInt(e.detail.height);
            this.cropdata2.deg = parseInt(e.detail.rotate);
            this.cropdata2.scaleX = parseInt(e.detail.scaleX);
            this.cropdata2.scaleY = parseInt(e.detail.scaleY);
        });
    },
    watch: {
    },
    methods: {
        handleChange1(e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                this.cropper1.replace(reader.result);
                reader.onload = null;
            };
            reader.readAsDataURL(file);
        },
        handlecrop1() {
            let file = this.cropper1.getCroppedCanvas().toDataURL();
            this.option1.cropedImg = file;
            this.option1.showCropedImage = true;
        },
    }
};
</script>

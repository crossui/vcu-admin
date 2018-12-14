<style lang="less">
@import "./editor-page.less";
</style>

<template>
    <v-card class="editor-page">
        <script id="editor" type="text/plain"></script>
        <div class="btns margin-top-20">
            <div class="margin-bottom-10">
                <button @click="getAllHtml">获得整个html的内容</button>
                <button @click="getContent">获得内容</button>
                <button @click="setContent">写入内容</button>
                <button @click="setContent(true)">追加内容</button>
                <button @click="getContentTxt">获得纯文本</button>
                <button @click="getPlainTxt">获得带格式的纯文本</button>
                <button @click="hasContent">判断是否有内容</button>
                <button @click="setFocus">使编辑器获得焦点</button>
                <button @mousedown="isFocus($event)">编辑器是否获得焦点</button>
                <button @mousedown="setblur($event)">编辑器失去焦点</button>

            </div>
            <div class="margin-bottom-10">
                <button @click="getText">获得当前选中的文本</button>
                <button @click="insertHtml">插入给定的内容</button>
                <button @click="setEnabled">可以编辑</button>
                <button @click="setDisabled">不可编辑</button>
                <button @click="hideUE">隐藏编辑器</button>
                <button @click="showUE">显示编辑器</button>
                <button @click="setHeight">设置高度为300默认关闭了自动长高</button>
            </div>

            <div>
                <button @click="getLocalData">获取草稿箱内容</button>
                <button @click="clearLocalData">清空草稿箱</button>
            </div>

        </div>
    </v-card>
</template>

<script>
import '../../../static/ueditor/ueditor.config.js'
import '../../../static/ueditor/ueditor.all.js'
import '../../../static/ueditor/lang/zh-cn/zh-cn.js'
export default {
    name: 'editorpage_index',
    data() {
        return {
            editor: null,
            config: {
                //可以在此处定义工具栏的内容
                // toolbars: [
                //  ['fullscreen', 'undo', 'redo','|','bold', 'italic', 'underline',
                //  '|','superscript','subscript','|', 'insertorderedlist', 'insertunorderedlist',
                //  '|','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify']
                // ],
                autoHeightEnabled: false,
                autoFloatEnabled: true,
                initialContent: '请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                initialFrameWidth: null,
                initialFrameHeight: 450,
                BaseUrl: '',
                UEDITOR_HOME_URL: '/static/ueditor/'
            }
        }
    },
    mounted() {
        //初始化UE
        this.editor = UE.delEditor("editor");
        this.editor = UE.getEditor('editor', this.config);
    },
    destoryed() {
        this.editor.destory();
    },
    methods: {
        getAllHtml() {
            alert(UE.getEditor('editor').getAllHtml())
        },
        getContent() {
            var arr = [];
            arr.push("使用editor.getContent()方法可以获得编辑器的内容");
            arr.push("内容为：");
            arr.push(UE.getEditor('editor').getContent());
            alert(arr.join("\n"));
        },
        setContent(isAppendTo) {
            var arr = [];
            arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
            UE.getEditor('editor').setContent('欢迎使用ueditor', isAppendTo);
            alert(arr.join("\n"));
        },
        getContentTxt() {
            var arr = [];
            arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
            arr.push("编辑器的纯文本内容为：");
            arr.push(UE.getEditor('editor').getContentTxt());
            alert(arr.join("\n"));
        },
        getPlainTxt() {
            var arr = [];
            arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
            arr.push("内容为：");
            arr.push(UE.getEditor('editor').getPlainTxt());
            alert(arr.join('\n'))
        },
        hasContent() {
            var arr = [];
            arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
            arr.push("判断结果为：");
            arr.push(UE.getEditor('editor').hasContents());
            alert(arr.join("\n"));
        },
        setFocus() {
            UE.getEditor('editor').focus();
        },
        isFocus(e) {
            alert(UE.getEditor('editor').isFocus());
            UE.dom.domUtils.preventDefault(e)
        },
        setblur(e) {
            UE.getEditor('editor').blur();
            UE.dom.domUtils.preventDefault(e)
        },
        getText() {
            //当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
            var range = UE.getEditor('editor').selection.getRange();
            range.select();
            var txt = UE.getEditor('editor').selection.getText();
            alert(txt)
        },
        insertHtml() {
            var value = prompt('插入html代码', '');
            UE.getEditor('editor').execCommand('insertHtml', value)
        },
        setEnabled() {
            UE.getEditor('editor').setEnabled();
        },
        setDisabled() {
            UE.getEditor('editor').setDisabled('fullscreen');
        },
        hideUE() {
            UE.getEditor('editor').setHide()
        },
        showUE() {
            UE.getEditor('editor').setShow()
        },
        setHeight() {
            UE.getEditor('editor').setHeight(300)
        },
        getLocalData() {
            alert(UE.getEditor('editor').execCommand("getlocaldata"));
        },
        clearLocalData() {
            UE.getEditor('editor').execCommand("clearlocaldata");
            alert("已清空草稿箱")
        }
    }
};
</script>

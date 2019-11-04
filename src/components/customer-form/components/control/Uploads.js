export default (_self, h) => {
    return [
        h('uploadCustom', {
            props: {
                multiple: _self.obj.multiple || false,
                type: 'drag', //支持拖拽
                action: _self.obj.uploadAction || "/imageupload",
                'max-size': _self.obj.maxSize || 2048,
                defaultList: _self.obj.value,
                fileFormat: _self.obj.fileFormat,
                name: 'photo'
            },
            on: {
                handleUploadsValue(arr) {
                    _self.obj.value = arr;
                    _self.$emit('handleChangeVal', arr)
                }
            }
        })
    ]
}


export const uploadsConf = {
    // 对应数据库内类型
    type: 'uploads',
    // 是否可配置
    config: true,
    // 上传地址
    uploadAction: 'https://jsonplaceholder.typicode.com/posts/',
    // 是否必填
    require: false,
    // 控件左侧label内容
    label: '上传控件',
    // 上传文件最大限制
    maxSize: 2048,
    // 绑定的值
    value: [],
    //配置支持的文件类型
    fileFormatLists: ['jpg', 'jpeg', 'png', 'gif', 'txt', 'doc', 'xls', 'ppt', 'docx', 'xlsx', 'pptx', 'pdf', 'zip', 'rar', '7z', 'mp3', 'mp4', 'flv', 'av1', 'wmv', 'rm', 'mpg', 'mpeg'],
    //支持的文件类型
    fileFormat: ['jpg', 'jpeg', 'png'],
    // 表单name
    name: '',
    // 验证错误提示信息
    ruleError: '请上传图片',
    // 是否被渲染
    visibility: true
}
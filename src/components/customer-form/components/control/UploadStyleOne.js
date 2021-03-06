export default (_self, h) => {
    return [
        h('uploadstyleones', {
            props: {
                uploadAction: _self.obj.uploadAction,
                maxSize: _self.obj.maxSize,
                defaultList: _self.obj.value,
                fileFormat: _self.obj.fileFormat,
                customFileFormat: _self.obj.customFileFormat,
                uploadAdminName: _self.obj.uploadAdminName
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


export const uploadstyleoneConf = {
    // 对应唯一的控件
    uid: '',
    // 对应数据库内类型
    type: 'uploadstyleone',
    // 是否可配置
    config: true,
    // 上传地址
    uploadAction: '//jsonplaceholder.typicode.com/posts/', //'https://www.mocky.io/v2/5cc8019d300000980a055e76', 
    // 是否必填
    require: false,
    // 控件左侧label内容
    label: '上传文件',
    // 上传文件最大限制
    maxSize: 2048,
    // 绑定的值
    value: [],
    //支持的文件类型
    fileFormat: ['.jpg', '.jpeg', '.png', '.gif'],
    //自定义文件类型
    customFileFormat: '',
    // 表单name
    name: '',
    // 验证错误提示信息
    ruleError: '请上传文件',
    // 是否被渲染
    visibility: true,
    // 栅格
    gridspan: 24,
    // 发到后台的文件参数名
    uploadAdminName: "file"
}
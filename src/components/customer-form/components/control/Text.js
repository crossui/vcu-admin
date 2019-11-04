export default (_self, h) => {
    return [
        h("VTextarea", {
            props: {
                rows: _self.obj.maxRows || 5,
                type: "textarea",
                placeholder: _self.obj.placeholder || "这是一个文本域",
                defaultValue: _self.obj.value || "",
                maxlength: _self.obj.maxLength || 200
            },
            on: {
                "on-change" (event) {
                    _self.obj.value = event.currentTarget.value;
                    _self.$emit('handleChangeVal', event.currentTarget.value)
                }
            }
        })
    ];
};

export let textConf = {
    // 对应唯一的控件
    uid: '',
    // 对应数据库内类型
    type: 'text',
    // 是否可配置
    config: true,
    // 控件左侧label内容
    label: '文本域',
    placeholder: '',
    // 是否显示行内元素
    inlineBlock: false,
    // 最大长度
    maxLength: 200,
    // 是否必填
    require: false,
    // 文本域行高 
    maxRows: 5,
    // 绑定的值
    value: "",
    // 表单name
    name: '',
    // 验证错误提示信息
    ruleError: '该字段不能为空',
    // 是否被渲染
    visibility: true
}
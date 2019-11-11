export default (_self, h) => {
    return [
        h("VTextarea", {
            props: {
                autosize: { minRows: _self.obj.minRows, maxRows: _self.obj.maxRows },
                placeholder: _self.obj.placeholder,
                defaultValue: _self.obj.value,
                maxlength: _self.obj.maxLength
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
    placeholder: '这是一个文本域',
    // 栅格
    gridspan: 24,
    // 最大长度
    maxLength: 200,
    // 是否必填
    require: false,
    // 自适应内容最小高度
    minRows: 1,
    // 自适应内容最大高度 
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
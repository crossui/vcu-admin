export default (_self, h) => {
    return [
        h("VInput", {
            props: {
                placeholder: _self.obj.placeholder,
                maxlength: parseInt(_self.obj.maxLength) || 20,
                defaultValue: _self.obj.value || ""
            },
            on: {
                "on-change": function(val) {
                    _self.obj.value = event.currentTarget.value;
                    _self.$emit('handleChangeVal', val.currentTarget.value)
                }
            }
        })
    ];
};


export let inputConf = {
    // 对应唯一的控件
    uid: '',
    // 对应数据库内类型
    type: 'input',
    // 是否可配置
    config: true,
    // 控件左侧label内容
    label: '输入框',
    placeholder: '这是一个输入框',
    // 栅格
    gridspan: 24,
    // 是否必填
    require: false,
    // 最大长度
    maxLength: 20,
    value: '',
    // 表单name
    name: '',
    // 验证错误提示信息
    ruleError: `该字段不能为空`,
    // 是否被渲染
    visibility: true
}
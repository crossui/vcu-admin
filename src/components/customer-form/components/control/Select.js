export default (_self, h) => {
    return [
        h(
            "selects", {
                props: {
                    placeholder: _self.obj.placeholder,
                    defaultValue: _self.obj.value,
                    modeType: _self.obj.modeType,
                    plainOptions: _self.obj.items,
                    optionsType: _self.obj.optionsType,
                    dataSourceUrl: _self.obj.dataSourceUrl,
                    dataSourceType: _self.obj.dataSourceType
                },
                style: {
                    width: '100%'
                },
                on: {
                    handleChangeValue(value) {
                        _self.obj.value = value;
                        _self.$emit('handleChangeVal', value)
                    }
                }
            })
    ];
};

export let selectConf = {
    // 对应唯一的控件
    uid: '',
    // 对应数据库内类型
    type: 'select',
    // 是否可配置
    config: true,
    // 控件左侧label内容
    label: '下拉框',
    placeholder: '这是一个下拉选项框',
    // 栅格
    gridspan: 24,
    // 是否必填
    require: false,
    // 选项内数据
    items: [{
        value: "1",
        label: "下拉框1"
    }, {
        value: "2",
        label: "下拉框2"
    }],
    // 绑定的值
    value: "",
    // 表单name
    name: '',
    // 验证错误提示信息
    ruleError: '请选择',
    // 是否关联字段
    relation: false,
    // 关联字段name
    relation_name: '',
    // 关联字段value
    relation_value: '',
    // 是否被渲染
    visibility: true,
    // 数据(自定义/来源)
    optionsType: "1",
    // 远程来源数据地址
    dataSourceUrl: '',
    // 远程来源数据请求方式
    dataSourceType: 'GET',
    // Select 的模式
    modeType: 'default' //'default' | 'multiple'
}
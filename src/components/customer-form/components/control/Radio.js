export default (_self, h) => {
    return [
        h("radios", {
            props: {
                plainOptions: _self.obj.items,
                defaultValue: _self.obj.value,
                optionsType: _self.obj.optionsType,
                dataSourceUrl: _self.obj.dataSourceUrl,
                dataSourceType: _self.obj.dataSourceType
            },
            on: {
                'on-change' (value) {
                    _self.obj.value = value;
                    _self.$emit('handleChangeVal', value)
                }
            }
        })
    ];
};

export let radioConf = {
    // 对应唯一的控件
    uid: '',
    // 对应数据库内类型
    type: 'radio',
    // 是否可配置
    config: true,
    // 控件左侧label内容
    label: '单选框',
    // 栅格
    gridspan: 24,
    // 是否必填
    require: false,
    // 绑定的值
    value: [],
    // 选项内数据
    items: [{
        value: "1",
        label: "单选框1"
    }, {
        value: "2",
        label: "单选框2"
    }],
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
    dataSourceType: 'GET'
}
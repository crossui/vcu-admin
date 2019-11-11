export default (_self, h) => {
    return [
        h("VCascader", {
            props: {
                placeholder: _self.obj.placeholder,
                options: _self.obj.items, //initData(_self.obj.childrenitems),
                defaultValue: _self.obj.value,
                allowClear: false
            },
            style: {
                width: '100%'
            },
            on: {
                "on-change": function(val, selectedData) {
                    _self.obj.value = val;
                    _self.$emit('handleChangeVal', val)
                }
            }
        })
    ];
};


export let cascaderConf = {
    // 对应唯一的控件
    uid: '',
    // 对应数据库内类型
    type: 'cascader',
    // 是否可配置
    config: true,
    // 控件左侧label内容
    label: '级联选择',
    placeholder: '请选择',
    // 栅格
    gridspan: 24,
    // 是否必填
    require: false,
    // 选项内数据
    items: [{
        value: '1',
        label: '选项1',
        children: [{
            value: '1-1',
            label: '选项1-1',
            children: [{
                value: '1-1-1',
                label: '选项1-1-1',
            }],
        }],
    }, {
        value: '2',
        label: '选项2',
        children: [{
            value: '2-1',
            label: '选项2-1',
            children: [{
                value: '2-1-1',
                label: '选项2-1-1',
            }],
        }],
    }],
    value: [],
    // 表单name
    name: '',
    // 验证错误提示信息
    ruleError: '请选择',
    // 是否被渲染
    visibility: true,
    // 数据(自定义/来源)
    optionsType: "1",
    // 远程来源数据地址
    dataSourceUrl: '',
    // 远程来源数据请求方式
    dataSourceType: 'GET'
}
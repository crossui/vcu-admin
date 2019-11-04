export default (_self, h) => {
    return [
        h(
            "VSelect", {
                props: {
                    placeholder: _self.obj.placeholder || "这是一个下拉选项框",
                    defaultValue: _self.obj.value || 0
                },
                style: {
                    width: '100%'
                },
                on: {
                    'on-change' (value) {
                        _self.obj.value = value;
                        _self.$emit('handleChangeVal', value)
                    }
                }
            },
            _self.obj.items.map(v => {
                return h(
                    "VSelectOption", {
                        props: {
                            value: v.value
                        },
                    },
                    v.label
                );
            })
        )
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
    placeholder: '',
    // 是否显示行内元素
    inlineBlock: false,
    // 是否必填
    require: false,
    // 选项内数据
    items: Array.apply(null, { length: 5 })
        .map((k, v) => {
            return {
                value: v + 1,
                label: "选项" + (v + 1),
            }
        }),
    // 绑定的值
    value: '',
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
    optionsType: 0,
    // 数据源Id
    dataSourceId: ''
}
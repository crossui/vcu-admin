export default (_self, h) => {
    return [
        h("cascaders", {
            props: {
                placeholder: _self.obj.placeholder,
                plainOptions: _self.obj.items,
                defaultValue: _self.obj.value,
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
            key: "1",
            value: "1",
            label: "选项1",
            children: [{
                    key: "11",
                    value: "11",
                    label: "选项11"
                },
                {
                    key: "12",
                    value: "12",
                    label: "选项12"
                }
            ]
        },
        {
            key: "2",
            value: "2",
            label: "选项2"
        }
    ],
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
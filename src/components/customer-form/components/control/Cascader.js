export default (_self, h) => {
    return [
        h("VCascader", {
            props: {
                placeholder: _self.obj.placeholder || "请选择",
                options: _self.obj.childrenitems, //initData(_self.obj.childrenitems),
                defaultValue: _self.obj.value || []
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


const initData = (items) => {
    console.info(items)
    return items.map((k, v) => {
        return {
            value: k.value,
            label: k.label,
            children: k.children != undefined ? initData(k.children) : null
        }
    })
}

export let CascaderConf = {
    // 对应唯一的控件
    uid: '',
    // 对应数据库内类型
    type: 'cascader',
    // 是否可配置
    config: true,
    // 控件左侧label内容
    label: '级联选择',
    placeholder: '请选择',
    // 是否显示行内元素
    inlineBlock: false,
    // 是否必填
    require: false,
    // 数据(自定义/来源)
    optionsType: 0,
    // 数据源Id
    dataSourceId: '',
    // 选项内数据
    /* childrenitems: Array.apply(null, { length: 5 })
        .map((k, v) => {
            return {
                value: v + 1,
                label: "选项" + (v + 1),
                children: Array.apply(null, { length: 5 })
                    .map((j, m) => {
                        return {
                            value: m + 11,
                            label: "选项" + (v + 11),
                        }
                    })
            }
        }), */
    childrenitems: [{
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [{
                value: 'xihu',
                label: 'West Lake',
            }],
        }],
    }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [{
            value: 'nanjing',
            label: 'Nanjing',
            children: [{
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
            }],
        }],
    }],
    value: [],
    // 表单name
    name: '',
    // 验证错误提示信息
    ruleError: '请选择',
    // 是否被渲染
    visibility: true
}
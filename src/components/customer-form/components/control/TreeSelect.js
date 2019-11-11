export default (_self, h) => {
    return [
        h(
            "VTreeSelect", {
                props: {
                    placeholder: _self.obj.placeholder || "请选择",
                    defaultValue: _self.obj.value,
                    dropdownStyle: { maxHeight: '400px', overflow: 'auto' },
                    allowClear: 　true,
                    multiple: _self.obj.multiple,
                    treeData: _self.obj.items
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
            }
        )
    ];
};

export let treeselectConf = {
    // 对应唯一的控件
    uid: '',
    // 对应数据库内类型
    type: 'treeselect',
    // 是否可配置
    config: true,
    // 控件左侧label内容
    label: '树型下拉框',
    placeholder: '',
    // 栅格
    gridspan: 24,
    // 是否必填
    require: false,
    // 选项内数据
    items: [{
        label: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [{
            label: 'Child Node1',
            value: '0-0-0',
            key: '0-0-0',
        }],
    }, {
        label: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [{
            label: 'Child Node3',
            value: '0-1-0',
            key: '0-1-0',
            disabled: true,
        }, {
            label: 'Child Node4',
            value: '0-1-1',
            key: '0-1-1',
        }, {
            label: 'Child Node5',
            value: '0-1-2',
            key: '0-1-2',
        }],
    }],
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
    dataSourceId: '',
    // 支持多选
    multiple: false
}
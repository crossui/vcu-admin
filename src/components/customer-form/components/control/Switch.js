export default (_self, h) => {
    return [
        h("VSwitch", {
            props: {
                value: _self.obj.value
            },
            on: {
                "on-change": function(val) {
                    _self.obj.value = val;
                    _self.$emit('handleChangeVal', val)
                }
            }
        })
    ];
};


export let switchonoffConf = {
    // 对应唯一的控件
    uid: '',
    // 对应数据库内类型
    type: 'switchonoff',
    // 是否可配置
    config: true,
    // 控件左侧label内容
    label: '开关',
    // 是否显示行内元素
    inlineBlock: false,
    value: false,
    // 表单name
    name: '',
    // 是否被渲染
    visibility: true
}
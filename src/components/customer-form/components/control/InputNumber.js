export default (_self, h) => {
    return [
        h("VInputNumber", {
            props: {
                defaultValue: _self.obj.value,
                max: _self.obj.max,
                min: _self.obj.min,
                step: _self.obj.step,
                precision: _self.obj.precision
            },
            style: {
                width: '100%'
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


export let inputNumberConf = {
    // 对应唯一的控件
    uid: '',
    // 对应数据库内类型
    type: 'inputNumber',
    //最大值
    max: 100,
    //最小值
    min: 1,
    //每次改变的步伐，可以是小数
    step: 1,
    //数值精度
    precision: 0,
    // 是否可配置
    config: true,
    // 控件左侧label内容
    label: '数字框',
    // 栅格
    gridspan: 24,
    // 是否必填
    require: false,
    value: null,
    // 表单name
    name: '',
    // 验证错误提示信息
    ruleError: '该字段不能为空',
    // 是否被渲染
    visibility: true
}
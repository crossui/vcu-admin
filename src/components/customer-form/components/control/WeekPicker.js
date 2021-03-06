import moment from 'moment';

export default (_self, h) => {
    return [
        h('VWeekPicker', {
            props: {
                placeholder: _self.obj.placeholder || (_self.obj.name ? "" : "请选择周"),
                defaultValue: _self.obj.value == "" ? null : moment(_self.obj.value, "yyyy-mm")
            },
            style: {
                width: '100%'
            },
            on: {
                "on-change" (arr) {
                    _self.obj.value = arr;
                    _self.$emit('handleChangeVal', arr)
                }
            }
        })
    ]
}

export let weekPickerConf = {
    // 对应唯一的控件
    uid: '',
    // 对应数据库内类型
    type: 'weekpicker',
    // 是否可配置
    config: true,
    // 控件左侧label内容
    label: '周',
    placeholder: '请选择周',
    // 栅格
    gridspan: 24,
    // 是否必填
    require: false,
    // 表单name
    name: '',
    // 绑定的值
    value: "",
    // 验证错误提示信息
    ruleError: '选项不能为空',
    // 是否被渲染
    visibility: true
}
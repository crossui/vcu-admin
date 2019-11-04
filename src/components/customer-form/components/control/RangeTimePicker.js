import moment from 'moment';

export default (_self, h) => {
    return [
        h('VRangePicker', {
            props: {
                format: _self.obj.format,
                showTime: { format: 'HH:mm:ss' },
                defaultValue: _self.obj.value == "" ? null : moment(_self.obj.value, _self.obj.format)
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

export let rangetimePickerConf = {
    // 对应唯一的控件
    uid: '',
    // 对应数据库内类型
    type: 'rangepicker',
    // 是否可配置
    config: true,
    // 控件左侧label内容
    label: '日期时间范围',
    placeholder: '请选择日期时间范围',
    // 是否显示行内元素
    inlineBlock: false,
    // 是否必填
    require: false,
    // 表单name
    name: '',
    // 绑定的值
    value: "",
    // 验证错误提示信息
    ruleError: '选项不能为空',
    // 是否被渲染
    visibility: true,
    //时间格式
    format: "YYYY-MM-DD HH:mm:ss"
}
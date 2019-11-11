import { pcaa } from 'area-data';

let $seft = null;

const createData = (val) => {
    let res = []
    for (const p in val) {
        let item = {
            value: p,
            label: val[p]
        };
        res.push(item);
    }
    return res
};

const initCityData = () => {
    let proitem = createData(pcaa['86'])
    if ($seft.obj.addressShowLevel > 1) {
        proitem.map((item) => {
            item.children = createData(pcaa[item.value])
            if ($seft.obj.addressShowLevel > 2) {
                item.children.map((chiditem) => {
                    chiditem.children = createData(pcaa[chiditem.value])
                })
            }
            return item
        })
    }
    return proitem
};
export default (_self, h) => {
    $seft = _self;
    return [
        h("VCascader", {
            props: {
                placeholder: _self.obj.placeholder || (_self.obj.name ? "" : "请选择详细地址"),
                options: initCityData(),
                defaultValue: _self.obj.value || []
            },
            style: {
                width: '100%'
            },
            on: {
                "on-change" (arr) {
                    _self.obj.value = arr;
                    _self.$emit('handleChangeVal', arr);
                }
            }
        })
    ]
}
export let addressConf = {
    // 对应唯一的控件
    uid: '',
    // 对应数据库内类型
    type: 'address',
    // 是否可配置
    config: true,
    // 控件左侧label内容
    label: '详细地址',
    placeholder: '请输入详细地址',
    // 栅格
    gridspan: 24,
    // 是否必填
    require: false,
    // 表单name
    name: '',
    // 绑定的值
    value: [],
    // 验证错误提示信息
    ruleError: '请选择并输入详细地址',
    // 是否关联字段
    relation: false,
    // 关联字段name
    relation_name: '',
    // 关联字段value
    relation_value: '',
    // 是否被渲染
    visibility: true,
    // 显示城市数据层级
    addressShowLevel: "3"
}
import ItemIcon from './ItemIcon';
import input from './control/Input';
import inputnumber from './control/InputNumber';
import checkbox from './control/CheckBox';
import radio from './control/Radio';
import select from './control/Select';
import treeselect from './control/TreeSelect';
import cascader from './control/Cascader';
import text from './control/Text';
import datepicker from './control/DatePicker';
import monthpicker from './control/MonthPicker';
import weekpicker from './control/WeekPicker';
import rangepicker from './control/RangePicker';
import timepicker from './control/TimePicker';
import datetimepicker from './control/DateTimePicker';
import rangetimepicker from './control/RangeTimePicker';
import address from './control/Address';
import hr from './control/Hr';
import switchonoff from './control/Switch';
import uploadfiles from './control/UploadFiles';
import uploadpics from './control/UploadPics';
import title from './control/Title';
import p from './control/P';

import trigger from './config/trigger';
//
import checkboxs from './components/CheckBox/checkboxs';
import radios from './components/Radio/radios';
import selects from './components/Select/selects';
import cascaders from './components/Cascader/cascaders';
import treeselects from './components/TreeSelect/treeselects';
import uploadFiles from "./components/Uploads/uploadFiles";
import uploadPics from "./components/Uploads/uploadPics";

const form_item = {
    hr,
    input,
    inputnumber,
    select,
    treeselect,
    cascader,
    radio,
    checkbox,
    datepicker,
    monthpicker,
    weekpicker,
    rangepicker,
    timepicker,
    datetimepicker,
    rangetimepicker,
    text,
    uploadfiles,
    uploadpics,
    switchonoff,
    address,
    title,
    p,
    //
    checkboxs,
    radios,
    selects,
    cascaders,
    uploadFiles,
    uploadPics,
    treeselects
};

export default {
    name: 'renders',
    components: {
        uploadFiles,
        uploadPics,
        checkboxs,
        radios,
        selects,
        cascaders,
        treeselects
    },
    render(h) {
        // 获取当前控件渲染
        const arr = (form_item[this.ele.toLowerCase()] && form_item[this.ele.toLowerCase()](this, h)) || [];
        // 拥有绑定的值，需回填到控件
        this.$set(this.obj, 'value', typeof this.value !== "undefined" ? this.value : this.obj.value);
        // 显示配置按钮并且控件允许被配置
        const item_icon = this.configIcon && this.obj.config ? ItemIcon(this, h) : [];
        // 已被绑定name,且require为必填,视为校验字段
        const validate = !!this.obj.require;

        if (!this.obj.visibility) {
            return h("<span></span>");
        }
        // 非 Title Hr P 需要FormItem
        if (['title', 'hr', 'p'].indexOf((this.ele.toLowerCase())) < 0) {
            let VFormItem = {
                class: {
                    'items': true,
                    'vcu-form-item-required': validate
                },
                props: {
                    label: (this.obj.label || this.ele) + '：',
                    // 指定验证name
                    prop: this.obj.name || "temp",
                    // 验证规则
                    rules: {
                        required: validate,
                        message: this.obj.ruleError || '该项为必填项',
                        trigger: trigger[this.obj.type],
                        validator: (rule, value, callback) => {
                            // 没有配置按钮并且允许验证
                            if (!this.configIcon && validate && (Array.isArray(value) ? !value.length : !value)) {
                                callback(new Error('该项为必填项'));
                            } else {
                                callback();
                            }
                        }
                    },
                },
                /*  style: {
                     // 是否显示行内元素
                     display: this.obj.inlineBlock ? 'inline-block' : 'block',
                     // 行内元素width为30%
                     width: this.obj.inlineBlock ? '33%' : 'auto',
                 } */
            };
            return h(
                "VFormItem", VFormItem,
                arr.concat(item_icon)
            );
        } else {
            return h(
                "div", {
                    style: {
                        'position': 'relative'
                    },
                    class: {
                        items: true
                    },
                },
                arr.concat(item_icon)
            );
        }
    },
    props: {
        // 当前控件的类型
        ele: {
            type: String,
            default: "input"
        },
        // 当前控件的配置
        obj: {
            type: Object,
            default () {
                return {};
            }
        },
        // 当前控件的index,config 和 delete 会用到
        index: {
            type: Number,
            default: 0
        },
        // 整个表单的数据
        data: {
            type: Object,
            default () {
                return {}
            }
        },
        // 是否显示配置按钮
        configIcon: {
            type: Boolean,
            default: false
        },
        // 当前控件绑定的值 方便数据回填
        value: [String, Number, Array],
        // 当前被clone控件列表
        sortableItem: {
            type: Array,
            default () {
                return [];
            }
        }
    }
}
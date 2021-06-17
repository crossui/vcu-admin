import inputCtl from './Input.jsx';
import selectCtl from './Select.jsx';
import dateTimeCtl from './DateTime.jsx';
import checkboxCtl from './Checkbox.jsx';
import radioCtl from './Radio.jsx';
import autoTypewritCtl from './AutoTypewrit.jsx';

export default {
    name: 'renders',
    components: {
        inputCtl,
        selectCtl,
        dateTimeCtl,
        checkboxCtl,
        radioCtl,
        autoTypewritCtl
    },
    watch: {
        value(val) {
            this.inputValue = val
        }
    },
    render() {
        const {
            obj,
            loadFormDataVal,
            size
        } = this;
        switch (obj.uiComponentType) {
            case "dateTime":
                return (<dateTimeCtl v-model={this.inputValue} obj={obj} size={size} loadFormData={loadFormDataVal} />)
                break;
            case "select":
                return (<selectCtl v-model={this.inputValue} obj={obj} size={size} loadFormData={loadFormDataVal} />)
                break;
            case "input":
                return (<inputCtl v-model={this.inputValue} obj={obj} size={size} loadFormData={loadFormDataVal} />)
                break;
            case "checkbox":
                return (<checkboxCtl v-model={this.inputValue} obj={obj} loadFormData={loadFormDataVal} />)
                break;
            case "radio":
                return (<radioCtl v-model={this.inputValue} obj={obj} loadFormData={loadFormDataVal} />)
                break;
            case "autoTypewrit":
                return (<autoTypewritCtl v-model={this.inputValue} obj={obj} size={size} loadFormData={loadFormDataVal} />)
                break;
            default:
                return (<div>暂不支持当前控件</div>)
                break;
        }
    },
    props: {
        loadFormData: {
            type: Object,
            default() {
                return {};
            }
        },
        // 当前控件的配置
        obj: {
            type: Object,
            default() {
                return {};
            }
        },
        size: {
            type: String,
            default: "default"
        },
        // 当前控件绑定的值 方便数据回填
        value: [String, Number, Boolean, Array, Object],
    },
    computed: {
        inputValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit("input", val)
            }
        },
        loadFormDataVal() {
          return _.merge({}, this.loadFormData);
        }
    },
    data() {
        return {
        }
    }
}
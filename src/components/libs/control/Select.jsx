import request from "@/utils/request.js";
export default {
    render() {
        const {
            handleChange,
            selectOption,
            obj,
            size
        } = this
        const selectProps = {
            style: {
                width: "100%"
            },
            props: {
                size,
                allowClear: false,
                disabled: obj.disabled,
                placeholder: obj.placeholder,
                dropdownClassName: "edit-cell-popper",
                getPopupContainer: this.getPopupContainer()
            },
            on: {
                change: handleChange
            }
        }
        return (
            <v-select v-model={this.inputValue}  {...selectProps} >
                {obj.selectIsAll && obj.selectIsAll == "true" ? <v-select-option value="" key="selectAll">全部</v-select-option> : null}
                {selectOption.map((item, index) => {
                    return (
                        <v-select-option value={item.key ? item.key : item.KEY} key={index}>
                            {item.value ? item.value : item.VALUE}
                        </v-select-option>
                    )
                })}
            </v-select >
        )
    },
    watch: {
        value(val) {
            this.inputValue = val
        }
    },
    props: {
        itemLoadType: {
            type: Object,
            default() {
                return {};
            }
        },
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
        value: [String, Number, Array]
    },
    computed: {
        inputValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit("input", val)
            }
        }
    },
    data() {
        return {
            selectOption: [],
            formData: {},
            ajaxType: "POST"
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            for (let key in this.loadFormData) {
                if (key == this.obj.name) {
                    this.formData = _.merge({}, this.formData, this.loadFormData[key].formData)
                    this.ajaxType = this.loadFormData[key].ajaxType != undefined ? this.loadFormData[key].ajaxType : this.ajaxType
                }
            }

            if (this.obj.selectType == "0") {
                //配置固定字典
                this.selectOption = this.obj.data
            } else if (this.obj.selectType == "1") {
                //静态字典
            } else {
                //动态字典
                let options = await this.getSelectOption(this.obj.selectDictUrl, this.obj.selectDictContent)
                let key = this.getKeyName();
                if (this.loadFormData[key] && _.isFunction(this.loadFormData[key].onLoadData)) {
                    this.loadFormData[key].onLoadData(options)
                }
                this.selectOption = options
            }
        },
        getPopupContainer() {
            if (this.obj.transfer) return;
            return triggerNode => triggerNode.parentNode;
        },
        getKeyName() {
            let keyName = ""
            for (let key in this.loadFormData) {
                if (key == this.obj.name) {
                    keyName = key
                }
            }
            return keyName;
        },
        handleChange(value, option) {
            let key = this.getKeyName();
            if (this.loadFormData[key] && _.isFunction(this.loadFormData[key].onChange)) {
                this.loadFormData[key].onChange(value)
            }
            this.$emit("input", value)
        },
        async getSelectOption(url, content) {
            let params = {
                zdmc: content,
                zdbm: content,
                ...this.formData
            }
            let _data =
                _.toUpper(this.ajaxType) == "POST" ? { data: params } : { params };
            let res = await request({
                method: this.ajaxType,
                url,
                ..._data
            });

            if (res) {
                return res.data.payload.data
            } else {
                return []
            }
        }
    }
}
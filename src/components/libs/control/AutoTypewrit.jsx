import autoTypewrit from "@/components/busines/autoTypewrit";
export default {
    components: {
        autoTypewrit
    },
    render() {
        const {
            handleChange,
            loadOptions,
            obj,
            size
        } = this

        const autoTypewritProps = {
            props: {
                autoInputValue: obj.autoInputValue,
                disabled: obj.disabled,
                loadOptions,
                placeholder: obj.placeholder,
                size,
                isAllowInput: obj.isAllowInput == "false" ? false : true,
                modalWidth: `${obj.dynamicDictWidth}px`,
                transfer: obj.transfer,
                popperClassName: "edit-cell-popper"
            },
            on: {
                selectSubmit: handleChange
            }
        }
        return (
            <autoTypewrit
                v-model={this.autoTypewritValue}
                {...autoTypewritProps}
            />
        )
    },
    watch: {
        value(val) {
            if (val) {
                this.autoTypewritValue = val[this.obj.dynamicDictValueName]
            } else {
                this.autoTypewritValue = ""
            }
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
        value: [String, Array, Object]
    },
    computed: {
    },
    data() {
        return {
            autoTypewritValue: "",
            loadOptions: {
                headUrl: "",
                listUrl: "",
                formData: {}
            }
        }
    },
    mounted() {
        this.loadOptions.headUrl = `dataq/api/header/${this.obj.dynamicDictUrl}`
        this.loadOptions.listUrl = `dataq/api/page/${this.obj.dynamicDictUrl}`
        for (let key in this.loadFormData) {
            if (key == this.obj.name) {
                this.loadOptions.formData = _.merge({}, this.loadOptions.formData, this.loadFormData[key].formData)
            }
        }
        this.autoTypewritValue = typeof(this.value) == "string" ? this.value : ""
    },
    methods: {
        handleChange(row) {
            for (let key in this.loadFormData) {
                if (key == this.obj.name) {
                    if (_.isFunction(this.loadFormData[key].onChange)) {
                        this.loadFormData[key].onChange(row)
                    }
                }
            }
            this.$emit("input", row)
        }
    }
}
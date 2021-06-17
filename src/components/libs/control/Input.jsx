export default {
    render() {
        const {
            obj,
            size
        } = this
        const inputProps = {
            props: {
                disabled: obj.disabled,
                placeholder: obj.placeholder,
                allowClear: true,
                size: size
            },
            on: {
                keyup: this.handleChange
            }
        }
        return (
            <v-input v-model={this.inputValue} {...inputProps} />
        )
    },
    watch: {
        value(val) {
            this.inputValue = val
        }
    },
    props: {
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
        value: [String],
        loadFormData: {
            type: Object,
            default() {
                return {};
            }
        }
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
        }
    },
    methods: {
        handleChange(e) {
            for (let key in this.loadFormData) {
                if (key == this.obj.name) {
                    if (_.isFunction(this.loadFormData[key].onChange)) {
                        this.loadFormData[key].onChange(this.inputValue)
                    }
                }
            }
        }
    }
}
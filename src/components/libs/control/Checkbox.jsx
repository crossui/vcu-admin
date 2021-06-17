export default {
    render() {
        const {
            handleChange,
            obj
        } = this


        const checkGruopProps = {
            style: {
                width: "100%"
            },
            props: {
            },
            on: {
                change: handleChange
            }
        }
        return (
            <v-checkbox-group {...checkGruopProps} v-model={this.inputValue}>
                {obj.data.map(item => {
                    return (<v-checkbox disabled={obj.disabled} value={item.key ? item.key : item.KEY}>{item.value ? item.value : item.VALUE}</v-checkbox>)
                })}
            </v-checkbox-group>
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
        value: [String, Array],
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
    mounted() {
    },
    methods: {
        handleChange(value) {
            for (let key in this.loadFormData) {
                if (key == this.obj.name) {
                    if(_.isFunction(this.loadFormData[key].onChange)){
                        this.loadFormData[key].onChange(value)
                    }                    
                }
            }
            this.$emit("input", value)
        }
    }
}
export default {
    render() {
        const {
            handleChange,
            obj
        } = this


        const radioGruopProps = {
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
            <v-radio-group {...radioGruopProps} v-model={this.inputValue}>
                {obj.data.map(item => {
                    return (<v-radio disabled={obj.disabled} value={item.key ? item.key : item.KEY}>{item.value ? item.value : item.VALUE}</v-radio>)
                })}
            </v-radio-group>
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
        handleChange(e) {
            for (let key in this.loadFormData) {
                if (key == this.obj.name) {
                    if(_.isFunction(this.loadFormData[key].onChange)){
                        this.loadFormData[key].onChange(e.target.value)
                    }                    
                }
            }
        }
    }
}
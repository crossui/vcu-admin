
export default {
    render() {
        const {
            dateTimeOption,
            obj,
            size
        } = this;
        const dateTimeProps = {
            props: {
                dateTimeOptions: dateTimeOption,
                size,
                transfer: obj.transfer,
                interval: parseInt(obj.dateTimeInterval),
                dropdownClassName: "edit-cell-popper"
            }
        };
        return (
            <dateTime v-model={this.inputValue} {...dateTimeProps} />
        )
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
        value: [Object],
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
                this.handleChange(val)
                this.$emit("input", val)
            }
        }
    },
    data() {
        return {
            dateTimeOption: null
        }
    },
    watch: {
        loadFormData() {
            this.initDateTimeOption()
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.initDateTimeOption()
        },
        initDateTimeOption() {
            const _options = this.getDateTimeOption()
            if (_options) {
                this.dateTimeOption = _options
            } else {
                switch (this.obj.dateTimeType) {
                    case "5":
                        this.dateTimeOption = {
                            startDate: {
                                isShow: false
                            },
                            startTime: {
                                disabled: this.obj.disabled
                            },
                            endDate: {
                                isShow: false
                            },
                            endTime: {
                                isShow: false
                            }
                        }
                        break;
                    case "4":
                        this.dateTimeOption = {
                            startDate: {
                                disabled: this.obj.disabled
                            },
                            startTime: {
                                isShow: false
                            },
                            endDate: {
                                isShow: false
                            },
                            endTime: {
                                isShow: false
                            }
                        }
                        break;
                    case "3":
                        this.dateTimeOption = {
                            startDate: {
                                disabled: this.obj.disabled
                            },
                            startTime: {
                                disabled: this.obj.disabled
                            },
                            endDate: {
                                isShow: false
                            },
                            endTime: {
                                isShow: false
                            }
                        }
                        break;
                    case "2":
                        this.dateTimeOption = {
                            startDate: {
                                isShow: false,
                            },
                            startTime: {
                                disabled: this.obj.disabled
                            },
                            endDate: {
                                isShow: false,
                            },
                            endTime: {
                                disabled: this.obj.disabled
                            }
                        }
                        break;
                    case "1":
                        this.dateTimeOption = {
                            startDate: {
                                disabled: this.obj.disabled
                            },
                            startTime: {
                                isShow: false,
                            },
                            endDate: {
                                disabled: this.obj.disabled
                            },
                            endTime: {
                                isShow: false,
                            }
                        }
                        break;
                    default:
                        this.dateTimeOption = {
                            startDate: {
                                disabled: this.obj.disabled
                            },
                            startTime: {
                                disabled: this.obj.disabled
                            },
                            endDate: {
                                disabled: this.obj.disabled
                            },
                            endTime: {
                                disabled: this.obj.disabled
                            }
                        }
                        break;
                }
            }


        },
        getDateTimeOption() {
            for (let key in this.loadFormData) {
                if (key == this.obj.name) {
                    if (this.loadFormData[key].dateTimeOption) {
                        return this.loadFormData[key].dateTimeOption
                    }
                }
            }
            return false
        },
        handleChange(val) {
            for (let key in this.loadFormData) {
                if (key == this.obj.name) {
                    if (_.isFunction(this.loadFormData[key].onChange)) {
                        this.loadFormData[key].onChange(val)
                    }
                }
            }
        }
    }
}
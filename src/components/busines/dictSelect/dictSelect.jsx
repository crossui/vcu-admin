import './index.less';
import Uuid from "uuid";
import request from "@/utils/request.js";

export default {
  name: "dictSelect",
  props: {
    value: {
      type: [String, Number, Array]
    },
    optGroup: {
      type: Object,
      default() {
        return {}
      }
    },
    selectProps: {
      type: Object,
      default() {
        return {}
      }
    },
    selectEvent: {
      type: Object,
      default() {
        return {}
      }
    },
    url: {
      type: String,
      default: "",
      required: true
    },
    ajaxType: {
      type: String,
      default: "POST"
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    loadNodes: {
      type: Function
    }
  },
  watch: {
    value(val) {
      this.selectValue = val;
    },
    selectValue(val) {
      this.$emit("input", val);
    }
  },
  computed: {
    selectOptGroup() {
      let option = {
        keyName: "key",
        labelName: "label"
      };
      return _.merge({}, option, this.optGroup);
    }
  },
  data() {
    return {
      selectValue: this.value,
      uuid: "",
      selectOptions: []
    };
  },
  render() {
    const {
      uuid,
      selectOptions,
      selectProps,
      selectEvent
    } = this;

    const selectProp = {
      ref: `select-${uuid}`,
      props: {
        ...selectProps
      },
      attrs: {},
      on: {
        ...selectEvent
      }
    }
    return (
      <v-select v-model={this.selectValue} {...selectProp} >
        {selectOptions && selectOptions.length ? selectOptions.map((item, index) => {
          return (
            <v-select-option key={index} value={item.key}>
              {item.label}
            </v-select-option>
          )
        }) : null}
      </v-select>
    )
  },
  mounted() {
    this.uuid = Uuid.v1()
    this.init();
  },
  methods: {
    async init() {
      await this.getSelectList()
    },
    //获取数据
    async getSelectList() {
      let params = {
        ...this.formData
      }
      let _data =
        _.toUpper(this.ajaxType) == "POST" ? { data: params } : { params };
      let res = await request({
        method: this.ajaxType,
        url: this.url,
        ..._data
      });
      if (res) {
        this.$emit("onLoad", res);
        if (_.isFunction(this.loadNodes)) {
          this.loadNodes(res, (options) => {
            this.selectOptions = this.mergeOptGroup(options);
          })
        } else {
          this.selectOptions = this.mergeOptGroup(res.data.payload.data);
        }
      } else {
        this.$message.error('获取数据失败请刷新页面');
      }
    },
    mergeOptGroup(data) {
      let options = data.map(item => {
        let newItem = {
          key: item[this.selectOptGroup.keyName],
          label: item[this.selectOptGroup.labelName]
        }
        return _.merge({}, item, newItem);
      });
      return options;
    }
  }
};
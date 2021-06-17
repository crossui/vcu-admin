import renders from "@/components/libs/control/Render.jsx";
export default {
  name: "editCell",
  components: {
    renders
  },
  props: {
    isEditStatus:{
      type: Boolean,
      default: false
    },
    editValue: {
      type: [String, Number, Boolean, Array, Object],
      default: null
    },
    objData: {
      type: Object,
      default: () => { }
    },
    formData: {
      type: Object,
      default: () => { }
    },
    size: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {
      editStatus: this.isEditStatus,
      editVal: this.editValue
    };
  },
  mounted(){
    if(this.isEditStatus) this.handleFocus()
  },
  methods: {
    setEditStatus(b) {
      this.editStatus = b;
    },
    handleTextClick() {
      this.editStatus = true;
    },
    onClickOutside(event) {
      let el = document.getElementsByClassName("edit-cell-popper");
      if (el.length && el[0].contains(event.target)) return;
      this.editStatus = false;
    },
    handleFocus() {
      switch (this.objData.uiComponentType) {
        case "input":
          let inputDom = this.$refs.editCellEdDom.$el
          inputDom && inputDom.focus()
          break
        case "dateTime":
          // return <dateTimeCtl v-model={this.inputValue} obj={obj} size={size} loadFormData={loadFormDataVal} />
          break
        case "select":
          this.$refs.editCellEdDom.$el.focus()
          break
        case "autoTypewrit":
          let autoTypewritDom = this.$refs.editCellEdDom.$el.querySelector("input")
          autoTypewritDom && autoTypewritDom.focus()
          break
      }
    }
  },
  watch: {
    editStatus(val) {
      if (!val) {
        this.$emit("getEditValue", this.editVal)
      } else {
        // 修改自动获取焦点
        this.$nextTick(() => {
          this.handleFocus()
        })
      }
    }
  },
  render() {
    const {
      $scopedSlots,
      editStatus,
      formData,
      objData,
      handleTextClick,
      onClickOutside,
      size
    } = this;

    const wrapDivProps = {
      ref: 'editCellDom',
      style: {
        display: "inline-block",
        width: objData.style && objData.style.width ? objData.style.width + "px" : "100%"
      }
    }

    const textDivProps = {
      ref: 'editCellText',
      on: {
        click: handleTextClick,
      }
    }

    const editProps = {
      ref: 'editCellEdDom',
      props: {
        obj: objData,
        size,
        loadFormData: formData
      },
      class: ["edit-cell-wrap"]
    }

    const editDirectives = {
      directives: [
        {
          name: "click-outside",
          value: onClickOutside
        }
      ]
    }

    const content = () => {
      if (editStatus) {
        return (
          <renders
            v-model={this.editVal}
            {...editProps}
            {...{ ...editDirectives }}
          />
        )
      } else {
        return (<div {...textDivProps}>{$scopedSlots.default ? $scopedSlots.default() : <span>-</span>}</div>)
      }
    }
    return (
      <div {...wrapDivProps}>
        {content()}
      </div>
    )
  }
};

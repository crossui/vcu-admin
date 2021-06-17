<template>
  <fieldset
    class="coolfieldset"
    :class="{'collapsed': collapsed,'is-click':isClick, 'border-top':borderObj.top, 'border-bottom':borderObj.bottom, 'border-left':borderObj.left, 'border-right':borderObj.right}"
  >
    <legend @click="handleClick" :style="{'font-size':`${titleFontSize}px`}">{{title}}</legend>
    <slot v-if="!collapsed"></slot>
  </fieldset>
</template>

<script>
export default {
  name: "fieldsetLegend",
  props: {
    border: {
      type: Object,
      default() {
        return {};
      }
    },
    title: {
      type: String,
      required: true,
      default: ""
    },
    titleFontSize: {
      type: Number,
      default: 14
    },
    isClick: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    borderObj() {
      let option = {
        left: true,
        right: true,
        top: true,
        bottom: true
      };
      return _.merge({}, option, this.border);
    }
  },
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    handleClick(e) {
      if (!this.isClick) return;
      this.collapsed = !this.collapsed;
      this.$emit("click", e, this.collapsed);
    }
  }
};
</script>
<style lang="less">
@import "./index.less";
</style>
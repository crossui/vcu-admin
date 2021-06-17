<template>
  <div class="spinLoading-wrap">
    <div class="vcu-spin-nested-loading">
      <div>
        <div class="vcu-spin vcu-spin-spinning vcu-spin-show-text">
          <span class="vcu-spin-dot vcu-spin-dot-spin">
            <i class="vcu-spin-dot-item"></i>
            <i class="vcu-spin-dot-item"></i>
            <i class="vcu-spin-dot-item"></i>
            <i class="vcu-spin-dot-item"></i>
          </span>
          <div class="vcu-loading-text">{{tipText}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "spinLoading",
  components: {},
  mixins: [],
  props: {
    tipText: {
      type: String,
      default: "数据提交中..."
    }
  },
  watch: {},
  computed: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less">
@import "./index.less";
</style>
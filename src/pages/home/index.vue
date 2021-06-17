<template>
  <div class="welcome-wrap">
    <div class="welcome-text">
      <div>
        <p>
          欢迎
          <em>使用 >></em>
        </p>
        <span>{{title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home_index",
  components: {},
  props: {},
  mixins: [],
  watch: {},
  computed: {},
  data() {
    return {
      title: this.appConfig.title
    };
  },
  created() {},
  mounted() {},
  methods: {},
  activated() {},
  deactivated() {}
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>

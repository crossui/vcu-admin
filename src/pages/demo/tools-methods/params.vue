<template>
  <div>
    <v-card>
      <h2>ID: {{ paramsid }}</h2>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "params_page",
  data() {
    return {
      paramsid: ''
    }
  },
  methods: {
    init() {
      this.paramsid = this.$route.params.id
    }
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
  }
}
</script>

<style>
</style>

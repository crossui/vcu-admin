<template>
  <div>
    <v-card>
      <h2>ID: {{ id }}</h2>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "query_page",
  data() {
    return {
      id: ''
    }
  },
  methods: {
    init() {
      this.id = this.$route.query.id
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

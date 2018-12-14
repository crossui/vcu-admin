<template>
  <v-card class="">
    <v-input />
    <template v-for="item in 100">
      <p>{{item}}</p>
    </template>
  </v-card>
</template>

<script>
export default {
  name: 'level-3-1',
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>

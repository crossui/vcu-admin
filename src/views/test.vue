<template>
  <div>
    <v-button type="primary" @click="handleGet">handleGet</v-button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    async handleGet(){
      let res = await this.http.getUserList({id:1},false,{
        token: '2222'
      })
      console.info(res)
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
</style>

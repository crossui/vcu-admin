<template>
  <div class>
    level-1
    <v-button @click="handleClick" :loading="loading">添加</v-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    handleClick(){
      console.info(222222222)
      this.loading = true
      setTimeout(()=>{
        this.loading = false
      },1000)
    }
  },
};
</script>


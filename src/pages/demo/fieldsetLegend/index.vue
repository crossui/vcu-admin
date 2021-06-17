<template>
  <div>
    <v-card title="方框域">
        <fieldsetLegend title="方框域" :titleFontSize="14" :isClick="true" @click="handleclick" style="padding:10px">
          <div>aaaaaaaaaaaa</div>
        </fieldsetLegend>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "dateTimeDemo",
  data() {
    return {
    };
  },
  methods: {
    handleclick(e,collapsed){
      console.info(e,collapsed)
    }
  }
};
</script>
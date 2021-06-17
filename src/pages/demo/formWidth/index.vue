<template>
  <v-card title="表单宽度设置 (只限于 layout='inline')" class="mb-20">
    <v-form-model layout="inline" :model="form" v-form-width="{ labelWidth: 120, wrapperWidth: 350 }">
      <v-form-model-item label="Activity name">
        <v-input v-model="form.name"></v-input>
      </v-form-model-item>
      <v-form-model-item label="Activity zone">
        <v-select v-model="form.region" placeholder="please select your zone">
          <v-select-option value="shanghai"> Zone one </v-select-option>
          <v-select-option value="beijing"> Zone two </v-select-option>
        </v-select>
      </v-form-model-item>
      <v-form-model-item label="Activity time">
        <v-date-picker
          v-model="form.date1"
          show-time
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        ></v-date-picker>
      </v-form-model-item>
      <v-form-model-item label="Instant delivery">
        <v-switch v-model="form.delivery"></v-switch>
      </v-form-model-item>
      <v-form-model-item label="Activity type">
        <v-checkbox-group v-model="form.type">
          <v-checkbox value="1" name="type"> Online </v-checkbox>
          <v-checkbox value="2" name="type"> Promotion </v-checkbox>
          <v-checkbox value="3" name="type"> Offline </v-checkbox>
        </v-checkbox-group>
      </v-form-model-item>
      <v-form-model-item label="Resources">
        <v-radio-group v-model="form.resource">
          <v-radio value="1"> Sponsor </v-radio>
          <v-radio value="2"> Venue </v-radio>
        </v-radio-group>
      </v-form-model-item>
      <v-form-model-item label="Activity form">
        <v-input v-model="form.desc" type="textarea"></v-input>
      </v-form-model-item>
      <v-form-model-item>
        <v-button type="primary" @click="onSubmit"> Create </v-button>
        <v-button style="margin-left: 10px"> Cancel </v-button>
      </v-form-model-item>
    </v-form-model>
  </v-card>
</template>

<script>
export default {
  name: "formWidth",
  data() {
    return {
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!", this.form);
    },
  },
};
</script>
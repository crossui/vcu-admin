<template>
  <div class="customer-form">
    <customerForm :resultLists="resultLists"/>
    <div class="margin-top-20">
      <v-card title="Result JSON">
        <div slot="extra">
          <v-button
            :disabled="showRes.length<=0"
            type="primary"
            size="small"
            @click="handlePreview"
          >
            <span>预览</span>
          </v-button>
        </div>
        <div>
          <pre>
{{showRes}}
          </pre>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import customerForm from "@/components/customer-form";
export default {
  name: "customerform_index",
  components: {
    customerForm
  },
  data() {
    return {
      resultLists: [],
      showRes: []
    };
  },
  mounted() {},
  watch: {},
  methods: {
    handlePreview() {}
  }
};
</script>

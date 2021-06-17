<template>
  <div>
    <inputDemo />
    <selectDemo />
    <checkboxDemo />
    <radioDemo />
    <dateTimeDemo />
    <autoTypewritDemo />
  </div>
</template>

<script>
import inputDemo from "./components/inputDemo";
import selectDemo from "./components/selectDemo";
import checkboxDemo from "./components/checkboxDemo";
import radioDemo from "./components/radioDemo";
import dateTimeDemo from "./components/dateTimeDemo";
import autoTypewritDemo from "./components/autoTypewritDemo";
export default {
  name: "editCellDemo",
  components: {
    inputDemo,
    selectDemo,
    checkboxDemo,
    radioDemo,
    dateTimeDemo,
    autoTypewritDemo
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
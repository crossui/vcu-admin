<template>
  <v-card title="快捷键指令">
    <div v-hotkey="keyMap" data-hotkey-enable="true">
      请尝试： F4; ALT+Enter
    </div>
  </v-card>
</template>

<script>
export default {
  name: "hotkey",
  data() {
    return {};
  },
  computed: {
    keyMap() {
      return [
        {
          keyVal: "F4",
          callBack: this.handleF4,
        },
        {
          keyVal: "alt+enter",
          callBack: this.handleAltEnter,
        },
      ];
    },
  },
  methods: {
    handleF4() {
      alert("F4");
    },
    handleAltEnter() {
      alert("ALT+Enter");
    },
  },
};
</script>
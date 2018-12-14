<template>
  <v-locale-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </v-locale-provider>
</template>

<script>
import zh_CN from 'vcu/dist/locale/zh_CN';
import 'moment/locale/zh-cn';
export default {
  name: 'App',
  data() {
    return {
      zh_CN,
    }
  }
}
</script>

<style lang="less">
@import "./styles/index.less";
</style>

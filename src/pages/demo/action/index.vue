<template>
  <v-card title="权限指令" class="mb-20">
    <div>
      <h1> 指令用法： </h1>
      <p>- 在需要控制 action 级别权限的组件上使用 v-action:[method]</p>
      <p>- 当前用户没有权限时，组件上使用了该指令则会被隐藏</p>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "action",
  data() {
    return {};
  },
  methods: {},
};
</script>
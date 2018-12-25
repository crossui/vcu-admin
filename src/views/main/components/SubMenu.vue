<template functional>
  <v-sub-menu
    v-on="listeners"
    v-bind="data.attrs"
    :key="data.attrs.menuInfo.name"
  >
    <span slot="title">
      <v-icon :type="data.attrs.menuInfo.icon" />
      <span>{{data.attrs.menuInfo.meta.title}}</span>
    </span>
    <template v-for="item in data.attrs.menuInfo.children">
      <v-menu-item
        v-if="!item.children"
        :key="item.name"
      >
        <v-icon :type="item.icon" />
        <span>{{item.meta.title}}</span>
      </v-menu-item>
      <sub-menu
        v-else
        :menuInfo="item"
        :key="item.name"
      />
    </template>
  </v-sub-menu>
</template>

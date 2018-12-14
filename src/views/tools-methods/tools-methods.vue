<template>
  <div>
    <v-card>
      <v-row :gutter="26">
        <v-col :span="6">
          <v-button @click="createTagParams">添加一个标签</v-button>
        </v-col>
        <v-col :span="18">
          <p>动态路由，添加params</p>
        </v-col>
      </v-row>
    </v-card>
    <v-card shadow style="margin-top: 10px;">
      <v-row :gutter="26">
        <v-col :span="6">
          <v-button @click="createTagQuery">添加一个标签</v-button>
        </v-col>
        <v-col :span="18">
          <p>动态路由，添加query</p>
        </v-col>
      </v-row>
    </v-card>
    <v-card style="margin-top: 10px;">
      <v-row :gutter="26">
        <v-col :span="6">
          <v-button @click="handleCloseTag">关闭工具方法页</v-button>
        </v-col>
        <v-col :span="18">
          <p>手动关闭页面</p>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'toolsmethods_index',
  methods: {
    createTagParams() {
      const id = parseInt(Math.random() * 100000)
      this.$router.push({
        name: 'params_page',
        params: {
          id
        }
      })
    },
    createTagQuery() {
      const id = parseInt(Math.random() * 100000)
      this.$router.push({
        name: 'query_page',
        query: {
          id
        }
      })
    },
    handleCloseTag() {
      util.colsePage(this, this.$route.name)
    }
  }
}
</script>

<style>
</style>

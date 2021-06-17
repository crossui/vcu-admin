<template>
  <div v-hotkey="keyMap" :datv-hotkey-enable="isShow">
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
    <v-card shadow style="margin-top: 10px">
      <v-row :gutter="26">
        <v-col :span="6">
          <v-button @click="createTagQuery">添加一个标签</v-button>
        </v-col>
        <v-col :span="18">
          <p>动态路由，添加query</p>
        </v-col>
      </v-row>
    </v-card>
    <v-card style="margin-top: 10px">
      <v-row :gutter="26">
        <v-col :span="6">
          <v-button @click.native="handleCloseTag">关闭工具方法页</v-button>
        </v-col>
        <v-col :span="18">
          <p>this.util.colsePage(this.$route.name)</p>
        </v-col>
      </v-row>
    </v-card>
    <v-card style="margin-top: 10px">
      <v-row :gutter="26">
        <v-col :span="6">
          <v-button @click.native="handleDelCache">手动清除标签页缓存</v-button>
        </v-col>
        <v-col :span="18">
          <p>this.util.delCachePage("formStylesOne")</p>
        </v-col>
      </v-row>
    </v-card>
    <v-card style="margin-top: 10px" title="不可关闭标签页">
      <v-row :gutter="26">
        <v-col :span="6">
          <v-button-group>
            <v-button @click="handleAddClosePage"> 添加 </v-button>
            <v-button @click="handleAddClosePage1"> 添加1 </v-button>
            <v-button @click="handleRemoveClosePage"> 删除 </v-button>
          </v-button-group>
        </v-col>
        <v-col :span="18">
          <p>添加：</p>
          <p>
            this.$store.commit("updateWatchClosed",{name: "toolsmethods_index",tips:
            "还未保存，您真的要退出？",modalType: "1",});
          </p>
          <p>
            this.$store.commit("updateWatchClosed",{name: "executeFlow",tips:
            "您真的要退出？",modalType: "2",closePage: false,});
          </p>
          <p>删除：</p>
          <p>this.$store.commit("updateWatchClosed","toolsmethods_index");</p>
        </v-col>
      </v-row>
    </v-card>
    <v-card style="margin-top: 10px">
      <v-row :gutter="26">
        <v-col :span="6">
          <v-button @click.native="handleCollapsed">手动收缩左侧栏</v-button>
        </v-col>
        <v-col :span="18">
          <p>this.$store.commit("setCollapsed", !this.collapsed);</p>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import bmixins from "./mixins";
export default {
  name: "toolsmethods_index",
  mixins: [bmixins],
  computed: {
    options() {
      return {
        trigger: ".vcu-modal-header",
        body: ".vcu-modal",
        recover: true,
      };
    },
  },
  data() {
    return {
      buttonOptions: {
        trigger: ".draggable-btn",
        body: ".draggable-btn",
      },
      visible: false,
      pageInitDict: "",
    };
  },
  mounted() {},
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    handleAddClosePage() {
      this.$store.commit(
        "updateWatchClosed",
        {
          name: "toolsmethods_index",
          tips: "还未保存，您真的要退出？",
          modalType: "1",
        },
        true
      );
    },
    handleAddClosePage1() {
      this.$store.commit("updateWatchClosed", {
        name: "executeFlow",
        tips: "您真的要退出？",
        modalType: "2",
        closePage: false,
      });
    },
    handleRemoveClosePage() {
      this.$store.commit("updateWatchClosed", "toolsmethods_index");
    },
  },
  activated() {},
  deactivated() {},
};
</script>

<style>
</style>

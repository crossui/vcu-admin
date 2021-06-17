<template>
  <v-config-provider :getPopupContainer="getPopupContainer" :locale="zh_CN">
    <div
      v-wechat-title="title"
      class="app-content"
      id="app"
      v-modal-confirm-enter
      v-hotkey="keyMap"
      data-hotkey-enable="true"
    >
      <router-view :class="[appStyle, skinTheme.class]" v-if="isAlive" />
      <spinLoading v-if="appSpinLoading" :tipText="appSpinTipText" />
      <lockingModal v-if="locking" />
    </div>
  </v-config-provider>
</template>
<script>
import zh_CN from "vcu/dist/locale/zh_CN"
import moment from "moment"
import "moment/locale/zh-cn"
import lockingModal from "@/components/layout/lockingModal"
moment.locale("zh-cn")
export default {
  name: "app",
  components: {
    lockingModal,
  },
  data() {
    return {
      zh_CN,
      title: this.appConfig.title,
      appStyle: this.appConfig.ambient,
    }
  },
  computed: {
    keyMap() {
      return [
        {
          keyVal: "ctrl+l",
          callBack: this.appLockingPage,
        },
      ]
    },
    skinTheme() {
      let skinTheme = this.$store.state.app.skinTheme ? this.$store.state.app.skinTheme : this.appConfig.skinTheme
      return skinTheme
    },
    isAlive() {
      return this.$store.state.app.isAlive
    },
    locking() {
      let b = this.$store.state.app.locking && this.$store.state.app.quotePage ? true : false
      return b
    },
    appSpinLoading() {
      return this.$store.state.app.appSpinLoading
    },
    appSpinTipText() {
      return this.$store.state.app.appSpinTipText
    },
  },
  watch: {
    $route(to, from) {
      this.title = `${this.appConfig.title} - ${to.meta.title}`
    },
    isAlive(val) {
      if (!val) {
        this.$nextTick(function() {
          this.$store.commit("setIsAlive", true)
        })
      }
    },
  },
  created() {
    //定义客户端锁屏
    window.executeScriptNotice = () => {
      if (!window.noAutoLocking) {
        this.appLockingPage()
      }
    }
  },
  mounted() {
    document.getElementById("app-loading").remove()
    this.init()
  },
  methods: {
    listenerFun(e) {
      if (e.data.type && e.data.type == "colsePage") {
        this.util.colsePage(e.data.routerName)
      }
    },
    init() {
      let appSize = this.$store.state.app.appSize ? this.$store.state.app.appSize : this.appConfig.elementSize
      document.body.classList.add(appSize)
      //注册一个供子系统关闭页面方法
      this.util.postMessage.subscribe("colsePage", this.colsePage)
    },
    //关闭页面方法
    colsePage(obj) {
      if (obj && obj.routerName && obj.routerName != "") this.util.colsePage(obj.routerName)
    },
    getPopupContainer(el, dialogContext) {
      if (dialogContext) {
        return dialogContext.getDialogWrap()
      } else {
        return document.body
      }
    },
    appLockingPage() {
      this.$store.commit("setLocking", true)
    },
  },
  beforeDestroy() {
    this.util.postMessage.unsubscribe("colsePage", this.colsePage)
  },
}
</script>
<style lang="less">
@import "./styles/index.less";
</style>

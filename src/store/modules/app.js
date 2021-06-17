import util from "@/utils"
import appConfig from "@/config"

const app = {
  state: {
    tagNavList: [appConfig.homepage],
    menuList: [],
    collapsed: false,
    cachePage: [],
    redirectList: [],
    skinTheme: null,
    appSize: null,
    hotkeyPriority: "",
    isAlive: true,
    isMainAlive: true,
    quotePage: true,
    appSpinLoading: false,
    appSpinTipText: "数据提交中...",
    dontCache: ["level-2", "level-3-1"], // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    watchClosed: [],
    locking: false,
    messageCount: 0
  },
  mutations: {
    setMessageCount(state, val) {
      state.messageCount = val > 0 ? true : false;
    },
    //设置嵌入页面（有缓存）
    setRedirectList(state, val) {
      state.redirectList = val
    },
    //更新锁屏状态
    setLocking(state, val) {
      state.locking = val
    },
    //更新是否关闭标签页
    updateWatchClosed(state, val) {
      if (typeof val == "string") {
        state.watchClosed = _.filter(state.watchClosed, (item) => item.name != val)
      } else {
        state.watchClosed.push(val)
      }
    },
    //单页是否隐藏控制
    setQuotePage(state, val) {
      state.quotePage = val
    },
    //更新快捷键优先级
    updateHotkeyPriority(state, val) {
      state.hotkeyPriority = val
    },
    //设置页面元素大小
    setAppSize(state, val) {
      state.appSize = val
    },
    //设置皮肤主题
    setSkinTheme(state, val) {
      state.skinTheme = val
    },
    //设置侧边栏收缩状态
    setCollapsed(state, status) {
      state.collapsed = status
    },
    //设置主体页内容强制刷新
    setIsMainAlive(state, val) {
      state.isMainAlive = val
    },
    //设置主页内容强制刷新
    setIsAlive(state, val) {
      state.isAlive = val
    },
    setAppSpin(state, val) {
      state.appSpinLoading = val.value
      state.appSpinTipText = val.text ? val.text : "数据提交中..."
    },
    //更新快捷键指令优先级
    updateHotkeyPriority(state, val) {
      state.hotkeyPriority = val
    },
    //更新左侧导航
    setMenulist(state, list) {
      state.menuList = list
    },
    //添加标签导航
    addTag(state, { route, type = "unshift" }) {
      let router = util.getRouteTitleHandled(route)
      if (!util.routeHasExist(state.tagNavList, router)) {
        if (type === "push") state.tagNavList.push(router)
        else {
          if (router.name === appConfig.homepage.name) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
      } else {
        state.tagNavList = state.tagNavList.map((item) => {
          if (item.name == router.name) {
            item.params = router.params
            item.query = router.query
          }
          return item
        })
      }
    },
    //设置标签导航
    setTagNavList(state, list = {}) {
      let tagList = []
      if (list) {
        tagList = [...list]
      }
      if (tagList[0] && tagList[0].name !== appConfig.homepage.name) tagList.shift()
      let homeTagIndex = tagList.findIndex((item) => item.name === appConfig.homepage.name)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      this.commit("setCachePage", tagList)
      state.tagNavList = tagList
    },
    //设置缓存页面
    setCachePage(state, pages) {
      let names = pages
        .map((item) => {
          return item.name
        })
        .filter((item) => {
          return !util.hasOneOf(state.dontCache, [item])
        })
      names.push("ParentView") //多级路由手动添加成缓存
      state.cachePage = names
    },
    //单独添加缓存页面
    addCachePage(state, name) {
      if (!util.hasOneOf(state.dontCache, [name])) state.cachePage = _.concat(state.cachePage, [name])
    },
  },
}

export default app

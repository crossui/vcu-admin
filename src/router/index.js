import Vue from "vue"
import VueRouter from "vue-router"
import { devRouters, proRouters, menuRouter, layoutComponents, page404 } from "./router"
import store from "@/store"
import NProgress from "nprogress"
import appConfig from "@/config"
import util from "@/utils"
import { Modal } from "vcu"
import XEUtils from "xe-utils"
import * as api from "@/api/common/app.js"
Vue.use(VueRouter)

// 路由配置 // development  production
let _routers = process.env.NODE_ENV == "development" ? devRouters : proRouters
const RouterConfig = {
  //mode: 'history',
  routes: _routers,
}

store.commit("setMenulist", [])
store.commit("setRedirectList", [{ name: "qq", href: "https://www.qq.com/" }, { name: "people", href: "http://www.people.com.cn/" }])

export const router = new VueRouter(RouterConfig)

//NavigationDuplicated的可能解决方案
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

//获取菜单权限
const getCommonMenu = async () => {
  let res = await api.commonMenu()
  if (res) {
    return res.data.payload
  } else {
    return false
  }
}
//动态注册路由
const loadView = (view) => {
  return () => import(`@/pages/${view}.vue`)
}
const createMenuRoleList = () => {
  try {
    return new Promise(async (resolve, reject) => {
      if (process.env.NODE_ENV == "development") {
        // development  production
        store.commit("setMenulist", menuRouter)
        resolve(true)
      } else {
        let res = await getCommonMenu()
        let redirectList = []
        if (res) {
          XEUtils.mapTree(res, (item) => {
            if (item.component == "Main") {
              item.component = layoutComponents.main
            } else if (item.component == "ParentView") {
              item.component = layoutComponents.parentView
            } else if (item.meta.redirect) {
              switch (item.meta.redirect) {
                case "cache":
                  redirectList.push({
                    href: item.meta.href,
                    name: item.name,
                  })
                  break
                case "noCache":
                  item.component = layoutComponents.external
                  break
                case "blank":
                  item.name = `isTurnByHref_${item.href}`
                  break
              }
            } else {
              item.component = loadView(item.component)
            }
            return item
          })
          if (res.length) {
            let _router = res.concat([page404])
            router.addRoutes(_router)
            store.commit("setMenulist", res)
            store.commit("setRedirectList", redirectList)
            resolve(true)
          } else {
            resolve(false)
          }
        } else {
          resolve(false)
        }
      }
    })
  } catch (err) {
    return false
  }
}

const routerNext = async (to, from, next) => {
  if (store.state.app.menuList.length == 0 && to.name != "error-403") {
    //动态注册路由
    let res = await createMenuRoleList()
    if (res) {
      next({ ...to, replace: false })
    } else {
      next({ name: "error-403" })
    }
  } else {
    next()
  }
}

router.beforeEach(async (to, from, next) => {
  if (to.query.quotePage && (to.query.quotePage == "true" || to.query.quotePage == true)) {
    store.commit("setQuotePage", false)
    routerNext(to, from, next)
  } else {
    store.commit("setQuotePage", true)
    //允许打开多少标签页
    if (
      appConfig.openTagsNav == 0 ||
      store.state.app.tagNavList.length < appConfig.openTagsNav + 1 ||
      util.routeHasExist(store.state.app.tagNavList, to)
    ) {
      NProgress.start()
      if (store.state.user.token == "" && to.name !== "login") {
        next({ name: "login" })
      } else {
        routerNext(to, from, next)
      }
    } else {
      Modal.error({
        title: "提示",
        content: `最多打开${appConfig.openTagsNav}标签页`,
      })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
  try {
    document.getElementById("contentWrapper") != null && document.getElementById("contentWrapper").scrollTo(0, 0)
  } catch (err) { }
})

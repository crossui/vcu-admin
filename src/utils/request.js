import axios from "axios"
import qs from "qs"
import store from "@/store"
import util from "@/utils"
import appConfig from "@/config"
import { message, Modal } from "vcu"

// 创建一个AXIOS实例 (请求不同服务器地址或超时时长等等可以创建不同的实例)
const request = axios.create({
  // withCredentials: true, // 跨域请求时发送cookies
  timeout: 60000 * 5, // 请求超时
})

// 开始设置请求 发起的拦截处理
// config 代表发起请求的参数的实体
request.interceptors.request.use(
  (config) => {
    
    //设置接口前缀
    config.baseURL = config.baseURL || window.baseURL

    //设置提交方式
    config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"

    let token =
    store.state.user && store.state.user.token && store.state.user.token != ""
      ? store.state.user.token
      : localStorage.getItem("token")
      
    //根据项目要求设置token
    config.data = qs.stringify({
      ...config.data,
      token: token
    })
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 请求到结果的拦截处理
request.interceptors.response.use(
  (response) => {
    const { data, headers } = response

    if (data.status == 400) {
      //token过期或被人踢了
      if (document.getElementsByClassName("re-entry").length) return false
      Modal.confirm({
        title: "提示",
        class: "re-entry",
        content: (h) => <div style="color:red;">你已被登出，可以取消继续留在该页面，或者重新登录</div>,
        okText: "重新登录",
        centered: true,
        onOk() {
          console.info("重新登录")
        },
        cancelText: "留在当前页",
        onCancel() {},
      })
      return false
    } else if (data.status == 404) {
      //API no found
      util.showErrModal({
        title: "请求接口不存在",
        payload: {
          message: "API no found",
        },
      })
      return false
    } else if (data.status == 500) {
      //业务或系统错误
      if (response.config.isHandleErr500 && response.config.isHandleErr500 == true) {
        //需要单独处理500错误
        return response
      } else {
        util.showErrModal(data)
        return false
      }
    } else if (data.status == 100) {
      //odc
      return response
    } else {
      //200正常状态
      return response
    }
  },
  (error) => {
    // 请求错误需要自行处理
    if (error.config.isHandleError && error.config.isHandleError == true) {
      return error
    } else {
      message.error("连接到服务器失败")
      return false
    }
  }
)

export default request

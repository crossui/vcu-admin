export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: "vcu admin 后台管理模板",
  /**
   * @description 导航模式 (sidemenu,topmenu)
   */
  navigationMode: 'sidemenu',
  /**
   * @description 防止抖动函数时间
   */
  debounceTime: 300,
  /**
   * @description 配置允许打开多少标签页（默认 0 不限制）
   */
  openTagsNav: 0,
  /**
   * @description 皮肤主题（其他主题定义查看模板“动态皮肤” colorList）
   */
  skinTheme: {
    class: "skin-bronzeblue",
    key: "铜蓝",
    color: "#4f7ecb"
  },
  /**
   * @description 配置默认首页
   */
  homepage: {
    title: '首页',
    path: '/home/index',
    name: 'home_index'
  },
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: "http://10.16.0.78:9089/",
    build: "http://10.16.0.78:9089/"
  },
}

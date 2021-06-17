import Main from "@/components/layout/main/index.vue";
import ParentView from "@/components/layout/parent-view/index.vue";
import External from '@/components/layout/external/index.vue';

import appConfig from "@/config";

export const indexRouter = {
  path: "/",
  name: "indexRouter",
  redirect: appConfig.homepage.path
};

export const loginRouter = {
  path: "/login",
  name: "login",
  meta: {
    title: "登录"
  },
  component: () => import("@/pages/login/index.vue")
};

export const page404 = {
  path: "/*",
  name: "error-404",
  meta: {
    title: "404-页面不存在"
  },
  component: () => import("@/pages/error-page/404.vue")
};

export const page403 = {
  path: "/403",
  meta: {
    title: "403-权限不足"
  },
  name: "error-403",
  component: () => import("@/pages/error-page/403.vue")
};

export const page500 = {
  path: "/500",
  meta: {
    title: "500-服务端错误"
  },
  name: "error-500",
  component: () => import("@/pages/error-page/500.vue")
};

export const quotePage = {
  path: '/quote-page',
  meta: {
    title: '引用页面'
  },
  name: 'quote-page',
  component: () =>
    import('@/pages/quote-page/index.vue')
};

export const homeRouter = {
  path: "/home",
  name: "homeRouter",
  redirect: "/home",
  component: Main,
  children: [{
    path: "index",
    meta: {
      title: "首页"
    },
    name: "home_index",
    component: () => import("@/pages/home/index.vue")
  }]
};


export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  component: Main,
  children: [{
    path: 'ownspace',
    meta: {
      title: '个人中心'
    },
    name: 'ownspace_index',
    component: () =>
      import('@/pages/own-space/own-space.vue')
  },
  {
    path: 'message',
    meta: {
      title: '消息中心'
    },
    name: 'message_index',
    component: () =>
      import('@/pages/message/message.vue')
  }
  ]
};

export const menuRouter = [
  {
    path: '',
    icon: 'file-word',
    name: 'isTurnByHref_http://10.16.241.70:8034/#/directory', //打开新页面  以 isTurnByHref_ 为前缀
    meta: {
      title: '文档',
    }
  },
  {
    path: '/tools-methods',
    icon: 'tool',
    meta: {
      title: '工具函数'
    },
    name: 'toolsmethods',
    component: Main,
    children: [
      {
        path: 'index',
        meta: {
          title: '工具函数'
        },
        name: 'toolsmethods_index',
        component: () =>
          import('@/pages/demo/tools-methods/tools-methods.vue')
      }, {
        path: 'params/:id',
        name: 'params_page',
        hidden: true,
        meta: {
          title: '动态路由'
        },
        component: () =>
          import('@/pages/demo/tools-methods/params.vue')
      },
      {
        path: 'query',
        name: 'query_page',
        hidden: true,
        meta: {
          title: '带参路由',
        },
        component: () =>
          import('@/pages/demo/tools-methods/query.vue')
      }]
  },
  {
    path: '/theme',
    icon: 'container',
    name: 'theme',
    meta: {
      title: '动态皮肤',
    },
    component: Main,
    children: [{
      path: 'index',
      meta: {
        title: '动态皮肤'
      },
      name: 'theme_index',
      component: () =>
        import('@/pages/demo/theme/index.vue')
    }]
  },
  {
    path: '/error-page',
    show: true,
    icon: 'stop',
    meta: {
      title: '错误页面'
    },
    name: 'errorpage',
    component: Main,
    children: [{
      show: true,
      path: 'index',
      meta: {
        title: '错误页面'
      },
      name: 'errorpage_index',
      component: () =>
        import('@/pages/error-page/error-page.vue')
    }]
  },
  {
    path: '/commonMixins',
    icon: 'flag',
    meta: {
      title: '公共MIXINS'
    },
    name: 'commonMixins',
    component: Main,
    children: [{
      path: 'executeFlow',
      meta: {
        title: '执行流引擎',
      },
      name: 'executeFlow',
      component: () =>
        import('@/pages/demo/executeFlow/index.vue')
    }, {
      path: 'emitter',
      meta: {
        title: '组件间通信',
      },
      name: 'emitter',
      component: () =>
        import('@/pages/demo/emitter/index.vue')
    }]
  },
  {
    path: '/ui',
    icon: 'build',
    meta: {
      title: 'UI组件'
    },
    name: 'ui',
    component: Main,
    children: [
      {
        path: 'iconfont',
        meta: {
          title: 'iconfont字体',
        },
        name: 'iconfont',
        component: () =>
          import('@/pages/demo/iconfont/index.vue')
      }, {
        path: 'scrollbar',
        meta: {
          title: '自定义滚动条',
        },
        name: 'scrollbar',
        component: () =>
          import('@/pages/demo/scrollbar/index.vue')
      }, {
        path: 'dateTime',
        meta: {
          title: '日期组件',
        },
        name: 'dateTimeDemo',
        component: () =>
          import('@/pages/demo/dateTime/index.vue')
      },
      {
        path: 'splitpanes',
        meta: {
          title: '面板分割',
        },
        name: 'splitpanesDemo',
        component: () =>
          import('@/pages/demo/splitpanes/index.vue')
      },
      {
        path: 'fieldsetLegend',
        meta: {
          title: '方框域',
        },
        name: 'fieldsetLegendDemo',
        component: () =>
          import('@/pages/demo/fieldsetLegend/index.vue')
      },
      {
        path: 'draggableResizable',
        meta: {
          title: '可拖拽缩放',
        },
        name: 'draggableResizableDemo',
        component: () =>
          import('@/pages/demo/draggableResizable/index.vue')
      },
      {
        path: 'editCell',
        meta: {
          title: '可编辑单元',
        },
        name: 'editCellDemo',
        component: () =>
          import('@/pages/demo/editCell/index.vue')
      }
    ]
  }, {
    path: '/directives',
    icon: 'snippets',
    meta: {
      title: '自定义指令'
    },
    name: 'directives',
    component: Main,
    children: [
      {
        path: 'hotkey',
        meta: {
          title: '快捷键指令',
        },
        name: 'hotkey',
        component: () =>
          import('@/pages/demo/hotkey/index.vue')
      },
      {
        path: 'formWidth',
        meta: {
          title: '表单宽度设置',
        },
        name: 'formWidth',
        component: () =>
          import('@/pages/demo/formWidth/index.vue')
      },
      {
        path: 'action',
        meta: {
          title: '权限指令',
        },
        name: 'action',
        component: () =>
          import('@/pages/demo/action/index.vue')
      }
    ]
  },
  {
    path: '/plugins',
    icon: 'block',
    meta: {
      title: '第三方扩展插件'
    },
    name: 'plugins',
    component: Main,
    children: [
      {
        path: 'vcuTable',
        meta: {
          title: '大数据表格',
        },
        name: 'vcuTableDemo',
        component: () =>
          import('@/pages/demo/vcuTable/index.vue')
      }
    ]
  },
  {
    path: '/embed',
    iconfont: 'icontjcx',
    meta: {
      title: '嵌入页面'
    },
    name: 'embed',
    component: Main,
    children: [{
      path: 'hao123',
      component: External,
      meta: {
        href: "https://www.hao123.com/",
        title: 'hao123(无缓存)',
        redirect: "noCache"
      },
      name: 'hao123'
    }, {
      path: '163',
      component: External,
      meta: {
        href: "https://www.163.com/",
        title: '网易(无缓存)',
        redirect: "noCache"
      },
      name: 'wy163'
    }, {
      path: 'people',
      meta: {
        href: "http://www.people.com.cn/",
        title: '人民网(有缓存)',
        redirect: "cache",
      },
      name: 'people',
    }, {
      path: 'qq',
      meta: {
        href: "https://www.qq.com/",
        title: '腾讯(有缓存)',
        redirect: "cache",
      },
      name: 'qq',
    }]
  },
  {
    path: '/multilevel',
    icon: 'ordered-list',
    name: 'multilevel',
    meta: {
      title: '多级导航'
    },
    component: Main,
    children: [{
      path: 'level-1',
      iconfont: 'icongg',
      name: 'level-1',
      meta: {
        title: 'level-1'
      },
      component: () =>
        import('@/pages/demo/multilevel/level-1.vue')
    },
    {
      path: 'level-2',
      icon: 'bars',
      name: 'level-2',
      meta: {
        title: 'level-2'
      },
      component: () =>
        import('@/pages/demo/multilevel/level-2.vue')
    },
    {
      path: 'level-3',
      icon: 'bars',
      name: 'level-3',
      meta: {
        title: 'level-3'
      },
      component: ParentView,
      children: [{
        path: 'level-3-1',
        name: 'level-3-1',
        icon: 'bars',
        meta: {
          title: 'level-3-1'
        },
        component: () =>
          import('@/pages/demo/multilevel/level-3/level-3-1.vue')
      }, {
        path: 'level-3-2',
        name: 'level-3-2',
        icon: 'bars',
        meta: {
          title: 'level-3-2'
        },
        component: () =>
          import('@/pages/demo/multilevel/level-3/level-3-2.vue')
      }]
    },
    ]
  }
];

export const layoutComponents = { main: Main, parentView: ParentView, external: External };


// 开发环境
export const devRouters = [
  indexRouter,
  loginRouter,
  homeRouter,
  otherRouter,
  ...menuRouter,
  page500,
  page403,
  page404,
];
//生产环境
export const proRouters = [
  indexRouter,
  loginRouter,
  homeRouter,
  otherRouter,
  page500,
  page403,
  //page404,
];
import Main from '@/views/main/main.vue';
import parentView from '@/components/parent-view/parent-view.vue';
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '登录'
    },
    component: () =>
        import ('@/views/login/login.vue')
};


export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () =>
        import ('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import ('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import ('@/views/error-page/500.vue')
};

export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
            path: 'test',
            meta: {
                title: '测试'
            },
            name: 'test_index',
            component: () =>
                import ('@/views/test.vue')
        }, {
            path: 'home',
            meta: {
                title: '首页'
            },
            name: 'home_index',
            component: () =>
                import ('@/views/home/home.vue')
        }, {
            path: 'ownspace',
            meta: {
                title: '个人中心'
            },
            name: 'ownspace_index',
            component: () =>
                import ('@/views/own-space/own-space.vue')
        },
        {
            path: 'message',
            meta: {
                title: '消息中心'
            },
            name: 'message_index',
            component: () =>
                import ('@/views/message/message.vue')
        }
    ]
};

export const menuRouter = [{
        path: '/editor-page',
        show: true,
        icon: 'edit-square',
        meta: {
            title: '富文本编辑器'
        },
        name: 'editorpage',
        component: Main,
        children: [{
            show: true,
            path: 'index',
            meta: {
                title: '富文本编辑器'
            },
            name: 'editorpage_index',
            component: () =>
                import ('@/views/editor-page/editor-page.vue')
        }]
    },
    {
        path: '/echarts-page',
        show: true,
        icon: 'fund',
        meta: {
            title: 'echarts图表'
        },
        name: 'echartspage',
        component: Main,
        children: [{
            show: true,
            path: 'index',
            meta: {
                title: 'echarts图表'
            },
            name: 'echartspage_index',
            component: () =>
                import ('@/views/echarts-page/echarts-page.vue')
        }]
    },
    {
        path: '/area-linkage',
        show: true,
        icon: 'ellipsis',
        meta: {
            title: '城市级联'
        },
        name: 'arealinkage',
        component: Main,
        children: [{
            show: true,
            path: 'index',
            meta: {
                title: '城市级联'
            },
            name: 'arealinkage_index',
            component: () =>
                import ('@/views/area-linkage/area-linkage.vue')
        }]
    },
    {
        path: '/image-editor',
        show: true,
        icon: 'image',
        meta: {
            title: '图片预览编辑'
        },
        name: 'imageeditor',
        component: Main,
        children: [{
            show: true,
            path: 'index',
            meta: {
                title: '图片预览编辑'
            },
            name: 'imageeditor_index',
            component: () =>
                import ('@/views/image-editor/image-editor.vue')
        }]
    },
    {
        path: '/tools-methods',
        show: true,
        icon: 'wrench',
        meta: {
            title: '工具函数'
        },
        name: 'toolsmethods',
        component: Main,
        children: [{
                show: true,
                path: 'index',
                meta: {
                    title: '工具函数'
                },
                name: 'toolsmethods_index',
                component: () =>
                    import ('@/views/tools-methods/tools-methods.vue')
            }, {
                path: 'params/:id',
                name: 'params_page',
                show: false,
                meta: {
                    title: '动态路由'
                },
                component: () =>
                    import ('@/views/tools-methods/params.vue')
            },
            {
                path: 'query',
                name: 'query_page',
                show: false,
                meta: {
                    title: '带参路由',
                },
                component: () =>
                    import ('@/views/tools-methods/query.vue')
            }
        ]
    },
    {
        path: '/error-page',
        show: true,
        icon: 'error',
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
                import ('@/views/error-page/error-page.vue')
        }]
    },
    {
        path: '/multilevel',
        show: true,
        icon: 'unorderedlist',
        name: 'multilevel',
        meta: {
            title: '多级导航'
        },
        component: Main,
        children: [{
                path: 'level-1',
                show: true,
                icon: 'file',
                name: 'level-1',
                meta: {
                    title: 'level-1'
                },
                component: () =>
                    import ('@/views/multilevel/level-1.vue')
            },
            {
                path: 'level-2',
                show: true,
                icon: 'file',
                name: 'level-2',
                meta: {
                    title: 'level-2'
                },
                component: () =>
                    import ('@/views/multilevel/level-2.vue')
            },
            {
                path: 'level-3',
                show: true,
                icon: 'orderedlist',
                name: 'level-3',
                meta: {
                    title: 'level-3'
                },
                component: parentView,
                children: [{
                    path: 'level-3-1',
                    show: true,
                    name: 'level-3-1',
                    icon: 'file',
                    meta: {
                        title: 'level-3-1'
                    },
                    component: () =>
                        import ('@/views/multilevel/level-3/level-3-1.vue')
                }]
            },
        ]
    },
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    ...menuRouter,
    page500,
    page403,
    page404
];
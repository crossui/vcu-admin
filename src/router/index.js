import Vue from 'vue';
import VueRouter from 'vue-router';
import { menuRouter, routers } from './router';
import Cookies from 'js-cookie';
import NProgress from 'nprogress'
Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
    //mode: 'history',
    routes: routers
};

export const router = new VueRouter(RouterConfig);


router.beforeEach((to, from, next) => {
    NProgress.start()
    if (!Cookies.get('user') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
        next({
            name: 'login'
        });
    } else {
        next();
    }
});

router.afterEach((to) => {
    NProgress.done()
    window.scrollTo(0, 0);
});
import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index'
import store from './store';
import VCU from 'vcu';
import VueWechatTitle from 'vue-wechat-title';
import Uicomponents from '@/components/ui';
import importDirective from '@/directive';
import appConfig from "@/config";
import util from '@/utils';
import _ from "lodash";
import VCUTable from 'vcu-table';
import request from '@/utils/request';

/* 兼容低版本浏览器 */
import '@babel/polyfill';
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()

Vue.use(VueWechatTitle)
Vue.use(VCU)
Vue.use(Uicomponents)
Vue.use(VCUTable);
VCUTable.setup({
  request: request,
  table: {
    border: true,
    round: true,
    stripe: true,
    resizable: true
  }
})

/* 工具 */
Vue.prototype.util = util;
/* 注册指令*/
importDirective(Vue);
/* 全局配置参数 */
Vue.prototype.appConfig = appConfig;
window.debounceTime = appConfig.debounceTime;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

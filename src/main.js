import Vue from 'vue'
import App from './App'
import Vcu from 'vcu'
import { router } from './router/index'
import store from './store';
import { requestAjax, Http } from '@/service';
import ElementDataset from 'element-dataset'
import 'babel-polyfill'

require('./mock')

ElementDataset();
Vue.use(Vcu)

Vue.prototype.request = requestAjax; //axios 原生方法
Vue.prototype.http = Http; // 根据业务二次封装后axios

Vue.config.productionTip = false;
/* eslint-disable no-new */
let vue = new Vue({
    el: '#app',
    router,
    store: store,
    components: { App },
    template: '<App/>'
});

export default vue;
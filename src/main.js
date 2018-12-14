import Vue from 'vue'
import App from './App'
import { router } from './router/index'
import store from './store';
import ElementDataset from 'element-dataset'
import 'babel-polyfill'
ElementDataset();


import Vcu from 'vcu'
Vue.use(Vcu)

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store: store,
    components: { App },
    template: '<App/>'
})
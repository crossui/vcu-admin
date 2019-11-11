import Vue from 'vue'
import App from './App'
import Vcu from 'vcu'
import { router } from './router/index'
import store from './store';
import request from '@/libs/request';
import ElementDataset from 'element-dataset'
import 'babel-polyfill'

require('./mock')

ElementDataset();
Vue.use(Vcu)

Vue.prototype.request = request;

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store: store,
    components: { App },
    template: '<App/>'
})
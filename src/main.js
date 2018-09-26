import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import App from './App.vue'
import { routes }  from './routes'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.root = 'http://127.0.0.1:8000/';

const router = new VueRouter({ 
  routes, 
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

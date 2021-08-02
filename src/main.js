import Vue from 'vue'
import App from './App.vue'
import router from './route.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import baseAPI from '@/http/index'
import store from '@/store/index'

Vue.config.productionTip = false

// Vue.prototype.$baseAPI = baseAPI

Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

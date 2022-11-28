import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.less'
import '@/assets/font/iconfont.css'

import axios from 'axios'

axios.defaults.baseURL = 'http://10.12.37.249:8081/'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

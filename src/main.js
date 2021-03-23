import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import icon from './components/icon.vue'
import * as common from "./utils/common.js"
// import * as platform from '@/utils/platform'

Vue.component('icon', icon)
Vue.prototype.common = common
// Vue.prototype.platform = platform
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

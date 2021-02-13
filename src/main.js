import 'babel-polyfill'
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/configs/antd'
import '@/configs/filter'
import '@/configs/permission'
import '@/configs/registerServiceWorker'
import '@/configs/scroll'

import '@/assets/styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

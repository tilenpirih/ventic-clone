import Vue from 'vue'
import VueVirtualScroller from 'vue-virtual-scroller'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'

import 'video.js/dist/video-js.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'

Vue.config.productionTip = false
Vue.use(VueVirtualScroller)
new Vue({
  i18n,
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')

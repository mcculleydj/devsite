import Vue from 'vue'
import VueRx from 'vue-rx'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.use(VueRx)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')

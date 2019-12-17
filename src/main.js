import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
import router from './router'
import Header from "./components/Header/Header"
import store from "./vuex/store"
Vue.config.productionTip = false
Vue.component('Header',Header)
new Vue({
  router,
  store,//全局暴露store
  render: h => h(App),
}).$mount('#app')

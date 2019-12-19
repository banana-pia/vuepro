import Vue from 'vue'
import App from './App.vue'
import {Button} from 'mint-ui'
import 'lib-flexible'
import router from './router'
import Header from "./components/Header/Header"
import store from "./vuex/store"
import './validate'
import * as API from "./Api"
Vue.config.productionTip = false
Vue.component('Header',Header)
Vue.component(Button.name, Button) 
Vue.prototype.$API = API
new Vue({ 
  router,
  store,//全局暴露store
  render: h => h(App),
}).$mount('#app')

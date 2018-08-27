import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.config.productionTip = false

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Landing from './components/pages/Landing'
import Dashboard from './components/pages/Dashboard'
import Exercises from './components/pages/Exercises'

const router = new VueRouter({
  routes: [
    { path: '/', component: Landing },
    { path: '/dashboard', component: Dashboard },
    { path: '/exercises', component: Exercises }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

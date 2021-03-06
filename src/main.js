import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.less'
import '@/premission'
Vue.use(ElementUI)
Vue.config.productionTip = false
// import dayjs from 'dayjs' // ES 2015
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

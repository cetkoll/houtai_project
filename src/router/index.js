import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/view/Login') },
  { path: '/home', component: () => import('@/view/Home') }
]

const router = new VueRouter({
  routes
})

export default router

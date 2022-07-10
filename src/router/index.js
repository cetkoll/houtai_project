import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/' },
  { path: '/login', component: () => import('@/view/Login') },
  {
    path: '/',
    component: () => import('@/view/Layout'),
    redirect: '/user',
    children: [
      { path: 'user', name: 'user', component: () => import('@/view/User/List') },
      { path: 'setlist', component: () => import('@/view/Set/SetList') },
      { path: 'userlist', component: () => import('@/view/Set/UserList') },
      { path: 'goodsList', component: () => import('@/view/Goods/GoodsList') },
      { path: 'goodsArgument', component: () => import('@/view/Goods/GoodsArgument') },
      { path: 'goodsClassify', component: () => import('@/view/Goods/GoodsClassify') },
      { path: 'orderList', component: () => import('@/view/Order/OrderList') },
      { path: 'dataList', component: () => import('@/view/Data/DataList') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

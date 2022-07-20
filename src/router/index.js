import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/' },
  { path: '/login', component: () => import('@/view/Login') },
  {
    path: '/',
    meta: { title: '首页' },
    component: () => import('@/view/Layout'),
    redirect: '/users',
    children: [
      { path: 'users', meta: { title: '用户列表' }, component: () => import('@/view/User/List') },
      { path: 'rights', meta: { title: '权限列表' }, component: () => import('@/view/Set/SetList') },
      { path: 'roles', meta: { title: '角色列表' }, component: () => import('@/view/Set/UserList') },
      { path: 'goods', meta: { title: '商品列表' }, component: () => import('@/view/Goods/GoodsList') },
      { path: 'params', meta: { title: '分类参数' }, component: () => import('@/view/Goods/GoodsArgument') },
      { path: 'categories', meta: { title: '商品分类' }, component: () => import('@/view/Goods/GoodsClassify') },
      { path: 'orders', meta: { title: '订单列表' }, component: () => import('@/view/Order/OrderList') },
      { path: 'reports', meta: { title: '数据报表' }, component: () => import('@/view/Data/DataList') },
      { path: 'addGoods', meta: { title: '添加商品' }, component: () => import('@/view/AddGoods') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router

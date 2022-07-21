import router from './router'
import store from './store'
router.beforeEach((to, from, next) => {
  const token = store.state.houtai.token
  if (token) {
    const time = Date.now() - store.state.houtai.time
    if (time < 7200000) {
      if (to.path === '/login') {
        next('/users')
      } else {
        next()
      }
    } else {
      store.commit('setToken', '')
      next('/login')
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

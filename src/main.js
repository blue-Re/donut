import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/index'
import 'vant/lib/index.css';
// import 'element-ui/lib/theme-chalk/index.css';
// 导入socket.io
import './socketIo/socket'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  // console.log(to,from,next);
  const token = localStorage.getItem('token')
  // 筛选需要传token的路由，匹配route里面需要登录的路径，如果匹配到就是true
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (token) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})
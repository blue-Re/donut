import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home/Home.vue'),
    meta:{isRequireFooter:true,requiresAuth:true},
  },
  {
    path: '/more',
    name: 'More',
    component: () => import(/* webpackChunkName: "about" */ '../views/More/More.vue'),
    meta:{isRequireFooter:true,requiresAuth:true}
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import(/* webpackChunkName: "about" */ '../views/Publish'),
    meta:{isRequireFooter:true,requiresAuth:true}
  },
  
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register/Register.vue')
  },
  {
    path: '/friends',
    name: 'Friends',
    component: () => import(/* webpackChunkName: "about" */ '../views/Friends/Friends.vue'),
    meta:{isRequireFooter:true,requiresAuth:true},
  },
  {
    path:'/chat/:id/:username',
    meta:{isRequireFooter:false,requiresAuth:true},
    component:()=>import(/* webpackChunkName: "about" */ '../views/Friends/child/Chat.vue'),
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "about" */ '../views/Mine/Mine.vue'),
    meta:{isRequireFooter:true,requiresAuth:true},
  },
  {
    path:'/edit',
    name:'Edit',
    component:()=>import('../views/Edit'),
    meta:{isRequireFooter:false,requiresAuth:true},
  }
]

const router = new VueRouter({
  routes
})


export default router

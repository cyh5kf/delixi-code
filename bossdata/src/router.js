import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import { getLocalStorageItem } from '@/assets/util.js'
import NavigationBar from '@/components/NavBar.vue';
import Prepayment from '@/views/Prepayment.vue';

Vue.use(Router)

const guardRoute = (to, from, next) => {
  const expiryTime = getLocalStorageItem('expiryTime');
  if(expiryTime) {
      const now = Math.round(new Date().getTime()/1000);
      if(now >= expiryTime) { // 登录状态过期
        localStorage.clear();
        next('/login')
      } else {
        next()
      }
  } else {
      localStorage.clear();
      next('/login')
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      components:{
          default:Home,
          navigationBar:NavigationBar
      },
      beforeEnter: guardRoute
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/nopayOrder',
      name: 'nopayOrder',
      // component: () => import(/* webpackChunkName: "about" */ './views/NopayOrder.vue'),
      components:{
          default:() => import(/* webpackChunkName: "about" */ './views/NopayOrder.vue'),
          navigationBar:NavigationBar
      },
      beforeEnter: guardRoute
    },
    {
      path: '/prepayment',
      name: 'prepayment',
      components:{
        default:Prepayment,
        navigationBar:NavigationBar
      },
      beforeEnter: guardRoute
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Shelf from '@/components/Shelf'
import LogIn from '@/components/LogIn'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/shelf',
      name: 'Shelf',
      component: Shelf
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

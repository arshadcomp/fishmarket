import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store'

// import { Auth } from 'aws-amplify'

import Home from '@/pages/Home';
// import Cart from '@/pages/Cart';
import Login from '@/pages/Login';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Orders from '@/pages/Orders';

import AdminRoutes from './admin'
import ProfileRoutes from './profile'
import CartRoutes from './cart'


Vue.use(Router);

// const requireAuth = (to, from, next) => {
//   // if(store.state.user !== null)
//   //   next()
//   next('/login')
// }

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: {
        requiresAuth: true
      },
		},
		AdminRoutes,
    ProfileRoutes,
    CartRoutes
  ]
});

router.beforeResolve((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // console.log('ROUTE USER', store.state.user)
    if(store.state.user===null)
      next({path: '/login'})
    
    if(to.matched.some(record => record.meta.admin)) {
      try {
        if(store.state.user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('admin')!==-1)
          next()
      } catch (error) {
        next({path: '/restricted'})
      }
    }
    
    next()
  }

  /*
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('ROUTE USER', store.state.user)
    // console.log('ROUTE RECORD', record)
    // if(this.$user){
    //   if(record.meta.admin){
    //     if(this.$user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('admin')!==-1)
    //       next()
    //     next({path: '/restricted'})
    //   } else
    //     next()
    // }
    // next({path: '/login'})

    // Auth.currentAuthenticatedUser().then(() =>
    // this.$user.signInUserSession.accessToken.payload['cognito:groups']. .then(() => {
    //   next()
    // }).catch(() => {
    //   next({
    //     path: '/login'
    //   });
    // });
  }
  */

  // if (to.matched.some(record => record.meta.admin)) {
    
  // }



  next()
})


export default router
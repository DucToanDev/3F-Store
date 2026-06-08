import Vue from 'vue'
import Router from 'vue-router'
import StoreHome from '@/components/StoreHome'
import ProductDetail from '@/components/ProductDetail'
import ProductListing from '@/components/ProductListing'
import CategoryPage from '@/components/CategoryPage'
import CartPage from '@/components/CartPage'
import CheckoutPage from '@/components/CheckoutPage'
import AuthPage from '@/components/AuthPage'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'StoreHome',
      component: StoreHome
    },
    {
      path: '/products',
      name: 'ProductListing',
      component: ProductListing
    },
    {
      path: '/categories',
      name: 'CategoryPage',
      component: CategoryPage
    },
    {
      path: '/cart',
      name: 'CartPage',
      component: CartPage
    },
    {
      path: '/checkout',
      name: 'CheckoutPage',
      component: CheckoutPage
    },
    {
      path: '/login',
      name: 'AuthPage',
      component: AuthPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: AuthPage
    },
    {
      path: '/product/:slug',
      name: 'ProductDetail',
      component: ProductDetail
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import StoreHome from '@/components/StoreHome'
import ProductDetail from '@/components/ProductDetail'
import ProductListing from '@/components/ProductListing'
import CategoryPage from '@/components/CategoryPage'

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
      path: '/product/:slug',
      name: 'ProductDetail',
      component: ProductDetail
    }
  ]
})

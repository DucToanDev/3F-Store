<template>
  <div id="app">
    <router-view />
    <CartDrawer />
    <PageTransition ref="pageTransition" />
  </div>
</template>

<script>
import PageTransition from '@/components/PageTransition'
import CartDrawer from '@/components/cart/CartDrawer'

export default {
  name: 'App',
  components: {
    PageTransition,
    CartDrawer
  },
  data () {
    return {
      isTransitioning: false,
      removeRouteGuard: null
    }
  },
  mounted () {
    this.removeRouteGuard = this.$router.beforeEach((to, from, next) => {
      const transition = this.$refs.pageTransition

      if (!from.name || to.fullPath === from.fullPath || !transition || this.isTransitioning) {
        next()
        return
      }

      this.isTransitioning = true
      transition.playTransition(() => {
        next()
        this.$nextTick(this.scrollToTop)
        this.isTransitioning = false
      })
    })
  },
  beforeDestroy () {
    if (this.removeRouteGuard) this.removeRouteGuard()
  },
  methods: {
    scrollToTop () {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }
}
</script>

<style>
html,
body {
  font-family: "Quicksand", Arial, sans-serif;
}

#app {
  min-height: 100vh;
}

.font-desgin {
  font-family: "Quicksand", Arial, sans-serif;
}
</style>

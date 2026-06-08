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
      removeRouteGuard: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      const transition = this.$refs.pageTransition
      if (transition && !window.__initial3fTransitionPlayed) {
        window.__initial3fTransitionPlayed = true
        transition.playTransition()
      }
    })

    this.removeRouteGuard = this.$router.beforeEach((to, from, next) => {
      next()
      if (from.name && to.fullPath !== from.fullPath) this.$nextTick(this.scrollToTop)
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

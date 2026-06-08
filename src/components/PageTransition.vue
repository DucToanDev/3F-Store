<template>
  <div ref="overlay" class="page-transition" aria-hidden="true">
    <div ref="logoWrap" class="transition-logo-wrap">
      <img :src="logoImage" alt="" class="transition-logo">
    </div>

    <img ref="pawMask" :src="pawImage" alt="" class="paw-mask">

    <div ref="ripple" class="ripple" />
  </div>
</template>

<script>
import { gsap } from 'gsap/dist/gsap'

export default {
  name: 'PageTransition',
  data () {
    return {
      timeline: null,
      pawImage: require('@/assets/images/paw.png'),
      logoImage: require('@/assets/images/logo.webp')
    }
  },
  mounted () {
    gsap.set(this.$refs.overlay, { autoAlpha: 0, display: 'none' })
  },
  beforeDestroy () {
    if (this.timeline) this.timeline.kill()
  },
  methods: {
    playEnter (done) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        done()
        return
      }

      if (this.timeline) this.timeline.kill()

      const overlay = this.$refs.overlay
      const ripple = this.$refs.ripple
      const pawMask = this.$refs.pawMask
      const logoWrap = this.$refs.logoWrap

      this.timeline = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: done
      })

      this.timeline
        .set(overlay, { display: 'block', autoAlpha: 1, xPercent: 0 })
        .set(ripple, { scale: 0, autoAlpha: 0.28 })
        .set(pawMask, { xPercent: -170, yPercent: -50, scale: 1.2, autoAlpha: 0.95, rotate: -6 })
        .set(logoWrap, { y: 16, scale: 0.9, autoAlpha: 0 })
        .fromTo(
          overlay,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.22, ease: 'power2.out' }
        )
        .to(
          pawMask,
          {
            xPercent: 72,
            yPercent: -50,
            scale: 1.85,
            autoAlpha: 0.92,
            rotate: 8,
            duration: 0.56
          },
          '-=0.02'
        )
        .to(
          pawMask,
          {
            xPercent: 148,
            yPercent: -50,
            scale: 2.15,
            autoAlpha: 0,
            rotate: 14,
            duration: 0.22,
            ease: 'power2.in'
          },
          '-=0.08'
        )
        .fromTo(
          logoWrap,
          { y: 16, scale: 0.9, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, duration: 0.28, ease: 'back.out(1.7)' },
          '-=0.02'
        )
        .to(
          ripple,
          { scale: 6.8, autoAlpha: 0, duration: 0.52, ease: 'power2.out' },
          '-=0.2'
        )
        .to(
          logoWrap,
          { y: -8, autoAlpha: 0, duration: 0.22, ease: 'power2.inOut' },
          '-=0.2'
        )
    },
    playExit () {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(this.$refs.overlay, { autoAlpha: 0, display: 'none' })
        return
      }

      if (this.timeline) this.timeline.kill()

      this.timeline = gsap.timeline()
      this.timeline
        .to(this.$refs.overlay, {
          xPercent: 8,
          autoAlpha: 0,
          duration: 0.34,
          ease: 'power2.inOut'
        })
        .set(this.$refs.overlay, {
          display: 'none',
          xPercent: 0,
          clipPath: 'inset(0 100% 0 0)'
        })
    },
    playTransition (done) {
      this.playEnter(() => {
        if (done) done()
        this.$nextTick(() => {
          window.setTimeout(this.playExit, 80)
        })
      })
    }
  }
}
</script>

<style scoped>
.page-transition {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
  background:
    radial-gradient(circle at 26% 28%, rgba(255, 193, 7, 0.18), transparent 26%),
    radial-gradient(circle at 74% 72%, rgba(123, 160, 91, 0.16), transparent 30%),
    linear-gradient(135deg, #eef5ff 0%, #f8fbff 50%, #eaf6f0 100%);
}

.transition-logo-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  will-change: transform, opacity;
}

.transition-logo {
  width: min(180px, 46vw);
  height: auto;
  display: block;
  filter: drop-shadow(0 14px 26px rgba(80, 48, 24, 0.18));
}

.paw-mask {
  position: absolute;
  left: 50%;
  top: 50%;
  width: min(62vw, 640px);
  height: min(62vw, 640px);
  object-fit: contain;
  will-change: transform, opacity;
  filter: drop-shadow(0 18px 34px rgba(0, 81, 255, 0.12));
}

.ripple {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 180px;
  height: 180px;
  border: 3px solid rgba(0, 81, 255, 0.18);
  border-radius: 999px;
  transform: translate(-50%, -50%);
}

@media (max-width: 640px) {
  .paw-mask {
    width: 420px;
    height: 420px;
  }
}
</style>

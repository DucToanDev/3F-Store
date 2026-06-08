<template>
  <div class="paw-trail-layer" aria-hidden="true">
    <img
      v-for="paw in paws"
      :key="paw.id"
      :src="pawImage"
      class="trail-paw"
      :style="paw.style"
      alt=""
    >
  </div>
</template>

<script>
import { gsap } from 'gsap/dist/gsap'

export default {
  name: 'PawTrail',
  data () {
    return {
      pawImage: require('@/assets/images/paw.png'),
      paws: [],
      lastY: 0,
      lastSpawnAt: 0,
      nextId: 1,
      removeTimers: []
    }
  },
  mounted () {
    this.lastY = window.pageYOffset || 0
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
    this.removeTimers.forEach(timer => window.clearTimeout(timer))
  },
  methods: {
    onScroll () {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const now = Date.now()
      const currentY = window.pageYOffset || 0
      const delta = Math.abs(currentY - this.lastY)

      if (delta < 24 || now - this.lastSpawnAt < 170) {
        this.lastY = currentY
        return
      }

      this.lastY = currentY
      this.lastSpawnAt = now
      this.spawnPaw(currentY > this.lastY ? 1 : -1)
    },
    spawnPaw () {
      const id = this.nextId
      const right = 20 + Math.round(Math.random() * 34)
      const top = 76 + Math.round(Math.random() * (window.innerHeight - 170))
      const rotate = -24 + Math.round(Math.random() * 48)
      const size = 26 + Math.round(Math.random() * 12)

      this.paws.push({
        id,
        style: {
          right: right + 'px',
          top: top + 'px',
          width: size + 'px',
          height: size + 'px',
          transform: 'rotate(' + rotate + 'deg)'
        }
      })
      this.nextId += 1

      this.$nextTick(() => {
        const nodes = this.$el.querySelectorAll('.trail-paw')
        const node = nodes[nodes.length - 1]
        if (!node) return

        gsap.fromTo(
          node,
          { autoAlpha: 0, y: 8, scale: 0.72 },
          {
            autoAlpha: 0.18,
            y: 0,
            scale: 1,
            duration: 0.18,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(node, {
                autoAlpha: 0,
                y: -10,
                duration: 0.75,
                delay: 0.35,
                ease: 'power2.out'
              })
            }
          }
        )
      })

      const timer = window.setTimeout(() => {
        this.paws = this.paws.filter(paw => paw.id !== id)
      }, 1400)
      this.removeTimers.push(timer)
    }
  }
}
</script>

<style scoped>
.paw-trail-layer {
  position: fixed;
  inset: 0;
  z-index: 35;
  pointer-events: none;
  overflow: hidden;
}

.trail-paw {
  position: absolute;
  object-fit: contain;
  opacity: 0;
  filter: drop-shadow(0 6px 10px rgba(80, 48, 24, 0.08));
  will-change: transform, opacity;
}

@media (max-width: 768px) {
  .paw-trail-layer {
    display: none;
  }
}
</style>

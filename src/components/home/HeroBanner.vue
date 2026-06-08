<template>
  <section class="hero-banner-section w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden relative shadow-sm group">
    <div ref="bannerSlider" class="flex w-full h-full overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth-custom" @scroll="onBannerScroll">
      <img v-for="banner in banners" :key="banner.alt" :src="banner.src" class="w-full h-full object-cover shrink-0 snap-center" :alt="banner.alt">
    </div>
    <button type="button" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-gray-800 items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-md hidden md:flex active:scale-95" @click="prevBanner">
      <i class="fa-solid fa-chevron-left text-sm" />
    </button>
    <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white text-gray-800 items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-md hidden md:flex active:scale-95" @click="nextBanner">
      <i class="fa-solid fa-chevron-right text-sm" />
    </button>
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
      <button
        v-for="(banner, index) in banners"
        :key="banner.alt + '-dot'"
        type="button"
        class="w-2 h-2 rounded-full cursor-pointer transition-all"
        :class="index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'"
        :aria-label="'Chuyển đến ' + banner.alt"
        @click="goToBanner(index)"
      />
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroBanner',
  props: {
    banners: { type: Array, required: true }
  },
  data () {
    return {
      currentIndex: 0,
      timer: null
    }
  },
  mounted () {
    this.timer = window.setInterval(this.nextBanner, 4000)
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
  },
  methods: {
    onBannerScroll () {
      const slider = this.$refs.bannerSlider
      if (!slider) return
      this.currentIndex = Math.round(slider.scrollLeft / slider.clientWidth)
    },
    goToBanner (index) {
      const slider = this.$refs.bannerSlider
      if (!slider) return
      slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' })
      this.currentIndex = index
    },
    nextBanner () {
      const nextIndex = this.currentIndex === this.banners.length - 1 ? 0 : this.currentIndex + 1
      this.goToBanner(nextIndex)
    },
    prevBanner () {
      const prevIndex = this.currentIndex === 0 ? this.banners.length - 1 : this.currentIndex - 1
      this.goToBanner(prevIndex)
    }
  }
}
</script>

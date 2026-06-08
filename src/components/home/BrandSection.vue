<template>
  <section class="brand-section gsap-reveal relative overflow-hidden px-4 md:px-6 lg:px-8 py-10">
    <h2 class="brand-heading text-xl md:text-2xl font-bold text-gray-800 mb-6 tracking-tight">Thương hiệu Boss thích</h2>
    <div class="relative brand-wrapper group">
      <div ref="brandContainer" class="brand-container flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 scroll-smooth-custom">
        <div
          v-for="brand in brands"
          :key="brand.name"
          class="brand-card w-[160px] md:w-[190px] h-[90px] md:h-[110px] bg-white border border-gray-200 rounded-xl flex items-center justify-center p-4 snap-start hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer shrink-0"
        >
          <img :src="brand.logo" :alt="brand.name" class="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300">
        </div>
      </div>
      <button
        type="button"
        class="absolute -right-5 top-[40%] -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full hidden md:flex items-center justify-center shadow-lg text-gray-400 hover:text-blue-600 hover:scale-105 transition-all z-10 cursor-pointer opacity-0 group-hover:opacity-100"
        @click="scrollBrands"
      >
        <i class="fa-solid fa-chevron-right text-sm" />
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BrandSection',
  props: {
    brands: { type: Array, required: true }
  },
  methods: {
    scrollBrands () {
      const container = this.$refs.brandContainer
      if (!container) return
      const firstCard = container.querySelector('.brand-card')
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 190
      container.scrollBy({ left: cardWidth + 16, behavior: 'smooth' })
    }
  }
}
</script>

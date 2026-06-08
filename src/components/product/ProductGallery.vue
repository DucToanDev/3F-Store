<template>
  <section class="product-gallery bg-white rounded-2xl border border-gray-100 p-3 md:p-4">
    <div class="relative aspect-[4/3] rounded-xl bg-white overflow-hidden flex items-center justify-center">
      <img :src="activeImage" :alt="title" class="w-full h-full object-contain">

      <button type="button" class="gallery-nav left-3" aria-label="Anh truoc" @click="prevImage">
        <i class="fa-solid fa-chevron-left text-xs" />
      </button>
      <button type="button" class="gallery-nav right-3" aria-label="Anh sau" @click="nextImage">
        <i class="fa-solid fa-chevron-right text-xs" />
      </button>
    </div>

    <div class="grid grid-cols-4 gap-3 mt-4">
      <button
        v-for="(image, index) in images"
        :key="image"
        type="button"
        class="aspect-square rounded-xl border bg-white overflow-hidden p-1.5 transition"
        :class="index === activeIndex ? 'border-[#0051ff] ring-2 ring-blue-100' : 'border-gray-200 hover:border-blue-200'"
        @click="activeIndex = index"
      >
        <img :src="image" :alt="title + ' ' + (index + 1)" class="w-full h-full object-contain">
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProductGallery',
  props: {
    title: { type: String, required: true },
    images: { type: Array, required: true }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  computed: {
    activeImage () {
      return this.images[this.activeIndex]
    }
  },
  watch: {
    images () {
      this.activeIndex = 0
    }
  },
  methods: {
    nextImage () {
      this.activeIndex = this.activeIndex === this.images.length - 1 ? 0 : this.activeIndex + 1
    },
    prevImage () {
      this.activeIndex = this.activeIndex === 0 ? this.images.length - 1 : this.activeIndex - 1
    }
  }
}
</script>

<style scoped>
.gallery-nav {
  position: absolute;
  top: 50%;
  width: 36px;
  height: 36px;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #64748b;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
  transition: color 0.2s ease, transform 0.2s ease;
}

.gallery-nav:hover {
  color: #0051ff;
  transform: translateY(-50%) scale(1.04);
}
</style>

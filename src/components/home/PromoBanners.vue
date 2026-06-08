<template>
  <section class="gsap-reveal">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <a v-for="promo in promos" :key="promo.alt" href="#" class="block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-[16/9] md:aspect-[8/5]">
        <img :src="promo.src" :alt="promo.alt" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PromoBanners',
  props: {
    promos: { type: Array, required: true }
  }
}
</script>

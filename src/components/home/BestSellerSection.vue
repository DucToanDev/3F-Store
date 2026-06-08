<template>
  <section class="best-seller-section gsap-reveal relative bg-[#ffffff] pt-8 pb-12 rounded-3xl overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-[300px] z-0 pointer-events-none">
      <img :src="background" alt="Background Banner" class="w-full h-full object-cover object-top">
      <div class="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-[#0a0f1d] to-transparent" />
    </div>
    <div class="relative z-10 px-4 md:px-6 lg:px-8">
      <div class="flex flex-wrap gap-2 justify-between items-center mb-8">
        <div class="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-gray-400/40 bg-[#0a0f1d]/60 backdrop-blur-md text-white shadow-sm">
          <i class="fa-solid fa-arrow-trend-up text-[#ff4d4f]" />
          <span class="font-bold text-[15px] tracking-wide">#Sản phẩm bán chạy nhất</span>
        </div>
        <router-link to="/products" class="bg-[#1a56db] hover:bg-blue-500 text-white text-sm font-bold px-6 py-2 rounded-md transition-all shadow-[0_0_15px_rgba(26,86,219,0.6)] active:scale-95">
          Khám phá
        </router-link>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from './ProductCard'

export default {
  name: 'BestSellerSection',
  components: {
    ProductCard
  },
  props: {
    background: { type: String, required: true },
    products: { type: Array, required: true }
  }
}
</script>

<template>
  <div
    class="product-card group relative bg-white border border-gray-100 rounded-xl p-2.5 flex flex-col shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer"
    :class="{ 'hidden lg:flex': product.hideOnSmall }"
    @click="goToDetail"
  >
    <span class="absolute top-2.5 left-2.5 bg-[#ffc107] text-gray-900 text-[9px] font-black px-1.5 py-0.5 rounded-sm z-10 tracking-wide">{{ product.discount }}</span>
    <button type="button" class="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-[0_2px_8px_rgba(0,0,0,0.08)] z-10 transition-colors" @click.stop>
      <i class="fa-regular fa-heart text-[12px]" />
    </button>
    <router-link :to="product.to || defaultProductLink" class="aspect-square mb-2.5 overflow-hidden rounded-lg bg-transparent flex items-center justify-center p-4 cursor-pointer relative">
      <img :src="product.image" :alt="product.name" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply">
    </router-link>
    <div class="flex flex-col flex-1">
      <a href="#" class="text-[#0051ff] font-bold text-[12px] uppercase mb-1 hover:underline">{{ product.brand }}</a>
      <router-link :to="product.to || defaultProductLink" class="text-[14px] text-gray-800 font-bold leading-[1.2] h-[34px] line-clamp-2 mb-2 hover:text-[#0051ff] transition-colors">
        {{ product.name }}
      </router-link>
      <div class="flex items-center text-[12px] text-gray-500 mb-3 font-medium">
        <i class="fa-solid fa-star text-[#ffc107] mr-1" /> {{ product.rating }}
        <span class="mx-1.5 text-gray-300">|</span>
        {{ product.sold }}
      </div>
      <div class="flex justify-between items-end mt-auto pt-1">
        <div class="flex flex-col leading-tight">
          <span class="text-[12px] text-gray-400 line-through decoration-gray-300 mb-0.5">{{ product.originalPrice }}</span>
          <span class="text-[16px] font-black text-[#0051ff]">{{ product.price }}</span>
        </div>
        <button type="button" class="w-7 h-7 bg-[#0051ff] hover:bg-blue-700 active:scale-95 text-white rounded-lg flex items-center justify-center transition-all shadow-sm" @click.stop="addToCart">
          <i class="fa-solid fa-bag-shopping text-[11px]" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import cart from '@/store/cart'

export default {
  name: 'ProductCard',
  props: {
    product: { type: Object, required: true }
  },
  data () {
    return {
      defaultProductLink: '/products',
      cart
    }
  },
  methods: {
    goToDetail (event) {
      if (event.target.closest('a, button')) return

      const target = this.product.to || this.defaultProductLink
      if (this.$route.path !== target) this.$router.push(target)
    },
    addToCart () {
      this.cart.add(this.product)
    }
  }
}
</script>

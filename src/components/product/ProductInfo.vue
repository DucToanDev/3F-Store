<template>
  <section class="bg-white rounded-2xl border border-gray-100 p-4 md:p-5">
    <h1 class="text-xl md:text-2xl font-black text-gray-900 leading-tight">
      {{ product.title }}
    </h1>

    <div class="flex flex-wrap items-center gap-3 mt-3 text-xs md:text-sm">
      <div class="flex items-center gap-1 text-[#ffc107]">
        <i v-for="star in 5" :key="star" class="fa-solid fa-star" />
      </div>
      <span class="font-bold text-gray-700">{{ product.rating || "5.0" }}</span>
      <span class="text-blue-600">({{ reviewText }})</span>
      <span class="w-px h-4 bg-gray-200" />
      <span class="text-gray-500">{{ product.soldText || "Đã bán 100+" }}</span>
      <span class="w-px h-4 bg-gray-200" />
      <span class="text-green-600 font-bold flex items-center gap-1">
        <i class="fa-regular fa-circle-check" /> Còn hàng
      </span>
    </div>

    <div class="flex flex-wrap items-end gap-3 mt-4">
      <span class="text-3xl font-black text-[#0051ff]">{{
        selectedVariant.price || product.price
      }}</span>
      <span
        v-if="product.originalPrice"
        class="text-lg text-gray-400 line-through mb-1"
        >{{ product.originalPrice }}</span
      >
      <span
        v-if="selectedVariant.discount || product.discount"
        class="bg-red-50 text-red-500 border border-red-100 text-xs font-bold px-2 py-1 rounded"
      >
        {{ selectedVariant.discount || product.discount }}
      </span>
    </div>

    <div class="mt-4">
      <div class="text-sm text-gray-700 font-bold mb-2">
        Mã giảm giá có thể áp dụng:
      </div>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="coupon in product.coupons"
          :key="coupon"
          class="coupon-chip"
          >{{ coupon }}</span
        >
      </div>
    </div>

    <p class="text-sm leading-relaxed text-gray-600 mt-4">
      {{ product.summary }}
    </p>

    <div class="grid grid-cols-2 gap-3 mt-4 text-sm">
      <div>
        <span class="text-gray-500">Thương hiệu:</span>
        <span class="font-bold text-gray-800">{{ product.brand }}</span>
      </div>
      <div>
        <span class="text-gray-500">Nguồn:</span>
        <span class="font-bold text-gray-800">{{ product.origin }}</span>
      </div>
    </div>

    <div v-if="product.variants.length" class="mt-5">
      <div class="text-sm font-bold text-gray-800 mb-3">Phân loại</div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        <button
          v-for="variant in product.variants"
          :key="variant.slug"
          type="button"
          class="relative min-h-[64px] rounded-xl border px-2 py-2 text-xs font-bold transition"
          :class="
            selectedVariant.slug === variant.slug
              ? 'border-[#0051ff] text-[#0051ff] bg-blue-50'
              : 'border-gray-200 text-gray-700 hover:border-blue-200'
          "
          @click="selectVariant(variant)"
        >
          <span
            v-if="variant.discount"
            class="absolute -top-2 right-2 bg-red-500 text-white text-[9px] rounded-full px-1.5 py-0.5"
            >{{ variant.discount }}</span
          >
          <span class="block leading-tight line-clamp-2">{{
            variant.name
          }}</span>
          <span class="block text-[10px] font-medium mt-1 text-gray-500">{{
            variant.price
          }}</span>
        </button>
      </div>
    </div>

    <div class="mt-5 text-sm text-gray-600">
      SKU:
      <span class="font-bold text-gray-800">{{ activeCartProduct.sku }}</span>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 mt-3">
      <div class="qty-control">
        <button type="button" aria-label="Giảm số lượng" @click="decrease">
          −
        </button>
        <span>{{ quantity }}</span>
        <button type="button" aria-label="Tăng số lượng" @click="quantity += 1">
          +
        </button>
      </div>
      <button
        type="button"
        class="w-full sm:flex-1 h-12 rounded-xl bg-[#0051ff] hover:bg-blue-700 text-white font-black text-sm flex items-center justify-center gap-2 transition active:scale-[0.99]"
        @click="$emit('add-to-cart', { product: activeCartProduct, quantity })"
      >
        <i class="fa-solid fa-cart-shopping" /> Thêm vào giỏ hàng
      </button>
      <button
        type="button"
        class="w-full sm:w-12 h-12 rounded-xl border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-100 transition"
      >
        <i class="fa-regular fa-heart text-lg" />
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProductInfo",
  props: {
    product: { type: Object, required: true },
  },
  data() {
    return {
      quantity: 1,
      selectedVariantSlug: this.product.slug,
    };
  },
  computed: {
    selectedVariant() {
      return (
        this.product.variants.find(
          (variant) => variant.slug === this.selectedVariantSlug
        ) ||
        this.product.variants[0] ||
        {}
      );
    },
    activeCartProduct() {
      return this.selectedVariant.product || this.product.cartProduct;
    },
    reviewText() {
      return this.product.rating ? "đánh giá từ Shopee" : "chưa có đánh giá";
    },
  },
  watch: {
    "product.slug"(slug) {
      this.selectedVariantSlug = slug;
      this.quantity = 1;
    },
  },
  methods: {
    decrease() {
      if (this.quantity > 1) this.quantity -= 1;
    },
    selectVariant(variant) {
      this.selectedVariantSlug = variant.slug;
    },
  },
};
</script>

<style scoped>
.coupon-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #fecaca;
  background: #fff7f7;
  color: #ef4444;
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 800;
}

.qty-control {
  width: 136px;
  height: 48px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  display: grid;
  grid-template-columns: 36px 1fr 36px;
  align-items: center;
  background: #fff;
}

.qty-control button,
.qty-control span {
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  font-weight: 800;
}

.qty-control button:hover {
  color: #0051ff;
}
</style>

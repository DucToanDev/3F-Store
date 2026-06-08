<template>
  <section class="bg-white border border-gray-100 rounded-2xl p-5 md:p-6">
    <div class="flex items-center gap-2 mb-4">
      <i class="fa-solid fa-bowl-food text-[#0051ff]" />
      <h2 class="text-lg md:text-xl font-black text-gray-900">Thông tin sản phẩm</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
      <div class="product-description text-sm leading-relaxed text-gray-600" v-html="product.description" />

      <div class="rounded-xl bg-[#f8fafc] border border-gray-100 p-4">
        <h3 class="font-black text-gray-800 mb-3">Thông tin nhanh</h3>
        <dl class="space-y-3 text-sm text-gray-600">
          <div class="flex items-start justify-between gap-4">
            <dt>Thương hiệu</dt>
            <dd class="font-bold text-gray-800 text-right">{{ product.brand }}</dd>
          </div>
          <div class="flex items-start justify-between gap-4">
            <dt>Danh mục</dt>
            <dd class="font-bold text-gray-800 text-right">{{ product.categoryLabel }}</dd>
          </div>
          <div class="flex items-start justify-between gap-4">
            <dt>Phân loại</dt>
            <dd class="font-bold text-gray-800 text-right">{{ product.variants.length }} lựa chọn</dd>
          </div>
          <div class="flex items-start justify-between gap-4">
            <dt>Nguồn dữ liệu</dt>
            <dd class="font-bold text-gray-800 text-right">{{ product.origin }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProductDescription',
  props: {
    product: { type: Object, required: true }
  }
}
</script>

<style scoped>
.product-description >>> br {
  display: block;
  content: '';
  margin-top: 10px;
}
</style>

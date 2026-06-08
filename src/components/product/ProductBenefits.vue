<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-2xl bg-gray-200 border border-gray-100">
    <div v-for="item in benefits" :key="item.title" class="bg-[#f4f6ff] px-4 py-3 flex items-center gap-3">
      <div class="w-9 h-9 rounded-full flex items-center justify-center shrink-0" :class="item.bg">
        <i :class="[item.icon, item.color]" />
      </div>
      <div class="min-w-0">
        <div class="text-sm font-black text-gray-800">{{ item.title }}</div>
        <div class="text-xs text-gray-500 mt-0.5">{{ item.caption }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProductBenefits',
  data () {
    return {
      benefits: [
        { icon: 'fa-solid fa-truck-fast', title: 'Giao hỏa tốc 2H', caption: 'Nội thành TP.HCM', bg: 'bg-blue-100', color: 'text-blue-600' },
        { icon: 'fa-solid fa-cube', title: 'Freeship toàn quốc', caption: 'Từ hạng Gold', bg: 'bg-indigo-100', color: 'text-indigo-600' },
        { icon: 'fa-solid fa-crown', title: 'Voucher thăng hạng', caption: 'Đến 400.000đ mỗi cấp mới', bg: 'bg-yellow-100', color: 'text-yellow-600' },
        { icon: 'fa-solid fa-star', title: '1.000 điểm = 1.000đ giảm', caption: 'Hoàn điểm 12% giá trị đơn', bg: 'bg-yellow-100', color: 'text-yellow-600' },
        { icon: 'fa-solid fa-rotate-left', title: 'Đổi trả miễn phí', caption: 'Trong 7 ngày', bg: 'bg-blue-100', color: 'text-blue-600' },
        { icon: 'fa-solid fa-circle-check', title: '100% chính hãng', caption: '200+ thương hiệu', bg: 'bg-blue-100', color: 'text-blue-600' }
      ]
    }
  }
}
</script>

<template>
  <section class="gsap-reveal">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg md:text-xl font-bold text-gray-800 md:text-gray-800 flex items-center gap-2">
        <i class="fa-solid fa-ticket text-red-500" /> Mã giảm giá
      </h2>
      <a href="#" class="text-blue-600 text-[13px] md:text-sm font-medium hover:underline flex items-center gap-1">
        Xem thêm <i class="fa-solid fa-arrow-right text-[10px] md:hidden" /><span class="hidden md:inline">→</span>
      </a>
    </div>

    <div class="flex gap-4 overflow-x-auto hide-scrollbar p-6 bg-gray-100 snap-x snap-mandatory rounded-lg">
      <div
        v-for="voucher in vouchers"
        :key="voucher.code"
        class="relative min-w-[320px] h-[110px] flex bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow snap-start"
      >
        <div class="w-3 rounded-l-lg" :class="voucher.color" />
        <div class="flex-1 flex flex-col justify-center p-3">
          <h3 class="font-bold text-lg leading-tight" :class="voucher.textColor">{{ voucher.title }}</h3>
          <p class="text-xs text-gray-500 mt-0.5">{{ voucher.condition }}</p>
          <div class="flex items-center gap-2 mt-2.5">
            <span class="bg-gray-50 text-gray-700 border border-gray-200 font-mono font-bold text-[11px] px-2 py-0.5 rounded tracking-wide">{{ voucher.code }}</span>
            <span class="bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded">Toàn Shop</span>
          </div>
        </div>
        <div class="relative w-[1px] border-l-2 border-dashed border-gray-200 my-2">
          <div class="absolute -top-3 -left-[9px] w-4 h-4 bg-gray-100 rounded-full" />
          <div class="absolute -bottom-3 -left-[9px] w-4 h-4 bg-gray-100 rounded-full" />
        </div>
        <div class="w-[90px] flex flex-col items-center justify-center px-2.5">
          <span class="text-[10px] text-gray-400 mb-2">{{ voucher.used }}</span>
          <button
            type="button"
            class="w-full bg-[#0051ff] hover:bg-blue-700 active:scale-95 text-white text-xs font-bold py-1.5 rounded-full transition-all"
            :class="{ 'bg-green-600 hover:bg-green-700': isSaved(voucher.code) }"
            @click="saveVoucher(voucher)"
          >
            {{ isSaved(voucher.code) ? 'Đã lưu' : 'Lưu' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'VoucherSection',
  props: {
    vouchers: { type: Array, required: true }
  },
  data () {
    return {
      savedCodes: this.getSavedCodes()
    }
  },
  methods: {
    isLoggedIn () {
      return Boolean(window.localStorage.getItem('3f_auth_user'))
    },
    getSavedCodes () {
      try {
        return JSON.parse(window.localStorage.getItem('3f_saved_vouchers') || '[]')
      } catch (error) {
        return []
      }
    },
    isSaved (code) {
      return this.savedCodes.indexOf(code) !== -1
    },
    saveVoucher (voucher) {
      if (!this.isLoggedIn()) {
        this.$router.push({ path: '/login', query: { redirect: this.$route.fullPath } })
        return
      }
      if (this.isSaved(voucher.code)) return
      this.savedCodes = this.savedCodes.concat(voucher.code)
      window.localStorage.setItem('3f_saved_vouchers', JSON.stringify(this.savedCodes))
    }
  }
}
</script>

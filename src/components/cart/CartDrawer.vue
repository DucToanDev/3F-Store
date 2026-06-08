<template>
  <div>
    <div
      class="fixed inset-0 z-[80] bg-black/70 transition-opacity"
      :class="cart.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      @click="cart.close"
    />

    <aside
      class="fixed right-0 top-0 z-[90] h-screen w-full max-w-[420px] bg-white shadow-2xl transition-transform duration-300 flex flex-col"
      :class="cart.isOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <header class="h-16 px-5 flex items-center justify-between border-b border-gray-100">
        <h2 class="text-lg font-black text-gray-900 flex items-center gap-2">
          <i class="fa-solid fa-cart-shopping text-[#0051ff]" />
          Giỏ hàng ({{ cart.count }})
        </h2>
        <button type="button" class="w-9 h-9 rounded-full hover:bg-gray-100 text-gray-500" aria-label="Đóng giỏ hàng" @click="cart.close">
          <i class="fa-solid fa-xmark" />
        </button>
      </header>

      <div v-if="cart.items.length" class="flex-1 overflow-y-auto p-4 space-y-3">
        <article v-for="item in cart.items" :key="item.slug" class="cart-item">
          <div class="w-16 h-16 rounded-lg bg-white border border-gray-100 p-2 shrink-0">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-contain">
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex gap-2">
              <h3 class="text-sm font-black text-gray-900 leading-snug line-clamp-2 flex-1">{{ item.name }}</h3>
              <button type="button" class="text-gray-400 hover:text-red-500 shrink-0" aria-label="Xóa sản phẩm" @click="cart.remove(item)">
                <i class="fa-regular fa-trash-can text-xs" />
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1 truncate">{{ item.brand }}</p>
            <div class="mt-3 flex items-center justify-between gap-3">
              <div class="qty-control">
                <button type="button" aria-label="Giảm số lượng" @click="cart.decrease(item)">-</button>
                <span>{{ item.quantity }}</span>
                <button type="button" aria-label="Tăng số lượng" @click="cart.increase(item)">+</button>
              </div>
              <strong class="text-sm text-gray-900 whitespace-nowrap">{{ formatMoney(item.priceValue * item.quantity) }}</strong>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="flex-1 flex flex-col items-center justify-center text-center px-8">
        <div class="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-[#0051ff] mb-4">
          <i class="fa-solid fa-cart-shopping text-2xl" />
        </div>
        <h3 class="text-lg font-black text-gray-900">Giỏ hàng đang trống</h3>
        <p class="text-sm text-gray-500 mt-2">Thêm sản phẩm để bắt đầu đơn hàng.</p>
      </div>

      <footer class="border-t border-gray-100 p-4 space-y-3">
        <div class="flex items-center justify-between text-sm text-gray-500">
          <span>Tạm tính:</span>
          <strong class="text-lg text-[#0051ff]">{{ formatMoney(cart.subtotal) }}</strong>
        </div>
        <button type="button" class="w-full h-12 rounded-xl bg-[#0051ff] hover:bg-blue-700 text-white font-black">
          Thanh toán
        </button>
        <button type="button" class="w-full h-11 rounded-xl border border-gray-200 text-gray-700 font-bold hover:border-[#0051ff] hover:text-[#0051ff]" @click="cart.close">
          Xem giỏ hàng
        </button>
      </footer>
    </aside>
  </div>
</template>

<script>
import cart from '@/store/cart'

export default {
  name: 'CartDrawer',
  data () {
    return {
      cart
    }
  },
  methods: {
    formatMoney (value) {
      return Number(value || 0).toLocaleString('vi-VN') + 'đ'
    }
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: 12px;
  border-radius: 12px;
  background: #eef2ff;
  padding: 12px;
}

.qty-control {
  height: 28px;
  display: grid;
  grid-template-columns: 28px 32px 28px;
  align-items: center;
  border-radius: 999px;
  background: #fff;
  color: #4b5563;
  font-size: 13px;
  font-weight: 800;
}

.qty-control button,
.qty-control span {
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.qty-control button:hover {
  color: #0051ff;
}
</style>

<template>
  <div class="min-h-screen bg-[#f4f6ff] text-gray-800 font-desgin">
    <SiteHeader
      :logo="images.logo"
      :search-keywords="searchKeywords"
      :mobile-menu="mobileMenu"
      :desktop-menu="desktopMenu"
    />

    <main class="max-w-7xl mx-auto px-4 py-5 md:py-8">
      <nav class="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <router-link to="/" class="hover:text-[#0051ff]">Trang chủ</router-link>
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-300" />
        <span class="font-bold text-gray-800">Giỏ hàng</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        <section class="cart-panel">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h1 class="text-2xl font-black text-gray-900">Giỏ hàng</h1>
              <p class="text-sm text-gray-500 mt-1">{{ displayItems.length }} sản phẩm trong giỏ</p>
            </div>
            <router-link to="/products" class="continue-link">
              <i class="fa-solid fa-chevron-left text-[10px]" />
              Tiếp tục mua hàng
            </router-link>
          </div>

          <div class="space-y-3">
            <article v-for="item in displayItems" :key="item.slug" class="cart-row">
              <div class="w-20 h-20 rounded-xl bg-white border border-gray-100 p-2 shrink-0">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-contain">
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex gap-3">
                  <div class="min-w-0 flex-1">
                    <h2 class="text-sm md:text-base font-black text-gray-900 leading-snug line-clamp-2">{{ item.name }}</h2>
                    <p class="text-xs text-gray-500 mt-1">{{ item.brand }}</p>
                  </div>
                  <button v-if="cart.items.length" type="button" class="remove-button" aria-label="Xóa sản phẩm" @click="cart.remove(item)">
                    <i class="fa-regular fa-trash-can" />
                  </button>
                </div>
                <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div class="qty-control">
                    <button type="button" :disabled="!cart.items.length" @click="cart.decrease(item)">-</button>
                    <span>{{ item.quantity }}</span>
                    <button type="button" :disabled="!cart.items.length" @click="cart.increase(item)">+</button>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-gray-400">{{ formatMoney(item.priceValue) }} / sản phẩm</p>
                    <strong class="text-lg font-black text-[#0051ff]">{{ formatMoney(item.priceValue * item.quantity) }}</strong>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        <aside class="cart-panel lg:sticky lg:top-36">
          <h2 class="text-lg font-black text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
          <div class="space-y-3 text-sm">
            <div class="summary-line">
              <span>Tạm tính</span>
              <strong>{{ formatMoney(subtotal) }}</strong>
            </div>
            <div class="summary-line">
              <span>Phí vận chuyển</span>
              <strong class="text-green-600">Miễn phí</strong>
            </div>
            <div class="coupon-box">
              <i class="fa-solid fa-ticket text-[#0051ff]" />
              Nhập mã giảm giá ở bước thanh toán
            </div>
          </div>
          <div class="flex items-end justify-between border-t border-gray-100 pt-4 mt-4">
            <span class="text-lg font-black text-gray-900">Tổng cộng</span>
            <strong class="text-2xl font-black text-[#0051ff]">{{ formatMoney(total) }}</strong>
          </div>
          <router-link to="/checkout" class="checkout-button">
            Tiến hành thanh toán
            <i class="fa-solid fa-arrow-right" />
          </router-link>
          <p class="text-center text-[11px] text-gray-400 mt-3">Bạn có thể kiểm tra địa chỉ và phương thức giao hàng ở bước sau</p>
        </aside>
      </div>
    </main>

    <SiteFooter
      :logo="images.logo"
      :gov-seal="images.govSeal"
      :footer-columns="footerColumns"
      :socials="socials"
    />
  </div>
</template>

<script>
import SiteHeader from './layout/SiteHeader'
import SiteFooter from './layout/SiteFooter'
import cart from '@/store/cart'
import products from '@/data/products'
import { searchKeywords, mobileMenu, desktopMenu, footerColumns, socials } from '@/data/site'

export default {
  name: 'CartPage',
  components: {
    SiteHeader,
    SiteFooter
  },
  data () {
    return {
      cart,
      searchKeywords,
      mobileMenu,
      desktopMenu,
      footerColumns,
      socials,
      images: {
        logo: require('@/assets/images/logo.webp'),
        govSeal: require('@/assets/images/gov-seal.webp')
      }
    }
  },
  computed: {
    displayItems () {
      if (this.cart.items.length) return this.cart.items
      const product = products[0]
      return [{
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        image: product.image,
        priceValue: product.priceValue,
        quantity: 1
      }]
    },
    subtotal () {
      return this.displayItems.reduce((total, item) => total + (item.priceValue || 0) * item.quantity, 0)
    },
    total () {
      return this.subtotal
    }
  },
  mounted () {
    this.cart.close()
  },
  methods: {
    formatMoney (value) {
      return Number(value || 0).toLocaleString('vi-VN') + 'đ'
    }
  }
}
</script>

<style scoped>
.cart-panel {
  border: 1px solid #edf0f8;
  border-radius: 16px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.035);
}

.continue-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0051ff;
  font-size: 13px;
  font-weight: 900;
}

.cart-row {
  display: flex;
  gap: 14px;
  border-radius: 14px;
  background: #f5f7ff;
  padding: 14px;
}

.remove-button {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  color: #9ca3af;
  background: #fff;
}

.remove-button:hover {
  color: #ef4444;
}

.qty-control {
  height: 36px;
  display: grid;
  grid-template-columns: 36px 42px 36px;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #fff;
  color: #4b5563;
  font-size: 14px;
  font-weight: 900;
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

.qty-control button:disabled {
  color: #cbd5e1;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: #4b5563;
}

.coupon-box {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  background: #f1f5ff;
  padding: 12px;
  color: #4b5563;
  font-size: 12px;
  font-weight: 800;
}

.checkout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 52px;
  margin-top: 16px;
  border-radius: 12px;
  background: #0051ff;
  color: #fff;
  font-size: 15px;
  font-weight: 900;
}

.checkout-button:hover {
  background: #003fd1;
}
</style>

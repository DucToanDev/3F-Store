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
        <router-link to="/cart" class="hover:text-[#0051ff]">Giỏ hàng</router-link>
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-300" />
        <span class="font-bold text-gray-800">Thanh toán</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
        <div class="space-y-4">
          <section class="checkout-card">
            <h2 class="checkout-title">Hình thức nhận hàng</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                v-for="method in receiveMethods"
                :key="method.value"
                type="button"
                class="receive-option"
                :class="{ active: receiveMethod === method.value }"
                @click="receiveMethod = method.value"
              >
                <i :class="method.icon" />
                <span>{{ method.label }}</span>
              </button>
            </div>
          </section>

          <section class="checkout-card">
            <h2 class="checkout-title">
              <i class="fa-solid fa-location-dot text-[#0051ff]" />
              Địa chỉ giao hàng
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="field">
                <span>Họ và tên *</span>
                <input v-model="form.name" type="text">
              </label>
              <label class="field">
                <span>Số điện thoại *</span>
                <input v-model="form.phone" type="tel">
                <small>Số điện thoại 10 chữ số</small>
              </label>
            </div>
            <label class="field mt-4">
              <span>Địa chỉ *</span>
              <input v-model="form.address" type="text" placeholder="Số nhà, tên đường">
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <label class="field select-field">
                <span>Tỉnh/Thành phố *</span>
                <select v-model="form.city">
                  <option value="">Chọn tỉnh/thành</option>
                  <option>TP. Hồ Chí Minh</option>
                  <option>Hà Nội</option>
                  <option>Đà Nẵng</option>
                </select>
              </label>
              <label class="field select-field">
                <span>Phường/Xã *</span>
                <select v-model="form.ward">
                  <option value="">Chọn phường/xã</option>
                  <option>An Khánh</option>
                  <option>Bình Trưng</option>
                  <option>Thảo Điền</option>
                </select>
              </label>
            </div>
          </section>

          <section class="checkout-card">
            <div class="flex items-center justify-between gap-4 mb-3">
              <h2 class="checkout-title mb-0">
                <i class="fa-solid fa-truck text-[#0051ff]" />
                Phương thức giao hàng
              </h2>
              <button type="button" class="text-xs font-black text-[#0051ff]">Xem tất cả <i class="fa-solid fa-chevron-down text-[10px]" /></button>
            </div>
            <div class="soft-option">
              <div>
                <p class="font-black text-gray-800">Giao hàng hỏa tốc</p>
                <p class="text-xs text-gray-500 mt-1">Nhận hàng trong 2 giờ</p>
              </div>
              <strong class="text-green-600 text-sm">Miễn phí</strong>
            </div>
            <h3 class="text-sm font-black text-gray-800 mt-4 mb-2">Giao từ cửa hàng</h3>
            <div class="store-row">
              <i class="fa-solid fa-location-dot text-gray-400" />
              <span>17 Tô Hiến Thành, P.13 - 0965233237</span>
              <i class="fa-solid fa-chevron-right ml-auto text-gray-400" />
            </div>
          </section>

          <section class="checkout-card">
            <div class="flex items-center justify-between gap-4 mb-3">
              <h2 class="checkout-title mb-0">
                <i class="fa-regular fa-credit-card text-[#0051ff]" />
                Phương thức thanh toán
              </h2>
              <button type="button" class="text-xs font-black text-[#0051ff]">Xem tất cả <i class="fa-solid fa-chevron-down text-[10px]" /></button>
            </div>
            <div class="soft-option justify-start gap-3" style="justify-content: flex-start;">
              <i class="fa-regular fa-credit-card text-[#0051ff] text-lg" />
              <div>
                <p class="font-black text-gray-800">Thẻ quốc tế</p>
                <p class="text-xs text-gray-500 mt-1">Visa, Mastercard, JCB, Amex</p>
              </div>
            </div>
          </section>

          <section class="checkout-card">
            <div class="flex items-center justify-between mb-4">
              <h2 class="checkout-title mb-0">
                <i class="fa-solid fa-bag-shopping text-[#0051ff]" />
                Đơn hàng ({{ displayItems.length }} sản phẩm)
              </h2>
              <strong class="text-sm text-gray-900">{{ formatMoney(subtotal) }}</strong>
            </div>
            <article v-for="item in displayItems" :key="item.slug" class="order-item">
              <div class="w-16 h-16 rounded-lg bg-white border border-gray-100 p-2 shrink-0">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-contain">
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="text-sm font-black text-gray-900 leading-snug line-clamp-2">{{ item.name }}</h3>
                <p class="text-xs text-gray-500 mt-1">{{ item.brand }} · x{{ item.quantity }}</p>
              </div>
              <strong class="text-sm text-gray-900 whitespace-nowrap">{{ formatMoney(item.priceValue * item.quantity) }}</strong>
            </article>
          </section>

          <section class="checkout-card">
            <h2 class="checkout-title">Ghi chú đơn hàng (tùy chọn)</h2>
            <textarea v-model="form.note" rows="4" placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn..." />
          </section>
        </div>

        <aside class="space-y-4 lg:sticky lg:top-36">
          <section class="checkout-card">
            <h2 class="checkout-title">
              <i class="fa-solid fa-tags text-[#0051ff]" />
              Ưu đãi & tùy chọn
            </h2>
            <div class="discount-box">
              <p class="text-sm font-black text-gray-800">Mã giảm giá</p>
              <p class="text-xs text-gray-500 mt-1">Sắp đủ điều kiện</p>
              <div class="coupon-card">
                <strong>Giảm 10.000đ</strong>
                <span>Boss10K · Mua thêm 50.000đ</span>
              </div>
              <button type="button" class="w-full flex items-center justify-between text-xs font-bold text-gray-600 mt-3">
                Có mã khác? Nhập mã
                <i class="fa-solid fa-chevron-down text-[10px]" />
              </button>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-bold text-gray-700">
              <span><i class="fa-solid fa-gift text-[#0051ff] mr-2" />Thẻ quà tặng</span>
              <i class="fa-solid fa-chevron-down text-[10px]" />
            </div>
          </section>

          <section class="checkout-card">
            <div class="summary-line">
              <span>Tạm tính</span>
              <strong>{{ formatMoney(subtotal) }}</strong>
            </div>
            <div class="summary-line">
              <span>Phí vận chuyển</span>
              <strong class="text-green-600">Miễn phí</strong>
            </div>
            <div class="summary-line text-xs">
              <span>Giao hàng hỏa tốc</span>
              <span>Nhận hàng trong 2 giờ</span>
            </div>
            <div class="points-box">
              <i class="fa-solid fa-crown" />
              Bạn sẽ tích được {{ loyaltyPoints }} điểm 3F
            </div>
            <div class="flex items-end justify-between pt-3">
              <span class="text-lg font-black text-gray-900">Tổng cộng</span>
              <strong class="text-2xl font-black text-[#0051ff]">{{ formatMoney(total) }}</strong>
            </div>
            <button type="button" class="order-button">
              Đặt hàng
              <i class="fa-solid fa-check" />
            </button>
            <p class="text-center text-[11px] text-gray-400 mt-3">Thông tin của bạn được bảo mật</p>
          </section>
        </aside>
      </div>

      <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-8 py-12 md:py-16">
        <div v-for="benefit in benefits" :key="benefit.title" class="checkout-benefit">
          <div class="benefit-icon" :class="benefit.theme">
            <i :class="benefit.icon" />
          </div>
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.desc }}</p>
        </div>
      </section>
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
  name: 'CheckoutPage',
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
      receiveMethod: 'delivery',
      form: {
        name: 'Toàn Phan',
        phone: '0912 345 678',
        address: '',
        city: '',
        ward: '',
        note: ''
      },
      images: {
        logo: require('@/assets/images/logo.webp'),
        govSeal: require('@/assets/images/gov-seal.webp')
      },
      receiveMethods: [
        { value: 'delivery', label: 'Giao hàng tận nơi', icon: 'fa-solid fa-truck-fast' },
        { value: 'pickup', label: 'Nhận tại cửa hàng', icon: 'fa-solid fa-store' }
      ],
      benefits: [
        { title: 'Giao hỏa tốc 2H', desc: 'Nội thành TP.HCM', icon: 'fa-solid fa-truck-fast', theme: 'blue' },
        { title: 'Freeship toàn quốc', desc: 'Từ hạng Gold', icon: 'fa-solid fa-cube', theme: 'blue' },
        { title: 'Voucher thăng hạng', desc: 'Đến 400.000đ mỗi cấp mới', icon: 'fa-solid fa-crown', theme: 'yellow' },
        { title: '1.000 điểm = 1.000đ giảm', desc: 'Hoàn đến 12% giá trị đơn', icon: 'fa-regular fa-star', theme: 'yellow' },
        { title: 'Đổi trả miễn phí', desc: 'Trong 7 ngày', icon: 'fa-solid fa-rotate', theme: 'blue' },
        { title: '100% chính hãng', desc: '200+ thương hiệu', icon: 'fa-solid fa-shield-heart', theme: 'blue' }
      ]
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
    },
    loyaltyPoints () {
      return Math.max(100, Math.floor(this.total / 1000) * 30)
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
.checkout-card {
  border: 1px solid #edf0f8;
  border-radius: 16px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.035);
}

.checkout-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  font-size: 16px;
  font-weight: 900;
  color: #111827;
}

.receive-option {
  min-height: 76px;
  border: 1px solid #d9deec;
  border-radius: 14px;
  background: #fff;
  color: #1f2937;
  font-size: 14px;
  font-weight: 800;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.receive-option i {
  display: block;
  margin-bottom: 8px;
  color: #0051ff;
  font-size: 20px;
}

.receive-option.active {
  border: 2px solid #0051ff;
  background: #f4f7ff;
  color: #0051ff;
}

.field {
  display: block;
}

.field span {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 800;
  color: #374151;
}

.field input,
.field select,
textarea {
  width: 100%;
  border: 1px solid #d9deec;
  border-radius: 12px;
  background: #fff;
  padding: 12px 14px;
  font-size: 14px;
  color: #374151;
  outline: none;
}

.field input:focus,
.field select:focus,
textarea:focus {
  border-color: #0051ff;
  box-shadow: 0 0 0 3px rgba(0, 81, 255, 0.08);
}

.field small {
  display: block;
  margin-top: 6px;
  font-size: 11px;
  color: #6b7280;
}

.select-field {
  position: relative;
}

.soft-option,
.store-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  border-radius: 12px;
  background: #f1f5ff;
  padding: 14px;
}

.store-row {
  min-height: 48px;
  justify-content: flex-start;
  gap: 10px;
  font-size: 13px;
  font-weight: 800;
  color: #374151;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.discount-box {
  border-bottom: 1px solid #eef2f7;
  padding-bottom: 12px;
}

.coupon-card {
  margin-top: 10px;
  border: 1px dashed #cfd6e6;
  border-radius: 12px;
  background: #fafbff;
  padding: 12px;
}

.coupon-card strong,
.coupon-card span {
  display: block;
}

.coupon-card strong {
  color: #374151;
  font-size: 13px;
}

.coupon-card span {
  margin-top: 4px;
  color: #8a94a6;
  font-size: 11px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 9px;
  font-size: 14px;
  color: #4b5563;
}

.points-box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
  border-radius: 999px;
  background: #fff6d7;
  padding: 9px 12px;
  color: #b45309;
  font-size: 12px;
  font-weight: 800;
}

.order-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 52px;
  margin-top: 14px;
  border-radius: 12px;
  background: #0051ff;
  color: #fff;
  font-size: 15px;
  font-weight: 900;
  transition: background 0.2s ease, transform 0.2s ease;
}

.order-button:hover {
  background: #003fd1;
}

.order-button:active {
  transform: scale(0.99);
}

.checkout-benefit {
  text-align: center;
}

.benefit-icon {
  display: inline-flex;
  width: 46px;
  height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  margin-bottom: 10px;
  font-size: 18px;
}

.benefit-icon.blue {
  background: #e8efff;
  color: #0051ff;
}

.benefit-icon.yellow {
  background: #fff4cb;
  color: #d99a00;
}

.checkout-benefit h3 {
  font-size: 13px;
  font-weight: 900;
  color: #111827;
}

.checkout-benefit p {
  margin-top: 4px;
  font-size: 11px;
  color: #6b7280;
}
</style>

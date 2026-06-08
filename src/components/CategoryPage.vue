<template>
  <div class="bg-white text-gray-800 font-desgin min-h-screen overflow-x-hidden">
    <SiteHeader
      :logo="images.logo"
      :search-keywords="searchKeywords"
      :mobile-menu="mobileMenu"
      :desktop-menu="desktopMenu"
    />

    <main class="max-w-6xl mx-auto px-4 py-6 md:py-8">
      <nav class="flex items-center gap-2 text-xs text-gray-500 mb-5">
        <router-link to="/" class="hover:text-[#0051ff]">Trang chủ</router-link>
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-300" />
        <span class="font-bold text-gray-700">Danh mục</span>
      </nav>

      <section>
        <h1 class="text-2xl md:text-3xl font-black text-gray-900">Danh Mục Sản Phẩm</h1>
        <p class="text-sm text-gray-500 mt-1">Khám phá tất cả danh mục sản phẩm cho thú cưng</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <router-link
            v-for="group in heroGroups"
            :key="group.title"
            :to="group.to"
            class="category-hero"
            :class="group.theme"
          >
            <div>
              <h2 class="text-2xl font-black">{{ group.title }}</h2>
              <p class="text-sm mt-2 opacity-85">{{ group.desc }}</p>
            </div>
            <span class="inline-flex items-center gap-2 mt-8 text-sm font-black">
              Xem tất cả <i class="fa-solid fa-arrow-right text-xs" />
            </span>
          </router-link>
        </div>
      </section>

      <CategoryGrid title="Danh mục cho Chó" icon="fa-solid fa-dog" :items="dogCategories" />
      <CategoryGrid title="Danh mục cho Mèo" icon="fa-solid fa-cat" :items="catCategories" />

      <router-link to="/products" class="brand-strip">
        <strong>200+ thương hiệu chính hãng</strong>
        <span>Xem tất cả thương hiệu <i class="fa-solid fa-arrow-right text-xs" /></span>
      </router-link>

      <section class="club-banner">
        <div class="relative z-10">
          <span class="inline-flex bg-[#ffd400] text-[#0051ff] rounded-full px-3 py-1 text-xs font-black mb-4">3F STORE CLUB</span>
          <h2 class="text-2xl md:text-3xl font-black text-white">Tích điểm mỗi đơn hàng, đổi quà cực đỉnh!</h2>
          <p class="mt-3 text-sm text-white/85 max-w-xl">Đăng ký thành viên để nhận ưu đãi độc quyền, tích điểm x2 và freeship không giới hạn.</p>
          <router-link to="/products" class="inline-flex items-center gap-2 mt-5 bg-white text-[#0051ff] rounded-full px-5 py-3 text-sm font-black">
            Tìm hiểu thêm
            <i class="fa-solid fa-arrow-right text-xs" />
          </router-link>
        </div>
        <span class="bubble bubble-one" />
        <span class="bubble bubble-two" />
        <span class="bubble bubble-three" />
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
import CategoryGrid from './category/CategoryGrid'
import { searchKeywords, mobileMenu, desktopMenu, footerColumns, socials } from '@/data/site'

export default {
  name: 'CategoryPage',
  components: {
    SiteHeader,
    SiteFooter,
    CategoryGrid
  },
  data () {
    const commonDog = [
      { label: 'Thức Ăn Hạt', icon: 'fa-solid fa-bag-shopping', to: '/products' },
      { label: 'Pate', icon: 'fa-solid fa-jar', to: '/products' },
      { label: 'Bánh Thưởng', icon: 'fa-solid fa-cookie-bite', to: '/products' },
      { label: 'Đồ Chơi', icon: 'fa-solid fa-baseball', to: '/products' },
      { label: 'Dây Dắt', icon: 'fa-solid fa-dog', to: '/products' },
      { label: 'Quần Áo', icon: 'fa-solid fa-shirt', to: '/products' },
      { label: 'Nệm & Chuồng', icon: 'fa-solid fa-house', to: '/products' },
      { label: 'Bát & Bình', icon: 'fa-solid fa-bowl-food', to: '/products' },
      { label: 'Vệ Sinh', icon: 'fa-solid fa-pump-soap', to: '/products' },
      { label: 'Sức Khỏe', icon: 'fa-solid fa-shield-heart', to: '/products' },
      { label: 'Tã & Bỉm', icon: 'fa-solid fa-clipboard-check', to: '/products' },
      { label: 'Khuyến Mãi', icon: 'fa-solid fa-percent', to: '/products', highlight: true }
    ]

    const commonCat = [
      { label: 'Thức Ăn Hạt', icon: 'fa-solid fa-bag-shopping', to: '/products' },
      { label: 'Pate', icon: 'fa-solid fa-jar', to: '/products' },
      { label: 'Bánh Thưởng', icon: 'fa-solid fa-cookie-bite', to: '/products' },
      { label: 'Đồ Chơi', icon: 'fa-solid fa-baseball', to: '/products' },
      { label: 'Cát Vệ Sinh', icon: 'fa-solid fa-basket-shopping', to: '/products' },
      { label: 'Nhà Mèo', icon: 'fa-solid fa-tower-observation', to: '/products' },
      { label: 'Balo Vận Chuyển', icon: 'fa-solid fa-suitcase', to: '/products' },
      { label: 'Bát & Bình', icon: 'fa-solid fa-bowl-food', to: '/products' },
      { label: 'Vệ Sinh', icon: 'fa-solid fa-pump-soap', to: '/products' },
      { label: 'Sức Khỏe', icon: 'fa-solid fa-shield-heart', to: '/products' },
      { label: 'Quần Áo', icon: 'fa-solid fa-shirt', to: '/products' },
      { label: 'Khuyến Mãi', icon: 'fa-solid fa-percent', to: '/products', highlight: true }
    ]

    return {
      searchKeywords,
      mobileMenu,
      desktopMenu,
      footerColumns,
      socials,
      images: {
        logo: require('@/assets/images/logo.webp'),
        govSeal: require('@/assets/images/gov-seal.webp')
      },
      heroGroups: [
        { title: 'Sản Phẩm Cho Chó', desc: 'Thức ăn, phụ kiện, chăm sóc sức khỏe', to: '/products', theme: 'blue-card' },
        { title: 'Sản Phẩm Cho Mèo', desc: 'Thức ăn, phụ kiện, chăm sóc sức khỏe', to: '/products', theme: 'yellow-card' }
      ],
      dogCategories: commonDog,
      catCategories: commonCat
    }
  }
}
</script>

<style scoped>
.category-hero {
  min-height: 170px;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.category-hero:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px rgba(0, 81, 255, 0.12);
}

.blue-card {
  background: #0754ff;
  color: #fff;
}

.yellow-card {
  background: #ffd400;
  color: #1f2937;
}

.brand-strip {
  min-height: 92px;
  border: 1px solid #d9def0;
  border-radius: 12px;
  background: #f3f5ff;
  margin: 34px 0 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #111827;
}

.brand-strip strong {
  font-size: 17px;
  font-weight: 900;
}

.brand-strip span {
  margin-top: 7px;
  color: #0051ff;
  font-size: 13px;
  font-weight: 800;
}

.club-banner {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: #0754ff;
  padding: 34px 38px;
  margin-bottom: 54px;
}

.bubble {
  position: absolute;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
}

.bubble-one {
  width: 86px;
  height: 86px;
  right: 44px;
  top: 24px;
}

.bubble-two {
  width: 56px;
  height: 56px;
  right: 86px;
  bottom: 24px;
}

.bubble-three {
  width: 36px;
  height: 36px;
  right: 28px;
  bottom: 72px;
}
</style>

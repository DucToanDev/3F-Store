<template>
  <div class="bg-white text-gray-800 font-desgin min-h-screen overflow-x-hidden">
    <SiteHeader
      :logo="images.logo"
      :search-keywords="searchKeywords"
      :mobile-menu="mobileMenu"
      :desktop-menu="desktopMenu"
    />

    <main class="max-w-7xl mx-auto px-4 py-5 md:py-7">
      <nav class="flex items-center gap-2 text-xs text-gray-500 overflow-x-auto hide-scrollbar whitespace-nowrap">
        <router-link to="/" class="hover:text-[#0051ff]">Trang chủ</router-link>
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-300" />
        <router-link to="/categories" class="hover:text-[#0051ff]">Danh mục</router-link>
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-300" />
        <span class="font-bold text-gray-700">{{ pageTitle }}</span>
      </nav>

      <section class="mt-4">
        <h1 class="text-2xl md:text-3xl font-black text-gray-900">{{ pageTitle }}</h1>
        <div class="mt-5 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-3">
          <router-link
            v-for="brand in brandTiles"
            :key="brand.name"
            :to="'/products?brand=' + encodeURIComponent(brand.name)"
            class="h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center px-3 text-sm font-black text-gray-700 hover:border-[#0051ff] hover:text-[#0051ff] transition text-center"
          >
            {{ brand.name }}
          </router-link>
        </div>
      </section>

      <section class="mt-7 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6 items-start">
        <aside class="hidden lg:block sticky top-40">
          <div class="flex items-center justify-between mb-5">
            <h2 class="font-black text-gray-900">Bộ lọc</h2>
            <button type="button" class="text-xs text-[#0051ff] font-bold" @click="clearFilters">Xóa lọc</button>
          </div>

          <div class="filter-group">
            <button type="button" class="filter-title">
              Loại sản phẩm
              <i class="fa-solid fa-chevron-up text-[10px]" />
            </button>
            <label v-for="type in productTypes" :key="type.value" class="filter-option">
              <input v-model="selectedAnimals" type="checkbox" :value="type.value" class="accent-[#0051ff]">
              <span>{{ type.label }}</span>
              <span class="ml-auto text-gray-400">({{ type.count }})</span>
            </label>
          </div>

          <div class="filter-group">
            <button type="button" class="filter-title">
              Thương hiệu
              <i class="fa-solid fa-chevron-up text-[10px]" />
            </button>
            <div class="relative mb-3">
              <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input v-model="brandSearch" type="text" placeholder="Tìm thương hiệu..." class="w-full border border-gray-200 rounded-full py-2 pl-8 pr-3 text-xs outline-none focus:border-[#0051ff]">
            </div>
            <div class="max-h-48 overflow-y-auto pr-1">
              <label v-for="brand in filteredBrands" :key="brand.name" class="filter-option">
                <input v-model="selectedBrands" type="checkbox" :value="brand.name" class="accent-[#0051ff]">
                <span>{{ brand.name }}</span>
                <span class="ml-auto text-gray-400">({{ brand.count }})</span>
              </label>
            </div>
          </div>

          <div class="filter-group">
            <button type="button" class="filter-title">
              Giá
              <i class="fa-solid fa-chevron-up text-[10px]" />
            </button>
            <input v-model.number="maxPrice" type="range" min="0" max="10000000" step="100000" class="w-full accent-[#0051ff]">
            <div class="flex justify-between text-[11px] text-gray-500 mt-1">
              <span>0đ</span>
              <span>{{ formatMoney(maxPrice) }}</span>
            </div>
          </div>

          <div v-for="name in collapsedFilters" :key="name" class="border-b border-gray-200 py-4">
            <button type="button" class="w-full flex items-center justify-between text-sm font-bold text-gray-700">
              {{ name }}
              <i class="fa-solid fa-chevron-down text-[10px] text-gray-400" />
            </button>
          </div>
        </aside>

        <section>
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
            <p class="text-sm text-gray-500">
              <span class="font-bold text-[#0051ff]">{{ filteredProducts.length }}</span> sản phẩm
            </p>
            <div class="flex items-center gap-2">
              <button type="button" class="view-button" :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'">
                <i class="fa-solid fa-grip" />
              </button>
              <button type="button" class="view-button" :class="{ active: viewMode === 'compact' }" @click="viewMode = 'compact'">
                <i class="fa-solid fa-list" />
              </button>
              <select v-model="sortMode" class="h-10 rounded-full border border-gray-200 px-4 text-sm font-bold outline-none focus:border-[#0051ff]">
                <option value="default">Mặc định</option>
                <option value="priceAsc">Giá tăng dần</option>
                <option value="priceDesc">Giá giảm dần</option>
                <option value="sold">Bán chạy</option>
              </select>
            </div>
          </div>

          <div :class="productGridClass">
            <article v-for="product in pagedProducts" :key="product.slug" class="product-card group">
              <span class="absolute top-3 left-3 bg-[#ffd400] text-gray-900 text-[10px] font-black px-2 py-1 rounded-full z-10">{{ product.discount }}</span>
              <button type="button" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white border border-gray-100 text-gray-400 hover:text-red-500 shadow-sm z-10">
                <i class="fa-regular fa-heart text-xs" />
              </button>
              <router-link :to="'/product/' + product.slug" class="block aspect-square bg-white rounded-lg p-5">
                <img :src="product.image" :alt="product.name" class="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition duration-300" @error="useFallbackImage">
              </router-link>
              <div class="px-3 pb-3 flex flex-col flex-1">
                <router-link :to="'/products?brand=' + encodeURIComponent(product.brand)" class="text-[#0051ff] text-[11px] font-black uppercase mb-1 truncate">{{ product.brand }}</router-link>
                <router-link :to="'/product/' + product.slug" class="text-sm font-bold leading-snug text-gray-800 min-h-[40px] line-clamp-2 hover:text-[#0051ff]">
                  {{ product.name }}
                </router-link>
                <div class="flex items-center text-xs text-gray-500 mt-2">
                  <i class="fa-solid fa-star text-[#ffc107] mr-1" />
                  {{ product.rating }}
                  <span class="mx-1.5 text-gray-300">|</span>
                  {{ product.soldText }}
                </div>
                <div class="mt-3 flex items-end justify-between">
                  <div class="min-w-0">
                    <p class="text-xs text-gray-400 line-through">{{ product.originalPrice }}</p>
                    <p class="text-lg font-black text-[#0051ff]">{{ product.price }}</p>
                  </div>
                  <button type="button" class="w-9 h-9 rounded-lg bg-[#0051ff] text-white hover:bg-blue-700 active:scale-95 transition" @click.stop="addToCart(product)">
                    <i class="fa-solid fa-bag-shopping text-xs" />
                  </button>
                </div>
              </div>
            </article>
          </div>

          <div class="flex justify-center items-center gap-2 mt-8">
            <button type="button" class="page-button" :disabled="currentPage === 1" @click="currentPage--">
              <i class="fa-solid fa-chevron-left text-[10px]" />
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              type="button"
              class="page-button"
              :class="{ active: page === currentPage }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button type="button" class="page-button" :disabled="currentPage === pageCount" @click="currentPage++">
              <i class="fa-solid fa-chevron-right text-[10px]" />
            </button>
          </div>
        </section>
      </section>

      <section class="mt-12 space-y-8">
        <div>
          <h2 class="section-title">Tìm kiếm liên quan</h2>
          <div class="flex flex-wrap gap-2 mt-3">
            <router-link v-for="tag in relatedTags" :key="tag" to="/products" class="tag-pill">{{ tag }}</router-link>
          </div>
        </div>

        <div>
          <h2 class="section-title">Khám phá thêm</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
            <router-link v-for="item in discoverItems" :key="item.title" to="/products" class="discover-card">
              <i :class="item.icon" class="text-[#0051ff] text-xl" />
              <div>
                <h3 class="font-black text-gray-900">{{ item.title }}</h3>
                <p class="text-xs text-gray-500 mt-1">{{ item.desc }}</p>
              </div>
            </router-link>
          </div>
        </div>

        <div class="text-sm text-gray-600 leading-7">
          <h2 class="text-xl font-black text-[#0051ff] mb-2">Về thức ăn hạt cho chó</h2>
          <p>
            Thức ăn hạt cho chó tại 3F Store được tổng hợp từ dữ liệu sản phẩm thực tế, gồm nhiều thương hiệu,
            mức giá và quy cách cho từng nhu cầu dinh dưỡng. Khách có thể lọc nhanh theo thương hiệu, loại thú cưng
            và khoảng giá để chọn sản phẩm phù hợp hơn cho boss.
          </p>
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
import products from '@/data/products'
import { searchKeywords, mobileMenu, desktopMenu, footerColumns, socials } from '@/data/site'
import cart from '@/store/cart'

export default {
  name: 'ProductListing',
  components: {
    SiteHeader,
    SiteFooter
  },
  data () {
    return {
      products,
      cart,
      searchKeywords,
      mobileMenu,
      desktopMenu,
      footerColumns,
      socials,
      pageTitle: 'Thức Ăn Hạt Cho Chó',
      selectedAnimals: [],
      selectedBrands: [],
      brandSearch: '',
      maxPrice: 10000000,
      sortMode: 'default',
      viewMode: 'grid',
      currentPage: 1,
      perPage: 20,
      images: {
        logo: require('@/assets/images/logo.webp'),
        govSeal: require('@/assets/images/gov-seal.webp'),
        fallback: require('@/assets/images/paw.png')
      },
      collapsedFilters: ['Tình trạng', 'Đang giảm giá', 'Độ tuổi', 'Giống chó'],
      relatedTags: ['Máy ăn uống tự động cho chó mèo', 'Balo túi vận chuyển chó mèo', 'Bánh quy xương gặm cho chó', 'Chăm sóc sức khỏe cho chó', 'Dụng cụ ăn uống cho chó mèo', 'Lồng vận chuyển', 'Men tiêu hóa'],
      discoverItems: [
        { title: 'Khuyến mãi', desc: 'Ưu đãi hấp dẫn hôm nay', icon: 'fa-solid fa-bolt' },
        { title: 'Thương hiệu', desc: '200+ thương hiệu chính hãng', icon: 'fa-solid fa-crown' },
        { title: 'Blog chăm Boss', desc: 'Cẩm nang nuôi thú cưng', icon: 'fa-regular fa-newspaper' },
        { title: 'Cửa hàng', desc: '4 chi nhánh tại HCM', icon: 'fa-solid fa-store' }
      ]
    }
  },
  computed: {
    allBrands () {
      const count = {}
      this.products.forEach((product) => {
        count[product.brand] = (count[product.brand] || 0) + 1
      })
      return Object.keys(count).sort().map((name) => ({ name, count: count[name] }))
    },
    filteredBrands () {
      const keyword = this.brandSearch.toLowerCase()
      return this.allBrands.filter((brand) => brand.name.toLowerCase().indexOf(keyword) !== -1).slice(0, 18)
    },
    brandTiles () {
      return this.allBrands.slice(0, 8)
    },
    productTypes () {
      return ['Chó', 'Mèo', 'Thú cưng'].map((animal) => ({
        value: animal,
        label: animal === 'Thú cưng' ? 'Sản phẩm khác' : 'Cho ' + animal.toLowerCase(),
        count: this.products.filter((product) => product.animal === animal).length
      }))
    },
    filteredProducts () {
      let result = this.products.filter((product) => product.priceValue <= this.maxPrice)
      if (this.selectedAnimals.length) {
        result = result.filter((product) => this.selectedAnimals.indexOf(product.animal) !== -1)
      }
      if (this.selectedBrands.length) {
        result = result.filter((product) => this.selectedBrands.indexOf(product.brand) !== -1)
      }
      if (this.sortMode === 'priceAsc') result = result.slice().sort((a, b) => a.priceValue - b.priceValue)
      if (this.sortMode === 'priceDesc') result = result.slice().sort((a, b) => b.priceValue - a.priceValue)
      if (this.sortMode === 'sold') result = result.slice().sort((a, b) => b.sold - a.sold)
      return result
    },
    pageCount () {
      return Math.max(1, Math.ceil(this.filteredProducts.length / this.perPage))
    },
    pagedProducts () {
      const start = (this.currentPage - 1) * this.perPage
      return this.filteredProducts.slice(start, start + this.perPage)
    },
    visiblePages () {
      const pages = []
      const max = Math.min(this.pageCount, 5)
      for (let index = 1; index <= max; index += 1) pages.push(index)
      return pages
    },
    productGridClass () {
      if (this.viewMode === 'compact') return 'grid grid-cols-1 sm:grid-cols-2 gap-4'
      return 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'
    }
  },
  watch: {
    filteredProducts () {
      this.currentPage = 1
    }
  },
  mounted () {
    if (this.$route.query.brand) this.selectedBrands = [String(this.$route.query.brand)]
  },
  methods: {
    clearFilters () {
      this.selectedAnimals = []
      this.selectedBrands = []
      this.brandSearch = ''
      this.maxPrice = 10000000
      this.sortMode = 'default'
    },
    formatMoney (value) {
      return Number(value).toLocaleString('vi-VN') + 'đ'
    },
    useFallbackImage (event) {
      event.target.src = this.images.fallback
    },
    addToCart (product) {
      this.cart.add(product)
    }
  }
}
</script>

<style scoped>
.filter-group {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 16px;
  margin-bottom: 16px;
}

.filter-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 12px;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 28px;
  font-size: 13px;
  color: #4b5563;
  cursor: pointer;
}

.view-button,
.page-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  background: #fff;
  color: #6b7280;
  font-weight: 800;
}

.view-button.active,
.page-button.active {
  background: #0051ff;
  border-color: #0051ff;
  color: #fff;
}

.page-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  border: 1px solid #edf0f7;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(17, 24, 39, 0.05);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.product-card:hover {
  border-color: #bfdbfe;
  box-shadow: 0 14px 32px rgba(0, 81, 255, 0.1);
  transform: translateY(-2px);
}

.section-title {
  font-size: 17px;
  font-weight: 900;
  color: #0051ff;
}

.tag-pill {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  border-radius: 999px;
  background: #eef2ff;
  padding: 0 14px;
  font-size: 12px;
  font-weight: 700;
  color: #405076;
}

.discover-card {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 82px;
  border: 1px solid #dbe1ef;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
}
</style>

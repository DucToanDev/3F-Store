<template>
  <div>
    <!-- Overlay cho menu mobile -->
    <div class="fixed inset-0 bg-black/40 z-[60] transition-opacity md:hidden" :class="{ hidden: !isMenuOpen }" @click="closeMenu" />

    <!-- Mobile Menu -->
    <aside class="fixed inset-y-0 left-0 w-[300px] sm:w-[360px] bg-white z-[70] transform transition-transform duration-300 flex flex-col h-full overflow-y-auto md:hidden" :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'">
      <div class="flex justify-between items-center p-4 border-b border-gray-100">
        <div class="text-[#FFC107] text-3xl font-black tracking-tighter">
          3FStore<span class="text-sm font-bold ml-0.5">.vn</span>
        </div>
        <button type="button" class="text-gray-500 hover:text-gray-800 p-2" aria-label="Đóng menu" @click="closeMenu">
          <i class="fa-solid fa-xmark text-xl" />
        </button>
      </div>

      <div class="p-4">
        <div class="bg-[#f2f4fc] rounded-2xl p-4 mb-4">
          <button type="button" class="w-full bg-[#0051ff] text-white py-3 rounded-xl font-bold text-sm">
            Đăng nhập / Đăng ký
          </button>
        </div>
        <div class="relative mb-2">
          <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="Tìm kiếm sản phẩm..." class="w-full bg-[#e3e6f9] py-2.5 pl-11 pr-4 rounded-xl outline-none text-sm text-gray-700">
        </div>
      </div>

      <ul class="flex flex-col text-[15px] text-gray-700 font-medium pb-2 border-b border-gray-200">
        <li v-for="item in mobileMenuItems" :key="item.label" class="border-b border-gray-50 last:border-b-0">
          <router-link v-if="item.to && !item.children" :to="item.to" class="flex justify-between items-center px-5 py-3.5 hover:bg-gray-50" @click.native="closeMenu">
            <span>{{ item.label }}</span>
          </router-link>
          <button v-else type="button" class="w-full flex justify-between items-center px-5 py-3.5 hover:bg-gray-50 text-left" @click="toggleMobileSubmenu(item.label)">
            <span>{{ item.label }}</span>
            <i
              v-if="item.children"
              class="fa-solid fa-chevron-down text-xs text-gray-400 transition-transform"
              :class="{ 'rotate-180 text-[#0051ff]': openMobileSubmenu === item.label }"
            />
          </button>
          <div v-if="item.children && openMobileSubmenu === item.label" class="bg-[#f4f7ff] px-3 py-2">
            <router-link
              v-for="child in item.children"
              :key="child"
              to="/products"
              class="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-white hover:text-[#0051ff]"
              @click.native="closeMenu"
            >
              <i class="fa-solid fa-paw text-[10px] text-[#0051ff]" />
              <span>{{ child }}</span>
            </router-link>
          </div>
        </li>
      </ul>

      <ul class="flex flex-col text-[15px] text-gray-600 font-medium py-2">
        <li class="px-5 py-3 cursor-pointer hover:bg-gray-50">Tra cứu đơn hàng</li>
        <li class="px-5 py-3 cursor-pointer hover:bg-gray-50">Đơn hàng của tôi</li>
      </ul>

      <div class="mt-auto bg-[#f8f9fa] p-5 border-t border-gray-200">
        <div class="text-xs font-bold text-gray-500 mb-4 uppercase">Hỗ trợ</div>
        <div class="flex items-center gap-3 text-[#0051ff] font-medium text-[15px] mb-3 cursor-pointer">
          <i class="fa-solid fa-phone-volume" /> Hotline: 0374 414 142
        </div>
        <div class="flex items-center gap-3 text-[#0051ff] font-medium text-[15px] cursor-pointer">
          <i class="fa-regular fa-comment-dots" /> Chat Zalo
        </div>
      </div>
    </aside>

    <!-- Header Content -->
    <div class="sticky top-0 z-50">
      <div class="bg-[#0051ff] text-white text-xs py-1.5 border-b border-blue-400/30">
        <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div class="hidden sm:flex items-center gap-4">
            <a href="tel:0879997474" class="flex items-center gap-1.5 hover:text-gray-200 transition">
              <i class="fa-solid fa-phone" /> 087.999.7474
            </a>
            <span class="text-white/50">|</span>
            <a href="mailto:3fstorevietnam@gmail.com" class="flex items-center gap-1.5 hover:text-gray-200 transition">
              <i class="fa-solid fa-envelope" /> 3fstorevietnam@gmail.com
            </a>
          </div>
          <div class="flex justify-center w-full sm:w-auto">
            <span class="flex items-center gap-1.5 cursor-pointer hover:text-gray-200 transition">
              <i class="fa-solid fa-location-dot" /> 16 Đường số 12, P. An Khánh, TP. Thủ Đức, TP. HCM
            </span>
          </div>
        </div>
      </div>

      <header class="bg-[#0051ff] py-3 shadow-md">
        <div class="max-w-7xl mx-auto px-4 flex items-center justify-between md:gap-6 lg:gap-8">
          <button type="button" class="md:hidden text-white w-8 h-8 flex items-center justify-start flex-shrink-0" aria-label="Mở menu" @click="openMenu">
            <i class="fa-solid fa-bars text-xl" />
          </button>

          <router-link to="/" class="cursor-pointer flex-shrink-0 w-24 md:w-28 lg:w-32 self-start mt-1">
            <img :src="logo" class="w-full h-auto invert grayscale brightness-0 contrast-200 mix-blend-screen" alt="3F Logo">
          </router-link>

          <div class="hidden md:flex flex-col flex-1 max-w-3xl">
            <div class="relative w-full">
              <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-red-500 text-lg z-10" />
              <input type="text" placeholder="Tìm kiếm sản phẩm..." class="w-full py-2.5 pl-11 pr-5 rounded-full outline-none text-[15px] text-gray-700 shadow-sm">
            </div>
            <nav class="flex gap-4 sm:gap-5 mt-3 text-white text-[13px] font-medium px-2 overflow-x-auto hide-scrollbar whitespace-nowrap">
              <a v-for="keyword in searchKeywords" :key="keyword" href="#" class="hover:text-yellow-300 transition">{{ keyword }}</a>
            </nav>
          </div>

          <div class="hidden lg:flex items-center gap-5 text-white flex-shrink-0 self-start mt-1.5">
            <div class="w-px h-8 bg-white/40 mx-1" />

            <div class="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition group">
              <i class="fa-regular fa-circle-user text-[26px]" />
              <div class="flex flex-col leading-tight">
                <span class="text-[11px]">Đăng nhập</span>
                <span class="font-bold text-[14px]">Tài khoản</span>
              </div>
            </div>

            <div class="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition group">
              <i class="fa-solid fa-list-check text-[24px]" />
              <div class="flex flex-col leading-tight">
                <span class="text-[11px]">Đơn hàng</span>
                <span class="font-bold text-[14px]">Đã đặt</span>
              </div>
            </div>

            <div class="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition group">
              <i class="fa-regular fa-heart text-[26px]" />
              <span class="font-bold text-[14px]">Yêu thích</span>
            </div>

            <button type="button" class="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition group" @click="openCart">
              <i class="fa-solid fa-cart-shopping text-[24px]" />
              <span class="font-bold text-[14px]">Giỏ hàng</span>
              <span class="w-[22px] h-[22px] flex items-center justify-center border border-white rounded-full text-[12px] font-bold text-[#0051ff] bg-white">{{ cart.count }}</span>
            </button>
          </div>

          <div class="flex md:hidden items-center gap-4 text-white flex-shrink-0">
            <button type="button" class="cursor-pointer" aria-label="Mở tìm kiếm" @click="isMobileSearchOpen = !isMobileSearchOpen">
              <i class="fa-solid fa-magnifying-glass text-[21px]" />
            </button>
            <i class="fa-regular fa-circle-user text-[22px] cursor-pointer" />
            <button type="button" class="relative cursor-pointer" @click="openCart">
              <i class="fa-solid fa-cart-shopping text-[22px]" />
              <span class="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 bg-red-500 border border-white flex items-center justify-center rounded-full text-[10px] font-bold">{{ cart.count }}</span>
            </button>
          </div>
        </div>
      </header>

      <div v-if="isMobileSearchOpen" class="md:hidden bg-[#0051ff] px-4 pb-3 border-b border-blue-700/50 shadow-sm">
        <div class="relative w-full">
          <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
          <input type="text" placeholder="Tìm kiếm sản phẩm..." class="w-full py-2.5 pl-11 pr-4 rounded-xl outline-none text-sm text-gray-700">
        </div>
        <nav class="flex gap-4 mt-3 text-white text-[12px] font-medium px-1 overflow-x-auto hide-scrollbar whitespace-nowrap">
          <a v-for="keyword in searchKeywords.slice(0, 3)" :key="keyword" href="#" class="hover:text-yellow-300 transition">{{ keyword }}</a>
        </nav>
      </div>
    </div>

    <!-- Desktop Navigation -->
    <nav class="hidden md:block bg-white shadow-sm border-b relative z-40">
      <div class="max-w-7xl mx-auto px-4 flex justify-between items-center text-[15px] text-gray-800">
        <ul class="flex gap-7 h-full">
          <li v-for="item in desktopMenu" :key="item.label" class="group relative hover:text-[#0051ff] cursor-pointer flex items-center gap-1 transition py-3.5">
            <router-link v-if="item.to" :to="item.to">{{ item.label }}</router-link>
            <span v-else>{{ item.label }}</span>
            <i v-if="item.children" class="fa-solid fa-chevron-down text-[11px] group-hover:rotate-180 transition-transform" />
            <div v-if="item.children" class="absolute top-full left-0 w-[220px] bg-white rounded-b-xl rounded-tr-xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
              <ul class="flex flex-col text-[14px] text-gray-700">
                <li v-for="child in item.children" :key="child" class="px-5 py-3 hover:bg-blue-50 hover:text-[#0051ff] border-b border-gray-50 transition-colors">{{ child }}</li>
              </ul>
            </div>
          </li>
        </ul>

        <div class="text-[#FFC107] font-bold text-[14px] ml-4 text-right">
          Tiết kiệm đến 25% khi là thành viên 3F Store
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import cart from '@/store/cart'

export default {
  name: 'SiteHeader',
  props: {
    logo: { type: String, required: true },
    searchKeywords: { type: Array, required: true },
    mobileMenu: { type: Array, required: true },
    desktopMenu: { type: Array, required: true }
  },
  data () {
    return {
      isMenuOpen: false,
      isMobileSearchOpen: true,
      openMobileSubmenu: '',
      cart
    }
  },
  computed: {
    mobileMenuItems () {
      return this.mobileMenu.map((item, index) => {
        const desktopItem = this.desktopMenu[index] || {}
        return {
          ...item,
          children: item.children || desktopItem.children || null
        }
      })
    }
  },
  beforeDestroy () {
    document.body.style.overflow = 'auto'
  },
  methods: {
    openMenu () {
      if (window.innerWidth >= 768) return
      this.isMenuOpen = true
      document.body.style.overflow = 'hidden'
    },
    closeMenu () {
      this.isMenuOpen = false
      this.openMobileSubmenu = ''
      document.body.style.overflow = 'auto'
    },
    toggleMobileSearch () {
      this.isMobileSearchOpen = !this.isMobileSearchOpen
      if (this.isMobileSearchOpen) {
        this.$nextTick(() => {
          if (this.$refs.mobileSearchInput) this.$refs.mobileSearchInput.focus()
        })
      }
    },
    toggleMobileSubmenu (label) {
      this.openMobileSubmenu = this.openMobileSubmenu === label ? '' : label
    },
    openCart () {
      this.closeMenu()
      this.cart.close()
      if (this.$route.path !== '/cart') this.$router.push('/cart')
    }
  }
}
</script>

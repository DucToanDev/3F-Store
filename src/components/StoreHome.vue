<template>
  <div ref="pageRoot" class="bg-gray-50 text-gray-800 font-desgin overflow-x-hidden">
    <SiteHeader
      :logo="images.logo"
      :search-keywords="searchKeywords"
      :mobile-menu="mobileMenu"
      :desktop-menu="desktopMenu"
    />

    <div class="fixed right-3 bottom-3 z-40 pointer-events-none sm:right-5 sm:bottom-5">
      <img :src="images.dogGif" alt="Cho gif" class="w-36 sm:w-46 md:w-64 h-auto" />
    </div>

    <div class="fixed left-3 bottom-3 z-40 sm:left-5 sm:bottom-5">
      <button type="button" class="flex flex-col items-start gap-1 cursor-pointer group" aria-label="Phát tiếng mèo kêu" @click="playCatSound">
        <div class="cat-wow-bubble rounded-full bg-white px-3 py-1 text-xs sm:text-sm font-black text-[#0051ff] shadow-lg border border-blue-100">
          Ngon thí!
        </div>
        <img :src="images.catGif" alt="Meo gif" class="w-24 sm:w-24 md:w-32 h-auto transition-transform group-active:scale-95" />
      </button>
      <audio ref="catAudio" :src="sounds.catMeow" preload="auto" />
    </div>

    <div
      ref="mascotLottie"
      class="fixed right-4 bottom-28 z-40 w-20 h-20 pointer-events-none sm:right-8 sm:bottom-32 md:w-24 md:h-24"
      aria-hidden="true"
    />

    <PawTrail />

    <main class="max-w-7xl mx-auto px-4 py-4 md:py-6 space-y-6 md:space-y-8">
      <HeroBanner :banners="mainBanners" />
      <HotNewsBar :hot-news="hotNews" />
      <VoucherSection :vouchers="vouchers" />
      <PromoBanners :promos="promoBanners" />
      <BestSellerSection :background="images.bestSellerBg" :products="bestSellerProducts" />
      <BrandSection :brands="brands" />
      <FeedbackCarousel :feedbacks="feedbacks" />
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
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import lottie from 'lottie-web'
import 'script-loader!@studio-freight/lenis/dist/lenis.umd.js'

import SiteHeader from './layout/SiteHeader'
import SiteFooter from './layout/SiteFooter'
import HeroBanner from './home/HeroBanner'
import HotNewsBar from './home/HotNewsBar'
import VoucherSection from './home/VoucherSection'
import PromoBanners from './home/PromoBanners'
import BestSellerSection from './home/BestSellerSection'
import BrandSection from './home/BrandSection'
import FeedbackCarousel from './home/FeedbackCarousel'
import PawTrail from './effects/PawTrail'
import products from '@/data/products'
import { searchKeywords, mobileMenu, desktopMenu, footerColumns, socials } from '@/data/site'

gsap.registerPlugin(ScrollTrigger)

const mascotAnimationData = {
  v: '5.7.4',
  fr: 30,
  ip: 0,
  op: 90,
  w: 180,
  h: 180,
  nm: '3F Paw Mascot',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'paw',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [-8] }, { t: 45, s: [8] }, { t: 90, s: [-8] }] },
        p: { a: 1, k: [{ t: 0, s: [90, 94, 0] }, { t: 45, s: [90, 82, 0] }, { t: 90, s: [90, 94, 0] }] },
        a: { a: 0, k: [90, 90, 0] },
        s: { a: 1, k: [{ t: 0, s: [92, 92, 100] }, { t: 45, s: [104, 104, 100] }, { t: 90, s: [92, 92, 100] }] }
      },
      shapes: [
        {
          ty: 'gr',
          nm: 'pad',
          it: [
            { ty: 'el', p: { a: 0, k: [90, 105] }, s: { a: 0, k: [62, 52] } },
            { ty: 'fl', c: { a: 0, k: [0.0, 0.318, 1.0, 1] }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
          ]
        },
        {
          ty: 'gr',
          nm: 'toe-one',
          it: [
            { ty: 'el', p: { a: 0, k: [54, 62] }, s: { a: 0, k: [28, 34] } },
            { ty: 'fl', c: { a: 0, k: [1.0, 0.757, 0.027, 1] }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
          ]
        },
        {
          ty: 'gr',
          nm: 'toe-two',
          it: [
            { ty: 'el', p: { a: 0, k: [88, 48] }, s: { a: 0, k: [30, 38] } },
            { ty: 'fl', c: { a: 0, k: [1.0, 0.757, 0.027, 1] }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
          ]
        },
        {
          ty: 'gr',
          nm: 'toe-three',
          it: [
            { ty: 'el', p: { a: 0, k: [124, 62] }, s: { a: 0, k: [28, 34] } },
            { ty: 'fl', c: { a: 0, k: [1.0, 0.757, 0.027, 1] }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
          ]
        }
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0
    }
  ]
}

export default {
  name: 'StoreHome',
  components: {
    SiteHeader,
    SiteFooter,
    HeroBanner,
    HotNewsBar,
    VoucherSection,
    PromoBanners,
    BestSellerSection,
    BrandSection,
    FeedbackCarousel,
    PawTrail
  },
  data () {
    const images = {
      logo: require('@/assets/images/logo.webp'),
      dogGif: require('@/assets/images/cho.gif'),
      catGif: require('@/assets/images/meo.gif'),
      govSeal: require('@/assets/images/gov-seal.webp'),
      bestSellerBg: require('@/assets/images/banner.png')
    }

    return {
      products,
      lenis: null,
      lenisRafId: null,
      lottieMascot: null,
      catSoundPlayed: false,
      images,
      sounds: {
        catMeow: require('@/assets/dragon-studio-cute-cat-meow-472372.mp3')
      },
      searchKeywords,
      mobileMenu,
      desktopMenu,
      footerColumns,
      socials,
      mainBanners: [
        { src: require('@/assets/images/banner3.png'), alt: 'Banner 1' },
        { src: require('@/assets/images/banner6.png'), alt: 'Banner 2' }
      ],
      promoBanners: [
        { src: require('@/assets/images/banner1.png'), alt: 'Thức ăn cho chó' },
        { src: require('@/assets/images/banner2.png'), alt: 'Thức ăn cho mèo' }
      ],
      hotNews: [
        'Siêu sale hè - giảm đến 50% cho nhiều sản phẩm thú cưng.',
        'Freeship nội thành TP.HCM cho đơn đủ điều kiện.',
        'Voucher cho khách hàng mới đang có sẵn trên 3F Store.'
      ],
      vouchers: [
        {
          title: 'Giảm 5%',
          condition: 'Đơn tối thiểu 999.000đ',
          code: 'PV5999K',
          used: 'Đã dùng 15%',
          color: 'bg-[#f13a3a]',
          textColor: 'text-[#f13a3a]'
        },
        {
          title: 'Giảm 50.000đ',
          condition: 'Đơn tối thiểu 399.000đ',
          code: 'SENMOI',
          used: 'Không giới hạn',
          color: 'bg-[#0051ff]',
          textColor: 'text-[#0051ff]'
        }
      ],
      brands: [
        { name: 'Royal Canin', logo: 'https://bizweb.dktcdn.net/100/487/588/collections/brand-2.png?v=1686284341007' },
        { name: 'Ganador', logo: 'https://bizweb.dktcdn.net/100/487/588/collections/brand-3.png?v=1686284354097' },
        { name: 'Nutrience', logo: 'https://bizweb.dktcdn.net/100/487/588/collections/nutrience-logo.png?v=1686564129097' },
        { name: 'Monge', logo: 'https://bizweb.dktcdn.net/100/487/588/collections/download.png?v=1686540311363' },
        { name: 'Nekko', logo: 'https://bizweb.dktcdn.net/100/487/588/collections/nekko.png?v=1686564143443' },
        { name: 'PetChoice', logo: require('@/assets/images/logo.webp') }
      ],
      feedbacks: [
        {
          avatar: 'A',
          name: 'Anh Minh',
          pet: 'Boss Corgi 2 tuổi',
          product: 'Royal Canin Mini Adult',
          content: 'Giao nhanh, đóng gói chắc. Bé nhà mình đổi qua hạt mới khá hợp, ăn đều hơn trước.'
        },
        {
          avatar: 'L',
          name: 'Linh Nguyễn',
          pet: 'Mèo Anh lông ngắn',
          product: 'Pate cho mèo',
          content: 'Shop tư vấn khẩu phần kỹ, sản phẩm còn hạn xa và mùi thơm.'
        },
        {
          avatar: 'H',
          name: 'Hoàng Phúc',
          pet: 'Poodle 5kg',
          product: 'Sữa tắm thú cưng',
          content: 'Đặt buổi sáng, chiều đã nhận. Sản phẩm đúng mẫu, giá tốt.'
        }
      ]
    }
  },
  computed: {
    bestSellerProducts () {
      return this.products
        .slice()
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
        .map((product, index) => ({
          id: product.id,
          brand: product.brand,
          name: product.name,
          image: product.image,
          discount: product.discount,
          rating: product.rating,
          sold: product.soldText,
          originalPrice: product.originalPrice,
          price: product.price,
          to: '/products',
          hideOnSmall: index === 4 || index === 9
        }))
    }
  },
  mounted () {
    this.initLenis()
    this.$nextTick(() => {
      this.initMascot()
      this.initGsapAnimations()
      this.initCatSoundAutoplay()
      ScrollTrigger.refresh()
    })
  },
  beforeDestroy () {
    if (this.lottieMascot) this.lottieMascot.destroy()
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    if (this.lenisRafId) window.cancelAnimationFrame(this.lenisRafId)
    if (this.lenis) this.lenis.destroy()
    window.removeEventListener('pointerdown', this.playCatSoundOnce)
    window.removeEventListener('keydown', this.playCatSoundOnce)
    document.body.style.overflow = 'auto'
  },
  methods: {
    initLenis () {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const Lenis = window.Lenis
      if (!Lenis) return

      this.lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false
      })

      const raf = (time) => {
        if (!this.lenis) return
        this.lenis.raf(time)
        this.lenisRafId = window.requestAnimationFrame(raf)
      }

      this.lenisRafId = window.requestAnimationFrame(raf)
    },
    initMascot () {
      if (!this.$refs.mascotLottie) return
      this.lottieMascot = lottie.loadAnimation({
        container: this.$refs.mascotLottie,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: mascotAnimationData
      })
    },
    initGsapAnimations () {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      gsap.from(this.$el.querySelector('.hero-banner-section'), {
        autoAlpha: 0,
        y: 34,
        scale: 0.985,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'all'
      })

      this.$el.querySelectorAll('.gsap-reveal').forEach((section) => {
        gsap.from(section, {
          autoAlpha: 0,
          y: 38,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true
          }
        })
      })
    },
    initCatSoundAutoplay () {
      window.setTimeout(() => {
        this.playCatSoundOnce()
        if (!this.catSoundPlayed) {
          window.addEventListener('pointerdown', this.playCatSoundOnce, { once: true })
          window.addEventListener('keydown', this.playCatSoundOnce, { once: true })
        }
      }, 650)
    },
    playCatSoundOnce () {
      if (this.catSoundPlayed) return
      this.playCatSound()
    },
    playCatSound () {
      const audio = this.$refs.catAudio
      if (!audio) return
      const now = Date.now()
      if (window.__last3fSoundAt && now - window.__last3fSoundAt < 1800) return
      window.__last3fSoundAt = now
      audio.currentTime = 0
      audio.play()
        .then(() => {
          this.catSoundPlayed = true
        })
        .catch(() => {})
    }
  }
}
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.font-desgin {
  font-family: "Quicksand", Arial, sans-serif;
  font-weight: 600;
}

.scroll-smooth-custom {
  scroll-behavior: smooth;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  display: inline-block;
  animation: marquee 20s linear infinite;
  white-space: nowrap;
  will-change: transform;
}

.pause-on-hover:hover .animate-marquee {
  animation-play-state: paused;
}

.fade-edges {
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

.feedback-swiper {
  padding-bottom: 34px;
}

.feedback-pagination .swiper-pagination-bullet {
  background: #9ca3af;
  opacity: 1;
}

.feedback-pagination .swiper-pagination-bullet-active {
  background: #0051ff;
  transform: scale(1.2);
}

.feedback-nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cat-wow-bubble {
  position: relative;
  transform-origin: 18px 100%;
  animation: cat-wow-pop 2.4s ease-in-out infinite;
}

.cat-wow-bubble::after {
  position: absolute;
  left: 28px;
  bottom: -7px;
  width: 12px;
  height: 12px;
  content: '';
  background: #fff;
  border-right: 1px solid #dbeafe;
  border-bottom: 1px solid #dbeafe;
  transform: rotate(45deg);
}

@keyframes cat-wow-pop {
  0%,
  68%,
  100% {
    opacity: 0;
    transform: translateY(8px) scale(0.82) rotate(-5deg);
  }

  10% {
    opacity: 1;
    transform: translateY(-4px) scale(1.12) rotate(2deg);
  }

  18%,
  54% {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(-1deg);
  }

  62% {
    opacity: 0;
    transform: translateY(-8px) scale(0.96) rotate(2deg);
  }
}
</style>

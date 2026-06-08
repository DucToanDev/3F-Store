<template>
  <div class="bg-gray-50 text-gray-800 font-desgin min-h-screen overflow-x-hidden">
    <SiteHeader
      :logo="images.logo"
      :search-keywords="searchKeywords"
      :mobile-menu="mobileMenu"
      :desktop-menu="desktopMenu"
    />

    <main class="max-w-7xl mx-auto px-4 py-4 md:py-6 space-y-5 md:space-y-6">
      <nav class="flex items-center gap-2 text-xs text-gray-500 overflow-x-auto hide-scrollbar whitespace-nowrap">
        <router-link to="/" class="hover:text-[#0051ff]">Trang chủ</router-link>
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-300" />
        <router-link to="/products" class="hover:text-[#0051ff]">{{ product.categoryLabel }}</router-link>
        <i class="fa-solid fa-chevron-right text-[10px] text-gray-300" />
        <span class="font-bold text-gray-700">{{ product.title }}</span>
      </nav>

      <section class="grid grid-cols-1 lg:grid-cols-[1fr_1.03fr] gap-5 md:gap-7 items-start">
        <ProductGallery :title="product.title" :images="product.images" />

        <div class="space-y-3">
          <ProductInfo :product="product" @add-to-cart="addToCart" />
          <ProductBenefits />
        </div>
      </section>

      <ProductDescription :product="product" />
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
import ProductGallery from './product/ProductGallery'
import ProductInfo from './product/ProductInfo'
import ProductBenefits from './product/ProductBenefits'
import ProductDescription from './product/ProductDescription'
import products from '@/data/products'
import { searchKeywords, mobileMenu, desktopMenu, footerColumns, socials } from '@/data/site'
import cart from '@/store/cart'

export default {
  name: 'ProductDetail',
  components: {
    SiteHeader,
    SiteFooter,
    ProductGallery,
    ProductInfo,
    ProductBenefits,
    ProductDescription
  },
  data () {
    return {
      images: {
        logo: require('@/assets/images/logo.webp'),
        govSeal: require('@/assets/images/gov-seal.webp')
      },
      products,
      cart,
      searchKeywords,
      mobileMenu,
      desktopMenu,
      footerColumns,
      socials
    }
  },
  computed: {
    rawProduct () {
      return this.products.find((item) => item.slug === this.$route.params.slug) || this.products[0]
    },
    variantGroup () {
      return this.products.filter((item) => {
        if (this.rawProduct.shopeeId) return item.shopeeId === this.rawProduct.shopeeId
        return item.baseName === this.rawProduct.baseName
      })
    },
    product () {
      const product = this.rawProduct
      const variants = this.variantGroup.map((item) => ({
        id: item.id,
        slug: item.slug,
        name: item.variant || item.name,
        discount: item.discount,
        price: item.price,
        product: item
      }))
      const images = uniqueValues(this.variantGroup.map((item) => item.image)).slice(0, 8)

      return {
        id: product.id,
        slug: product.slug,
        title: product.name,
        name: product.name,
        brand: product.brand,
        origin: '3F Store',
        price: product.price,
        priceValue: product.priceValue,
        originalPrice: product.originalPrice,
        discount: product.discount,
        rating: product.rating,
        soldText: product.soldText,
        summary: getSummary(product.description),
        description: product.description,
        categoryLabel: getCategoryLabel(product.category),
        images: images.length ? images : [product.image],
        coupons: getCoupons(product),
        variants,
        cartProduct: product
      }
    }
  },
  methods: {
    addToCart ({ product, quantity }) {
      const item = product || this.product.cartProduct
      const count = quantity || 1
      for (let index = 0; index < count; index += 1) this.cart.add(item)
    }
  }
}

function uniqueValues (values) {
  return values.filter((value, index) => value && values.indexOf(value) === index)
}

function getSummary (description) {
  const text = String(description || '').replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')
  return text.split('\n').map((line) => line.trim()).filter(Boolean).slice(0, 2).join(' ')
}

function getCategoryLabel (category) {
  const parts = String(category || '').split('>').map((part) => part.trim()).filter(Boolean)
  return parts[parts.length - 1] || 'Sản phẩm'
}

function getCoupons (product) {
  const coupons = []
  if (product.discount) coupons.push(product.discount + ' theo giảm giá sản phẩm')
  coupons.push('-25.000đ phí ship FREESHIP125K')
  coupons.push('-50.000đ SENMOI')
  return coupons
}
</script>

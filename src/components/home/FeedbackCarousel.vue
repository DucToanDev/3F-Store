<template>
  <section class="feedback-section gsap-reveal relative overflow-hidden bg-white border border-gray-100 rounded-2xl px-4 py-8 md:px-8 md:py-10 shadow-sm">
    <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-6">
      <div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">Feedback từ khách hàng</h2>
        <p class="text-sm text-gray-500 mt-1">Những trải nghiệm thật khi mua sắm tại 3F Store.</p>
      </div>
      <div class="hidden md:flex items-center gap-2">
        <button ref="feedbackPrev" type="button" class="feedback-nav w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-[#0051ff] hover:border-blue-200 transition" aria-label="Feedback trước">
          <i class="fa-solid fa-chevron-left text-sm" />
        </button>
        <button ref="feedbackNext" type="button" class="feedback-nav w-10 h-10 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-[#0051ff] hover:border-blue-200 transition" aria-label="Feedback sau">
          <i class="fa-solid fa-chevron-right text-sm" />
        </button>
      </div>
    </div>

    <div ref="feedbackSwiper" class="swiper-container feedback-swiper">
      <div class="swiper-wrapper">
        <article v-for="feedback in feedbacks" :key="feedback.name" class="swiper-slide h-auto">
          <div class="h-full rounded-xl border border-gray-100 bg-[#f8fafc] p-5 flex flex-col gap-4">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-11 h-11 rounded-full bg-[#0051ff] text-white flex items-center justify-center font-black shrink-0">
                  {{ feedback.avatar }}
                </div>
                <div class="min-w-0">
                  <h3 class="text-sm font-bold text-gray-800 truncate">{{ feedback.name }}</h3>
                  <p class="text-xs text-gray-500 truncate">{{ feedback.pet }}</p>
                </div>
              </div>
              <div class="text-[#ffc107] text-xs whitespace-nowrap">
                <i v-for="star in 5" :key="star" class="fa-solid fa-star" />
              </div>
            </div>
            <p class="text-sm text-gray-600 leading-relaxed">{{ feedback.content }}</p>
            <div class="mt-auto text-xs font-bold text-[#0051ff]">{{ feedback.product }}</div>
          </div>
        </article>
      </div>
      <div ref="feedbackPagination" class="swiper-pagination feedback-pagination" />
    </div>
  </section>
</template>

<script>
import Swiper, { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'

Swiper.use([Autoplay, Navigation, Pagination])

export default {
  name: 'FeedbackCarousel',
  props: {
    feedbacks: { type: Array, required: true }
  },
  data () {
    return {
      swiper: null
    }
  },
  mounted () {
    this.swiper = new Swiper(this.$refs.feedbackSwiper, {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      speed: 650,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false
      },
      pagination: {
        el: this.$refs.feedbackPagination,
        clickable: true
      },
      navigation: {
        nextEl: this.$refs.feedbackNext,
        prevEl: this.$refs.feedbackPrev
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 18
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    })
  },
  beforeDestroy () {
    if (this.swiper) this.swiper.destroy(true, true)
  }
}
</script>

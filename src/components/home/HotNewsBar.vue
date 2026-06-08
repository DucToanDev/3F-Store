<template>
  <section class="gsap-reveal bg-[#f5f6f8] md:bg-white rounded-xl p-4 md:shadow-sm md:border md:flex md:justify-between md:items-center md:px-6">
    <div class="flex items-center justify-between md:justify-start gap-4 mb-4 md:mb-0 md:border-r border-gray-200 md:pr-6 shrink-0">
      <span class="text-lg md:text-base font-black md:font-semibold text-gray-800 tracking-tight md:tracking-normal">Xin chào!</span>
      <button type="button" class="bg-[#0051ff] hover:bg-blue-700 active:scale-95 transition-all text-white px-5 md:px-4 py-1.5 rounded-full text-sm font-bold md:font-medium shadow-sm">
        Đăng nhập
      </button>
    </div>
    <div class="flex-1 overflow-hidden flex items-center bg-white md:bg-gray-50/50 rounded-lg md:rounded-full px-3 py-2.5 md:py-2 md:ml-6 border border-gray-200/60 shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] pause-on-hover cursor-default">
      <div class="bg-red-500 text-white text-[11px] md:text-xs font-bold px-2.5 py-1 rounded-md md:rounded-full flex items-center gap-1.5 z-10 shrink-0 shadow-sm">
        <i class="fa-solid fa-bolt text-yellow-300 animate-pulse" />
        <span class="tracking-wide">TIN HOT</span>
      </div>
      <div class="flex-1 overflow-hidden ml-3 relative h-5 flex items-center fade-edges">
        <div class="animate-marquee flex items-center gap-8">
          <span v-for="news in hotNews" :key="news" class="text-[13px] md:text-sm font-medium text-gray-700">{{ news }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HotNewsBar',
  props: {
    hotNews: { type: Array, required: true }
  }
}
</script>

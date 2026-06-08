<template>
  <footer class="bg-[#f8f9fb] pt-12 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
        <div class="lg:col-span-1">
          <img :src="logo" width="150" alt="3F Store">
          <p class="text-sm text-gray-600 mb-4">Cửa hàng kinh doanh sản phẩm dành cho ngành thú cưng</p>
          <div class="space-y-2 mb-6">
            <p class="text-sm text-gray-600 flex items-center gap-2">
              <i class="fa-solid fa-phone text-gray-400" /> Hotline:
              <span class="font-bold text-gray-800">087 999 7474</span>
            </p>
            <p class="text-sm text-gray-600 flex items-center gap-2">
              <i class="fa-regular fa-envelope text-gray-400" /> 3fstorevietnam@gmail.com
            </p>
          </div>
          <h4 class="text-xs font-bold text-gray-500 uppercase mb-3">Theo dõi 3F Store</h4>
          <div class="flex gap-2">
            <a
              v-for="social in socials"
              :key="social.label"
              href="#"
              class="w-8 h-8 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition"
              :aria-label="social.label"
            >
              <i :class="social.icon" />
            </a>
          </div>
        </div>

        <div v-for="column in footerColumns" :key="column.title">
          <h3 class="text-sm font-bold text-gray-800 mb-4">{{ column.title }}</h3>
          <ul class="space-y-3">
            <li v-for="link in column.links" :key="link">
              <a href="#" class="text-sm text-gray-500 hover:text-blue-600 transition">{{ link }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-bold text-gray-800 mb-4">Hệ thống cửa hàng</h3>
          <div class="space-y-4">
            <div>
              <h4 class="text-sm font-bold text-gray-700">16 Đường số 12</h4>
              <p class="text-xs text-gray-500 mt-0.5">16 Đường số 12 P. An Khánh, TP Thủ Đức, TP HCM</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7838.522251090781!2d106.72976997451738!3d10.791301458920247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529082c98d0e9%3A0x9bd395e7d8dd9e5b!2s3F%20Store%20-%20Shop%20%26%20Kho%20t%E1%BB%95ng!5e0!3m2!1svi!2s!4v1780632689693!5m2!1svi!2s"
              width="200"
              height="150"
              style="border:0;"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <hr class="border-gray-200">

      <div class="py-6 flex flex-col md:flex-row gap-8">
        <div>
          <h4 class="text-xs font-bold text-gray-500 uppercase mb-3">Thanh toán</h4>
          <div class="flex gap-2 items-center">
            <span class="bg-[#141b4d] text-white text-[10px] font-bold px-3 py-1 rounded">VISA</span>
            <span class="bg-gray-100 border border-gray-200 w-9 h-6 rounded flex items-center justify-center">
              <span class="flex">
                <span class="w-2.5 h-2.5 bg-red-500 rounded-full" />
                <span class="w-2.5 h-2.5 bg-yellow-500 rounded-full -ml-1 opacity-90" />
              </span>
            </span>
            <span class="bg-gray-100 border border-gray-200 text-[#003986] text-[8px] font-black px-1 py-1 rounded">JCB</span>
            <span class="bg-gray-100 border border-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded">ATM</span>
          </div>
        </div>
        <div>
          <h4 class="text-xs font-bold text-gray-500 uppercase mb-3">Vận chuyển</h4>
          <div class="flex gap-2 items-center">
            <span class="bg-[#f06e28] text-white text-[10px] font-bold px-2 py-1 rounded">Ahamove</span>
            <span class="bg-[#f26522] text-white text-[10px] font-bold px-2 py-1 rounded">GHN</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#f0f2f8] py-5 border-t border-gray-200 mt-2">
      <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-xs text-gray-500 text-center md:text-left leading-relaxed">
          <p>© 2026 CÔNG TY TNHH 3F STORE. MST: 0319126776.</p>
          <p>16 Đường số 12, Phường An Khánh, TP Hồ Chí Minh, Việt Nam</p>
        </div>
        <img :src="govSeal" alt="Đã thông báo Bộ Công Thương" class="h-10 object-contain">
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  props: {
    logo: { type: String, required: true },
    govSeal: { type: String, required: true },
    footerColumns: { type: Array, required: true },
    socials: { type: Array, required: true }
  }
}
</script>

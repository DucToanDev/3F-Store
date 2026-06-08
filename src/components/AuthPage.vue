<template>
  <div class="min-h-screen bg-white text-gray-800 font-desgin">
    <SiteHeader
      :logo="images.logo"
      :search-keywords="searchKeywords"
      :mobile-menu="mobileMenu"
      :desktop-menu="desktopMenu"
    />

    <main>
      <section class="auth-hero">
        <div class="auth-card">
          <h1>Đăng nhập / Đăng ký</h1>
          <p>Nhập số điện thoại để nhận mã xác thực</p>

          <label class="auth-label">Số điện thoại</label>
          <div class="phone-field">
            <button type="button">VN +84</button>
            <input v-model="phone" type="tel" placeholder="912 345 678">
          </div>

          <label v-if="passwordMode" class="auth-label password-label">Mật khẩu</label>
          <input
            v-if="passwordMode"
            v-model="password"
            type="password"
            placeholder="Nhập mật khẩu"
            class="password-field"
          >

          <button type="button" class="otp-button" @click="passwordMode ? login() : sendOtp()">
            {{ passwordMode ? 'Đăng nhập' : 'Gửi mã OTP' }}
          </button>
          <button type="button" class="password-link" @click="passwordMode = !passwordMode">
            {{ passwordMode ? 'Đăng nhập bằng OTP' : 'Đăng nhập bằng mật khẩu' }}
          </button>

          <div class="divider"><span>HOẶC</span></div>

          <button type="button" class="email-button">
            <i class="fa-regular fa-envelope" />
            Đăng nhập bằng email
          </button>

          <div class="social-grid">
            <button type="button" aria-label="Zalo">
              <span class="zalo-mark">Zalo</span>
            </button>
            <button type="button" aria-label="Facebook">
              <i class="fa-brands fa-facebook-f text-[#1877f2]" />
            </button>
            <button type="button" aria-label="Google">
              <span class="google-mark">G</span>
            </button>
          </div>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div class="club-banner">
          <div>
            <span>Paddier Club</span>
            <h2>Tích điểm mỗi đơn hàng - Đổi quà cực đỉnh!</h2>
            <p>Đăng ký thành viên để nhận ưu đãi độc quyền, tích điểm x2 và freeship không giới hạn.</p>
            <router-link to="/products">
              Tìm hiểu thêm
              <i class="fa-solid fa-arrow-right" />
            </router-link>
          </div>
          <div class="bubble one" />
          <div class="bubble two" />
          <div class="bubble three" />
        </div>
      </section>

      <section class="benefit-band">
        <div class="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div v-for="benefit in benefits" :key="benefit.title" class="auth-benefit">
            <div :class="['benefit-icon', benefit.theme]">
              <i :class="benefit.icon" />
            </div>
            <h3>{{ benefit.title }}</h3>
            <p>{{ benefit.desc }}</p>
          </div>
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
import { searchKeywords, mobileMenu, desktopMenu, footerColumns, socials } from '@/data/site'

export default {
  name: 'AuthPage',
  components: {
    SiteHeader,
    SiteFooter
  },
  data () {
    return {
      phone: '',
      password: '',
      passwordMode: false,
      searchKeywords,
      mobileMenu,
      desktopMenu,
      footerColumns,
      socials,
      images: {
        logo: require('@/assets/images/logo.webp'),
        govSeal: require('@/assets/images/gov-seal.webp')
      },
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
  methods: {
    sendOtp () {
      this.login()
    },
    login () {
      const user = {
        phone: this.phone || '912 345 678',
        loggedInAt: new Date().toISOString()
      }
      window.localStorage.setItem('3f_auth_user', JSON.stringify(user))
      this.$router.push(String(this.$route.query.redirect || '/'))
    }
  }
}
</script>

<style scoped>
.auth-hero {
  min-height: 430px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 44px 16px 28px;
  background: linear-gradient(180deg, #fff 0%, #fff 78%, #f3f6ff 100%);
}

.auth-card {
  width: 100%;
  max-width: 470px;
  border: 1px solid #d9deec;
  border-radius: 18px;
  background: #fff;
  padding: 28px 28px 24px;
  box-shadow: 0 18px 46px rgba(15, 23, 42, 0.06);
}

.auth-card h1 {
  font-size: 24px;
  font-weight: 900;
  color: #111827;
}

.auth-card p {
  margin-top: 6px;
  color: #64748b;
  font-size: 14px;
}

.auth-label {
  display: block;
  margin-top: 28px;
  margin-bottom: 9px;
  color: #1f2937;
  font-size: 13px;
  font-weight: 900;
}

.phone-field {
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 8px;
}

.phone-field button,
.phone-field input,
.email-button,
.social-grid button {
  height: 42px;
  border: 1px solid #d9deec;
  border-radius: 14px;
  background: #fff;
}

.phone-field button {
  color: #4b5563;
  background: #e9edff;
  font-size: 13px;
}

.phone-field input {
  padding: 0 14px;
  outline: none;
  color: #374151;
}

.password-label {
  margin-top: 14px;
}

.password-field {
  width: 100%;
  height: 42px;
  border: 1px solid #d9deec;
  border-radius: 14px;
  padding: 0 14px;
  color: #374151;
  outline: none;
}

.password-field:focus,
.phone-field input:focus {
  border-color: #0051ff;
  box-shadow: 0 0 0 3px rgba(0, 81, 255, 0.08);
}

.otp-button {
  width: 100%;
  height: 44px;
  margin-top: 16px;
  border-radius: 13px;
  background: #7ea0ff;
  color: #fff;
  font-weight: 900;
}

.password-link {
  display: block;
  margin: 18px auto 0;
  color: #0051ff;
  font-size: 13px;
  font-weight: 900;
}

.divider {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 22px 0;
  color: #64748b;
  font-size: 12px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #d9deec;
}

.email-button {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #1f2937;
  font-weight: 900;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.zalo-mark {
  color: #0068ff;
  font-size: 11px;
  font-weight: 900;
}

.google-mark {
  color: #4285f4;
  font-size: 18px;
  font-weight: 900;
}

.club-banner {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  background: linear-gradient(105deg, #0051ff 0%, #1d66ff 55%, #4a82ff 100%);
  padding: 42px;
  color: #fff;
}

.club-banner span {
  display: inline-flex;
  border-radius: 999px;
  background: #ffd400;
  padding: 5px 12px;
  color: #111827;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 900;
}

.club-banner h2 {
  margin-top: 18px;
  font-size: 26px;
  font-weight: 900;
}

.club-banner p {
  max-width: 620px;
  margin-top: 12px;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.88);
}

.club-banner a {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  border-radius: 12px;
  background: #fff;
  padding: 12px 18px;
  color: #0051ff;
  font-size: 14px;
  font-weight: 900;
}

.bubble {
  position: absolute;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
}

.bubble.one {
  right: 26px;
  top: 22px;
  width: 98px;
  height: 98px;
}

.bubble.two {
  right: 88px;
  bottom: 20px;
  width: 66px;
  height: 66px;
}

.bubble.three {
  right: 58px;
  bottom: 94px;
  width: 42px;
  height: 42px;
}

.benefit-band {
  background: #f4f6ff;
  padding: 44px 0;
}

.auth-benefit {
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
}

.benefit-icon.blue {
  background: #e8efff;
  color: #0051ff;
}

.benefit-icon.yellow {
  background: #fff4cb;
  color: #d99a00;
}

.auth-benefit h3 {
  font-size: 13px;
  font-weight: 900;
}

.auth-benefit p {
  margin-top: 4px;
  color: #64748b;
  font-size: 11px;
}

@media (max-width: 640px) {
  .auth-card {
    padding: 22px 18px;
  }

  .club-banner {
    padding: 28px 22px;
  }

  .club-banner h2 {
    font-size: 21px;
  }
}
</style>

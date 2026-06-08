export const searchKeywords = [
  'Royal Canin',
  'Thức ăn chó',
  'Thức ăn mèo',
  'Pate',
  'Cát vệ sinh',
  'Đồ chơi thú cưng'
]

export const mobileMenu = [
  { label: 'Chó', hasDropdown: true },
  { label: 'Mèo', hasDropdown: true },
  { label: 'Danh mục sản phẩm', to: '/categories' },
  { label: 'Thương hiệu' },
  { label: 'Khuyến mãi' },
  { label: 'Cửa hàng' }
]

export const desktopMenu = [
  { label: 'Chó', children: ['Thức ăn hạt cho chó', 'Pate & xúc xích', 'Bánh thưởng & snack', 'Sữa tắm & vệ sinh'] },
  { label: 'Mèo', children: ['Thức ăn hạt cho mèo', 'Pate & súp thưởng', 'Cát vệ sinh', 'Đồ chơi cho mèo'] },
  { label: 'Danh mục sản phẩm', to: '/categories' },
  { label: 'Thương hiệu' },
  { label: 'Blog chăm Boss' },
  { label: 'Khuyến mãi' },
  { label: 'Cửa hàng' }
]

export const footerColumns = [
  { title: 'Về 3F Store', links: ['Giới thiệu', 'Thành viên Paddier', 'Liên hệ', 'Tuyển dụng'] },
  { title: 'Mua sắm', links: ['Dành cho chó', 'Dành cho mèo', 'Thương hiệu', 'Blogs', 'Bộ sưu tập'] },
  { title: 'Hỗ trợ khách hàng', links: ['Chính sách đổi trả hàng', 'Phương thức thanh toán', 'Hướng dẫn mua hàng', 'Chính sách vận chuyển', 'Câu hỏi thường gặp'] }
]

export const socials = [
  { label: 'Facebook', icon: 'fa-brands fa-facebook-f' },
  { label: 'Instagram', icon: 'fa-brands fa-instagram' },
  { label: 'Tiktok', icon: 'fa-brands fa-tiktok' }
]

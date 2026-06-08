import Vue from 'vue'

const cartStore = new Vue({
  data () {
    return {
      isOpen: false,
      items: []
    }
  },
  computed: {
    count () {
      return this.items.reduce((total, item) => total + item.quantity, 0)
    },
    subtotal () {
      return this.items.reduce((total, item) => total + (item.priceValue || 0) * item.quantity, 0)
    }
  },
  methods: {
    open () {
      this.isOpen = true
      document.body.style.overflow = 'hidden'
    },
    close () {
      this.isOpen = false
      document.body.style.overflow = 'auto'
    },
    add (product) {
      const existing = this.items.find((item) => item.id === product.id || item.slug === product.slug)
      if (existing) {
        existing.quantity += 1
      } else {
        this.items.push({
          id: product.id,
          slug: product.slug || String(product.id),
          name: product.name,
          brand: product.brand || '',
          image: product.image,
          price: product.price,
          priceValue: product.priceValue || parsePrice(product.price),
          quantity: 1
        })
      }
      this.open()
    },
    increase (item) {
      item.quantity += 1
    },
    decrease (item) {
      if (item.quantity > 1) {
        item.quantity -= 1
        return
      }
      this.remove(item)
    },
    remove (item) {
      this.items = this.items.filter((cartItem) => cartItem !== item)
      if (!this.items.length) this.close()
    }
  }
})

function parsePrice (price) {
  const number = String(price || '').replace(/[^\d]/g, '')
  return number ? Number(number) : 0
}

export default cartStore

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, MenuItem, Restaurant } from '@/types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const promoCode = ref('')
  const selectedTip = ref(0)

  const count       = computed(() => items.value.reduce((s: number, i: CartItem) => s + i.qty, 0))
  const subtotal    = computed(() => items.value.reduce((s: number, i: CartItem) => s + i.price * i.qty, 0))
  const deliveryFee = computed(() => items.value.length ? 800 : 0)
  const serviceFee  = computed(() => items.value.length ? 200 : 0)
  const total       = computed(() => subtotal.value + deliveryFee.value + serviceFee.value + selectedTip.value)

  function add(item: MenuItem, restaurant: Restaurant) {
    const existing = items.value.find((c: CartItem) => c.id === item.id)
    if (existing) { existing.qty++ }
    else { items.value.push({ ...item, qty: 1, restaurantName: restaurant.name }) }
  }

  function updateQty(itemId: number, delta: number) {
    const idx = items.value.findIndex((c: CartItem) => c.id === itemId)
    if (idx === -1) return
    items.value[idx].qty += delta
    if (items.value[idx].qty <= 0) items.value.splice(idx, 1)
  }

  function remove(itemId: number) {
    items.value = items.value.filter((c: CartItem) => c.id !== itemId)
  }

  function getItem(itemId: number): CartItem | undefined {
    return items.value.find((c: CartItem) => c.id === itemId)
  }

  function clear() { items.value = [] }

  return { items, promoCode, selectedTip, count, subtotal, deliveryFee, serviceFee, total, add, updateQty, remove, getItem, clear }
})

export const useUIStore = defineStore('ui', () => {
  const dark       = ref(false)
  const cartOpen   = ref(false)
  const authModal  = ref(false)
  const authTab    = ref<'login' | 'signup'>('login')
  const mobileMenu = ref(false)
  const loggedIn   = ref(false)

  function toggleDark() {
    dark.value = !dark.value
    document.documentElement.classList.toggle('dark', dark.value)
    document.body.classList.toggle('dark', dark.value)
  }

  function closeAll() {
    cartOpen.value = false
    authModal.value = false
    mobileMenu.value = false
  }

  return { dark, cartOpen, authModal, authTab, mobileMenu, loggedIn, toggleDark, closeAll }
})

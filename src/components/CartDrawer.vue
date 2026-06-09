<script setup lang="ts">
import { useRouter } from '@/router'
import { useCartStore, useUIStore } from '@/stores'

const router = useRouter()
const cart   = useCartStore()
const ui     = useUIStore()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="ui.cartOpen" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" @click="ui.cartOpen = false" />
    </Transition>
    <Transition name="slide-right">
      <div v-if="ui.cartOpen" class="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col shadow-2xl"
        :class="ui.dark ? 'bg-gray-900' : 'bg-white'" @click.stop>
        <!-- Header -->
        <div class="flex items-center justify-between p-5 border-b" :class="ui.dark ? 'border-gray-700' : ''">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
              <svg class="w-5 h-5 text-[#FF5A1F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 5H3m4 8v6a1 1 0 001 1h10a1 1 0 001-1v-6"/></svg>
            </div>
            <div>
              <h3 class="font-semibold text-base" style="font-family:var(--font-display)" :class="ui.dark ? 'text-white' : ''">Your Cart</h3>
              <p class="text-xs" :class="ui.dark ? 'text-gray-400' : 'text-gray-500'">{{ cart.count }} item{{ cart.count !== 1 ? 's' : '' }}</p>
            </div>
          </div>
          <button @click="ui.cartOpen = false" class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" :class="ui.dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <!-- Items -->
        <div class="flex-1 overflow-y-auto p-5">
          <div v-if="cart.items.length === 0" class="flex flex-col items-center justify-center h-full text-center py-12">
            <div class="w-24 h-24 rounded-full flex items-center justify-center mb-4" :class="ui.dark ? 'bg-gray-800' : 'bg-orange-50'">
              <svg class="w-12 h-12 text-[#FF5A1F] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 5H3m4 8v6a1 1 0 001 1h10a1 1 0 001-1v-6"/></svg>
            </div>
            <p class="font-semibold text-lg mb-1" style="font-family:var(--font-display)" :class="ui.dark ? 'text-white' : ''">Cart is empty</p>
            <p class="text-sm mb-4" :class="ui.dark ? 'text-gray-400' : 'text-gray-500'">Add some delicious items!</p>
            <button @click="ui.cartOpen = false; router.push('restaurants')" class="btn-primary px-6 py-2.5 rounded-xl text-sm font-medium">Browse Restaurants</button>
          </div>
          <TransitionGroup name="cart-item" tag="div" class="space-y-3">
            <div v-for="item in cart.items" :key="item.id" class="flex gap-3 p-3 rounded-2xl" :class="ui.dark ? 'bg-gray-800' : 'bg-gray-50'">
              <img :src="item.image" :alt="item.name" class="w-16 h-16 rounded-xl object-cover flex-shrink-0"/>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm truncate" :class="ui.dark ? 'text-white' : ''">{{ item.name }}</p>
                <p class="text-xs text-[#FF5A1F] font-medium mt-0.5">₦{{ item.price.toLocaleString() }}</p>
                <div class="flex items-center gap-2 mt-2">
                  <button @click="cart.updateQty(item.id,-1)" class="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold transition-colors hover:bg-[#FF5A1F] hover:text-white hover:border-[#FF5A1F]" :class="ui.dark ? 'border-gray-600' : 'border-gray-300'">−</button>
                  <span class="text-sm font-semibold w-5 text-center" :class="ui.dark ? 'text-white' : ''">{{ item.qty }}</span>
                  <button @click="cart.updateQty(item.id,1)" class="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold transition-colors hover:bg-[#FF5A1F] hover:text-white hover:border-[#FF5A1F]" :class="ui.dark ? 'border-gray-600' : 'border-gray-300'">+</button>
                </div>
              </div>
              <div class="flex flex-col items-end justify-between">
                <button @click="cart.remove(item.id)" class="text-red-400 hover:text-red-600 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
                <p class="text-sm font-bold text-[#FF5A1F]">₦{{ (item.price * item.qty).toLocaleString() }}</p>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Footer -->
        <div v-if="cart.items.length > 0" class="p-5 border-t space-y-4" :class="ui.dark ? 'border-gray-700' : ''">
          <div class="flex gap-2">
            <input v-model="cart.promoCode" type="text" placeholder="Promo code"
              class="flex-1 px-4 py-2.5 rounded-xl text-sm border focus:border-[#FF5A1F] transition-colors outline-none"
              :class="ui.dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'"/>
            <button class="px-4 py-2.5 rounded-xl btn-primary text-sm font-medium">Apply</button>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between"><span :class="ui.dark?'text-gray-400':'text-gray-500'">Subtotal</span><span :class="ui.dark?'text-white':''">₦{{ cart.subtotal.toLocaleString() }}</span></div>
            <div class="flex justify-between"><span :class="ui.dark?'text-gray-400':'text-gray-500'">Delivery fee</span><span :class="ui.dark?'text-white':''">₦{{ cart.deliveryFee.toLocaleString() }}</span></div>
            <div class="flex justify-between"><span :class="ui.dark?'text-gray-400':'text-gray-500'">Service fee</span><span :class="ui.dark?'text-white':''">₦{{ cart.serviceFee.toLocaleString() }}</span></div>
            <div class="flex justify-between pt-2 border-t font-bold text-base" :class="ui.dark?'border-gray-700':''">
              <span :class="ui.dark?'text-white':''">Total</span>
              <span class="text-[#FF5A1F]">₦{{ cart.total.toLocaleString() }}</span>
            </div>
          </div>
          <button @click="ui.cartOpen=false; router.push('checkout')" class="w-full btn-primary py-3.5 rounded-2xl font-semibold text-base">
            Checkout • ₦{{ cart.total.toLocaleString() }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

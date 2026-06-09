<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from '@/router'
import { useCartStore, useUIStore } from '@/stores'
import { RESTAURANTS, MENU_ITEMS } from '@/data'
import type { MenuItem } from '@/types'

const route      = useRoute()
const router     = useRouter()
const cart       = useCartStore()
const ui         = useUIStore()
const id         = Number(route.value.params.id) || 1
const restaurant = RESTAURANTS.find(r => r.id === id) ?? RESTAURANTS[0]
const activeCat  = ref('All')
const categories = computed(() => ['All', ...new Set(MENU_ITEMS.map((i: MenuItem) => i.category))])
const items      = computed((): MenuItem[] => activeCat.value==='All' ? MENU_ITEMS : MENU_ITEMS.filter((i: MenuItem) => i.category===activeCat.value))

function addItem(item: MenuItem) { cart.add(item, restaurant); ui.cartOpen = true }
</script>
<template>
  <div class="pb-16 min-h-screen">
    <div class="relative h-64 sm:h-80 overflow-hidden">
      <img :src="restaurant.image" :alt="restaurant.name" class="w-full h-full object-cover"/>
      <div class="absolute inset-0" style="background:linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.7))"></div>
      <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-wrap gap-2 mb-3">
            <span v-for="tag in restaurant.tags" :key="tag" class="tag-chip bg-white/20 text-white border border-white/30">{{ tag }}</span>
            <span :class="restaurant.open?'badge-open':'badge-closed'" class="tag-chip">{{ restaurant.open?'Open':'Closed' }}</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-black text-white mb-2" style="font-family:var(--font-display)">{{ restaurant.name }}</h1>
          <div class="flex flex-wrap items-center gap-4 text-white/80 text-sm">
            <span>⭐ {{ restaurant.rating }} ({{ restaurant.reviews }})</span>
            <span>⏱ {{ restaurant.time }}–{{ restaurant.time+10 }} min</span>
            <span>🛵 ₦{{ restaurant.deliveryFee }} delivery</span>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
      <div class="flex gap-2 overflow-x-auto pb-2 mb-8">
        <button v-for="cat in categories" :key="cat" @click="activeCat=cat"
          class="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          :class="activeCat===cat?'bg-[#FF5A1F] text-white shadow-md':ui.dark?'bg-gray-800 text-gray-300':'bg-white text-gray-600 shadow-sm border border-gray-200'">
          {{ cat }}
        </button>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="item in items" :key="item.id" class="rounded-2xl overflow-hidden flex gap-4 p-4 transition-all" :class="ui.dark?'bg-gray-800':'bg-white shadow-sm border border-gray-100 hover:shadow-md'">
          <div class="relative flex-shrink-0">
            <img :src="item.image" :alt="item.name" class="w-24 h-24 rounded-xl object-cover"/>
            <div v-if="item.spicy" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs">🌶</div>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-sm mb-1" :class="ui.dark?'text-white':''">{{ item.name }}</h4>
            <p class="text-xs leading-relaxed mb-2 line-clamp-2" :class="ui.dark?'text-gray-400':'text-gray-500'">{{ item.desc }}</p>
            <div class="flex items-center gap-3 text-xs mb-2" :class="ui.dark?'text-gray-400':'text-gray-400'">
              <span>{{ item.cal }} cal</span><span v-if="item.veg" class="text-[#16A34A] font-medium">🌿 Veg</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="font-bold text-[#FF5A1F]">₦{{ item.price.toLocaleString() }}</span>
              <div class="flex items-center gap-2">
                <template v-if="cart.getItem(item.id)">
                  <button @click="cart.updateQty(item.id,-1)" class="w-6 h-6 rounded-full bg-orange-50 text-[#FF5A1F] flex items-center justify-center text-sm font-bold hover:bg-[#FF5A1F] hover:text-white transition-colors">−</button>
                  <span class="text-sm font-bold w-4 text-center" :class="ui.dark?'text-white':''">{{ cart.getItem(item.id)!.qty }}</span>
                  <button @click="cart.updateQty(item.id,1)" class="w-6 h-6 rounded-full bg-[#FF5A1F] text-white flex items-center justify-center text-sm font-bold hover:bg-orange-600 transition-colors">+</button>
                </template>
                <button v-else @click="addItem(item)" class="w-7 h-7 rounded-xl bg-[#FF5A1F] text-white flex items-center justify-center font-bold text-lg hover:bg-orange-600 transition-all hover:scale-110">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

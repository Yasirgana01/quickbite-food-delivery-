<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from '@/router'
import RestaurantCard from '@/components/RestaurantCard.vue'
import { useUIStore } from '@/stores'
import { RESTAURANTS, FILTERS } from '@/data'
import type { FilterType } from '@/data'
import type { Restaurant } from '@/types'

const router       = useRouter()
const ui           = useUIStore()
const restaurants  = ref<Restaurant[]>(RESTAURANTS)
const activeFilter = ref<FilterType>('All')

const filtered = computed((): Restaurant[] => {
  const r = restaurants.value
  switch (activeFilter.value) {
    case 'Top Rated':     return r.filter((x: Restaurant) => x.rating >= 4.7)
    case 'Open Now':      return r.filter((x: Restaurant) => x.open)
    case 'Offers':        return r.filter((x: Restaurant) => x.discount !== null)
    case 'Fast Delivery': return r.filter((x: Restaurant) => x.time <= 20)
    case 'Budget':        return r.filter((x: Restaurant) => x.deliveryFee <= 400)
    default:              return r
  }
})
function toggleWishlist(id: number) {
  const r = restaurants.value.find((r: Restaurant) => r.id === id)
  if (r) r.wishlisted = !r.wishlisted
}
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 min-h-screen">
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-2" style="font-family:var(--font-display)" :class="ui.dark?'text-white':''">Restaurants Near You</h1>
      <p :class="ui.dark?'text-gray-400':'text-gray-500'">{{ filtered.length }} restaurants available</p>
    </div>
    <div class="flex flex-wrap gap-3 mb-8">
      <button v-for="f in FILTERS" :key="f" @click="activeFilter = f"
        class="px-4 py-2 rounded-xl text-sm font-medium transition-all"
        :class="activeFilter===f?'bg-[#FF5A1F] text-white shadow-md':ui.dark?'bg-gray-800 text-gray-300 hover:bg-gray-700':'bg-white text-gray-600 shadow-sm border border-gray-200 hover:border-[#FF5A1F]'">
        {{ f }}
      </button>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <RestaurantCard v-for="r in filtered" :key="r.id" :restaurant="r"
        @click="router.push('menu',{id:String(r.id)})"
        @toggle-wishlist="toggleWishlist(r.id)"/>
    </div>
    <div v-if="filtered.length===0" class="text-center py-24">
      <div class="text-6xl mb-4">🍽️</div>
      <p class="text-xl font-semibold" :class="ui.dark?'text-white':''">No restaurants found</p>
    </div>
  </div>
</template>

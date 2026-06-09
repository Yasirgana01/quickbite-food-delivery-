<script setup lang="ts">
import type { Restaurant } from '@/types'
import { useUIStore } from '@/stores'

const props = defineProps<{ restaurant: Restaurant }>()
const emit = defineEmits<{
  click: []
  toggleWishlist: []
}>()

const ui = useUIStore()
</script>

<template>
  <div @click="emit('click')" class="food-card rounded-3xl overflow-hidden cursor-pointer card-hover"
    :class="ui.dark ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-100'">
    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <img :src="restaurant.image" :alt="restaurant.name" class="food-card-img w-full h-full object-cover"/>
      <div class="absolute inset-0" style="background:linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.4))"></div>
      <div class="absolute top-3 left-3 flex gap-2">
        <span v-if="restaurant.discount" class="badge-discount tag-chip text-white">{{ restaurant.discount }}</span>
        <span :class="restaurant.open ? 'badge-open' : 'badge-closed'" class="tag-chip">
          {{ restaurant.open ? 'Open' : 'Closed' }}
        </span>
      </div>
      <button @click.stop="emit('toggleWishlist')"
        class="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
        <svg class="w-4 h-4" :class="restaurant.wishlisted ? 'text-red-500 fill-red-500' : 'text-gray-300'"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </button>
    </div>

    <!-- Details -->
    <div class="p-5">
      <div class="flex items-start justify-between mb-2">
        <h3 class="font-bold text-base" :class="ui.dark ? 'text-white' : ''">{{ restaurant.name }}</h3>
        <div class="flex items-center gap-1 flex-shrink-0">
          <svg class="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          <span class="text-xs font-bold" :class="ui.dark ? 'text-white' : ''">{{ restaurant.rating }}</span>
          <span class="text-xs" :class="ui.dark ? 'text-gray-400' : 'text-gray-400'">({{ restaurant.reviews }})</span>
        </div>
      </div>
      <div class="flex flex-wrap gap-1.5 mb-3">
        <span v-for="tag in restaurant.tags" :key="tag" class="tag-chip"
          :class="ui.dark ? 'bg-gray-700 text-gray-300' : 'bg-orange-50 text-[#FF5A1F]'">{{ tag }}</span>
      </div>
      <div class="flex items-center gap-4 text-xs" :class="ui.dark ? 'text-gray-400' : 'text-gray-500'">
        <span class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          {{ restaurant.time }} min
        </span>
        <span class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
          {{ restaurant.distance }} km
        </span>
        <span class="flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
          ₦{{ restaurant.deliveryFee }} fee
        </span>
      </div>
    </div>
  </div>
</template>

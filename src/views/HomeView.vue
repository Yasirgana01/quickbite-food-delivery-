<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '@/router'
import RestaurantCard from '@/components/RestaurantCard.vue'
import AppFooter      from '@/components/AppFooter.vue'
import { useUIStore } from '@/stores'
import { useCountdown } from '@/composables/useCountdown'
import { RESTAURANTS, CATEGORIES, TRENDING_DISHES, FEATURES, STATS } from '@/data'
import type { Restaurant } from '@/types'

const router = useRouter()
const ui     = useUIStore()
const { h: ch, m, s, pad } = useCountdown()
const restaurants = ref<Restaurant[]>(RESTAURANTS)
const heroAddress = ref('')
function toggleWishlist(id: number) {
  const r = restaurants.value.find((r: Restaurant) => r.id === id)
  if (r) r.wishlisted = !r.wishlisted
}
</script>
<template>
  <!-- Hero -->
  <section class="hero-gradient min-h-[88vh] flex items-center relative overflow-hidden">
    <div class="absolute top-20 right-10 w-64 h-64 rounded-full opacity-20" style="background:radial-gradient(circle,#FF5A1F,transparent)"></div>
    <div class="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-10" style="background:radial-gradient(circle,#FF8C00,transparent)"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div style="animation:slideUp 0.5s ease-out">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" :class="ui.dark?'bg-gray-800 text-amber-400':'bg-white text-[#FF5A1F] shadow-sm border border-orange-100'">
            <span class="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse"></span> 🚀 30 min delivery guaranteed
          </div>
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6" style="font-family:var(--font-display)">
            <span class="block" :class="ui.dark?'text-white':''">Fresh meals</span>
            <span class="hero-text-gradient">delivered fast</span>
            <span class="block" :class="ui.dark?'text-gray-200':'text-[#1A1A1A]'">to your door</span>
          </h1>
          <p class="text-lg mb-8 max-w-lg leading-relaxed" :class="ui.dark?'text-gray-400':'text-gray-600'">Order from top restaurants near you. Hot, fresh food at your doorstep in under 30 minutes.</p>
          <div class="flex flex-col sm:flex-row gap-3 mb-8 mt-15">
            <div class="relative flex-1">
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <input v-model="heroAddress" type="text" placeholder="Enter your delivery address..." class="w-full pl-11 pr-4 py-4 rounded-2xl text-sm border-2 transition-colors focus:border-[#FF5A1F] outline-none" :class="ui.dark?'bg-gray-800 border-gray-700 text-white':'bg-white border-gray-200'"/>
            </div>
            <button @click="router.push('restaurants')" class="btn-primary px-8 py-4 rounded-2xl font-semibold text-base flex-shrink-0">Find Food</button>
          </div>
          <div class="flex flex-wrap gap-2">
            <button v-for="tag in ['🍕 Pizza','🍔 Burger','🥗 Healthy','🍜 Asian','🍣 Sushi','🌯 Wraps']" :key="tag" @click="router.push('restaurants')"
              class="px-6 py-2 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5"
              :class="ui.dark?'bg-gray-800 text-gray-300 hover:bg-gray-700':'bg-white text-gray-700 shadow-sm border border-gray-100 hover:border-[#FF5A1F] hover:text-[#FF5A1F]'">{{ tag }}</button>
          </div>
        </div>
        <div class="hidden lg:flex items-center justify-center">
          <div class="animate-[float_4s_ease-in-out_infinite]">
            <div class="relative w-[400px] h-[400px]">
              <div class="w-full h-full rounded-full overflow-hidden" style="box-shadow:0 40px 80px -20px rgba(255,90,31,0.3)">
                <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&fit=crop" class="w-full h-full object-cover" alt="Burger"/>
              </div>
              <div class="absolute -top-4 -left-8 glass rounded-2xl px-4 py-3 shadow-xl" :class="ui.dark?'border border-gray-700':''">
                <div class="flex items-center gap-2"><span class="text-2xl">⭐</span><div><p class="text-xs" :class="ui.dark?'text-gray-400':'text-gray-500'">Top Rated</p><p class="font-bold text-sm" :class="ui.dark?'text-white':''">4.9/5.0</p></div></div>
              </div>
              <div class="absolute -bottom-4 -right-6 glass rounded-2xl px-4 py-3 shadow-xl" :class="ui.dark?'border border-gray-700':''">
                <div class="flex items-center gap-2"><span class="text-2xl">⚡</span><div><p class="text-xs" :class="ui.dark?'text-gray-400':'text-gray-500'">Avg Delivery</p><p class="font-bold text-sm" :class="ui.dark?'text-white':''">25 min</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats -->
  <section class="py-12 border-y" :class="ui.dark?'border-gray-800 bg-gray-900':'bg-white border-gray-100'">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
      <div v-for="stat in STATS" :key="stat.label" class="text-center">
        <div class="text-3xl font-black text-[#FF5A1F] mb-1" style="font-family:var(--font-display)">{{ stat.value }}</div>
        <div class="text-sm font-medium" :class="ui.dark?'text-gray-400':'text-gray-500'">{{ stat.label }}</div>
      </div>
    </div>
  </section>

  <!-- Categories -->
  <section class="py-16 max-w-7xl mx-auto px-4 sm:px-6">
    <div class="flex items-center justify-between mb-8">
      <div><h2 class="text-3xl font-bold" style="font-family:var(--font-display)" :class="ui.dark?'text-white':''">Browse Categories</h2><p class="text-sm mt-1" :class="ui.dark?'text-gray-400':'text-gray-500'">What are you craving?</p></div>
      <button @click="router.push('restaurants')" class="btn-outline px-5 py-2.5 rounded-xl text-sm font-semibold hidden sm:flex items-center gap-1">See all →</button>
    </div>
    <div class="grid grid-cols-5 sm:grid-cols-10 gap-3">
      <button v-for="cat in CATEGORIES" :key="cat.name" @click="router.push('restaurants')" class="category-card flex flex-col items-center p-3 rounded-2xl border text-center" :class="ui.dark?'bg-gray-800 border-gray-700 hover:border-[#FF5A1F]':'bg-white border-gray-100 hover:border-[#FF5A1F] shadow-sm'">
        <span class="text-3xl mb-1">{{ cat.icon }}</span>
        <span class="text-[10px] font-semibold" :class="ui.dark?'text-gray-300':'text-gray-700'">{{ cat.name }}</span>
      </button>
    </div>
  </section>

  <!-- Featured Restaurants -->
  <section class="py-16" :class="ui.dark?'bg-gray-900':''">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between mb-8">
        <div><h2 class="text-3xl font-bold" style="font-family:var(--font-display)" :class="ui.dark?'text-white':''">Featured Restaurants</h2><p class="text-sm mt-1" :class="ui.dark?'text-gray-400':'text-gray-500'">Handpicked for you today</p></div>
        <button @click="router.push('restaurants')" class="btn-outline px-5 py-2.5 rounded-xl text-sm font-semibold hidden sm:flex items-center gap-1">View all →</button>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RestaurantCard v-for="r in restaurants.slice(0,6)" :key="r.id" :restaurant="r" @click="router.push('menu',{id:String(r.id)})" @toggle-wishlist="toggleWishlist(r.id)"/>
      </div>
    </div>
  </section>

  <!-- Why Us -->
  <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6">
    <div class="text-center mb-12"><h2 class="text-3xl font-bold mb-3" style="font-family:var(--font-display)" :class="ui.dark?'text-white':''">Why choose QuickBite?</h2></div>
    <div class="grid md:grid-cols-3 gap-8">
      <div v-for="feat in FEATURES" :key="feat.title" class="text-center p-8 rounded-3xl border transition-all hover:shadow-xl" :class="ui.dark?'bg-gray-800 border-gray-700':'bg-white border-gray-100'">
        <div class="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-5" :class="feat.bg">{{ feat.icon }}</div>
        <h3 class="font-bold text-lg mb-3" style="font-family:var(--font-display)" :class="ui.dark?'text-white':''">{{ feat.title }}</h3>
        <p class="text-sm leading-relaxed" :class="ui.dark?'text-gray-400':'text-gray-500'">{{ feat.desc }}</p>
      </div>
    </div>
  </section>

  <!-- Trending -->
  <section class="py-16" :class="ui.dark?'bg-gray-900':''">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl font-bold mb-8" style="font-family:var(--font-display)" :class="ui.dark?'text-white':''">Trending Now 🔥</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div v-for="dish in TRENDING_DISHES" :key="dish.name" @click="router.push('restaurants')" class="food-card rounded-2xl overflow-hidden cursor-pointer card-hover" :class="ui.dark?'bg-gray-800':'bg-white shadow-sm border border-gray-100'">
          <div class="h-36 overflow-hidden"><img :src="dish.image" :alt="dish.name" class="food-card-img w-full h-full object-cover"/></div>
          <div class="p-3"><p class="font-semibold text-sm mb-1" :class="ui.dark?'text-white':''">{{ dish.name }}</p><p class="text-[#FF5A1F] font-bold text-sm">₦{{ dish.price.toLocaleString() }}</p></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Flash Deal -->
  <section class="py-12 max-w-7xl mx-auto px-4 sm:px-6">
    <div class="rounded-3xl p-8 sm:p-12 overflow-hidden relative" style="background:linear-gradient(135deg,#1A1A1A,#2D1A08)">
      <div class="absolute right-0 top-0 bottom-0 w-1/3 opacity-20" style="background:radial-gradient(circle at right,#FF5A1F,transparent)"></div>
      <div class="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span class="tag-chip bg-[#FF5A1F] text-white mb-3 inline-block">⚡ Flash Deal</span>
          <h2 class="text-3xl sm:text-4xl font-black text-white mb-2" style="font-family:var(--font-display)">50% OFF Your First Order</h2>
          <p class="text-gray-300 text-lg">Use code <span class="text-[#FF5A1F] font-bold">WELCOME50</span> at checkout</p>
        </div>
        <div class="flex flex-col items-center">
          <p class="text-gray-400 text-sm mb-2">Offer ends in</p>
          <div class="flex gap-3 mb-4">
            <div v-for="(val, label) in { HRS: pad(ch), MIN: pad(m), SEC: pad(s) }" :key="label" class="flex flex-col items-center bg-white/10 rounded-xl p-3 min-w-[56px]">
              <span class="text-2xl font-black text-white">{{ val }}</span>
              <span class="text-gray-400 text-xs mt-0.5">{{ label }}</span>
            </div>
          </div>
          <button @click="router.push('restaurants')" class="btn-primary px-8 py-3 rounded-2xl font-semibold">Order Now</button>
        </div>
      </div>
    </div>
  </section>
  <AppFooter/>
</template>

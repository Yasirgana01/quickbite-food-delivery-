<script setup lang="ts">
import { useRouter, useRoute } from '@/router'
import { useCartStore, useUIStore } from '@/stores'

const route  = useRoute()
const router = useRouter()
const cart   = useCartStore()
const ui     = useUIStore()

const navItems = [
  { label: 'Home',        name: 'home'        },
  { label: 'Restaurants', name: 'restaurants' },
  { label: 'Track Order', name: 'tracking'    },
  { label: 'Dashboard',   name: 'dashboard'   },
] as const
</script>

<template>
  <nav class="sticky top-0 z-30 glass border-b transition-all duration-300"
    :class="ui.dark ? 'border-gray-800' : 'border-orange-50'"
    style="box-shadow:0 1px 20px rgba(255,90,31,0.06)">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <button @click="router.push('home')" class="flex items-center gap-2.5 flex-shrink-0">
          <div class="w-9 h-9 bg-gradient-to-br from-[#FF5A1F] to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
            <span class="text-white text-lg">🍔</span>
          </div>
          <span class="font-bold text-xl tracking-tight" style="font-family:var(--font-display)">
            Quick<span class="text-[#FF5A1F]">Bite</span>
          </span>
        </button>

        <!-- Desktop Nav -->
        <div class="hidden lg:flex items-center gap-6">
          <button v-for="n in navItems" :key="n.name"
            @click="router.push(n.name)"
            class="nav-link text-sm font-medium py-1"
            :class="[route.name === n.name
              ? 'active text-[#FF5A1F]'
              : ui.dark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-[#1A1A1A]']">
            {{ n.label }}
          </button>
        </div>

        <!-- Right controls -->
        <div class="flex items-center gap-2">
          <!-- Dark mode -->
          <button @click="ui.toggleDark()" class="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            :class="ui.dark ? 'hover:bg-gray-800 text-amber-400' : 'hover:bg-gray-100 text-gray-600'">
            <svg v-if="!ui.dark" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          </button>

          <!-- Cart -->
          <button @click="ui.cartOpen = true" class="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            :class="ui.dark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            <span v-if="cart.count > 0" class="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#FF5A1F] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
              {{ cart.count }}
            </span>
          </button>

          <!-- Auth -->
          <button v-if="!ui.loggedIn" @click="ui.authModal = true"
            class="hidden sm:flex btn-primary px-4 py-2 rounded-xl text-sm font-semibold">Sign In</button>
          <button v-else @click="router.push('dashboard')"
            class="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF5A1F] to-amber-500 flex items-center justify-center text-white text-sm font-bold">JD</button>

          <!-- Mobile menu -->
          <button @click="ui.mobileMenu = !ui.mobileMenu" class="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center"
            :class="ui.dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>

      <!-- Mobile Nav -->
      <div v-if="ui.mobileMenu" class="lg:hidden py-3 pb-4 border-t space-y-1" :class="ui.dark ? 'border-gray-800' : ''">
        <button v-for="n in navItems" :key="n.name"
          @click="router.push(n.name); ui.mobileMenu = false"
          class="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
          :class="[route.name === n.name
            ? 'bg-orange-50 text-[#FF5A1F]'
            : ui.dark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-50 text-gray-700']">
          {{ n.label }}
        </button>
      </div>
    </div>
  </nav>
</template>

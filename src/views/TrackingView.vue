<script setup lang="ts">
import { useUIStore } from '@/stores'
import { TRACKING_STEPS } from '@/data'
const ui = useUIStore()
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 min-h-screen">
    <h1 class="text-3xl font-bold mb-2" style="font-family:var(--font-display)" :class="ui.dark ? 'text-white' : ''">Track Your Order</h1>
    <p class="mb-8" :class="ui.dark ? 'text-gray-400' : 'text-gray-500'">Order #QB-2847 · Estimated 22 min remaining</p>
    <!-- Map -->
    <div class="relative h-64 rounded-3xl overflow-hidden mb-8" :class="ui.dark ? 'bg-gray-800' : 'bg-gray-100'">
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center"><div class="text-5xl mb-3">🗺️</div><p class="font-semibold text-sm" :class="ui.dark?'text-gray-400':'text-gray-500'">Live map tracking</p><p class="text-xs mt-1" :class="ui.dark?'text-gray-500':'text-gray-400'">Rider is 1.2km away</p></div>
      </div>
      <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="w-10 h-10 bg-[#FF5A1F] rounded-full flex items-center justify-center shadow-lg animate-pulse"><span class="text-xl">🏍️</span></div>
        <div class="w-20 h-20 rounded-full border-2 border-[#FF5A1F] opacity-30 absolute -top-5 -left-5 animate-ping"></div>
      </div>
    </div>
    <!-- Rider -->
    <div class="p-5 rounded-2xl mb-8 flex items-center gap-4" :class="ui.dark ? 'bg-gray-800' : 'bg-white shadow-sm border border-gray-100'">
      <div class="w-14 h-14 rounded-full bg-gradient-to-br from-[#FF5A1F] to-amber-500 flex items-center justify-center text-white text-xl font-bold">KA</div>
      <div class="flex-1"><p class="font-bold" :class="ui.dark?'text-white':''">Kwame Asante</p><p class="text-sm" :class="ui.dark?'text-gray-400':'text-gray-500'">Your delivery rider · ⭐ 4.8</p></div>
      <div class="flex gap-3">
        <button class="w-10 h-10 rounded-full bg-green-50 text-[#16A34A] flex items-center justify-center hover:bg-green-100 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></button>
        <button class="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg></button>
      </div>
    </div>
    <!-- Timeline -->
    <div class="space-y-0 relative">
      <div v-for="(step, i) in TRACKING_STEPS" :key="step.label" class="relative flex gap-4 pb-8">
        <div v-if="i < TRACKING_STEPS.length - 1" class="absolute left-[19px] top-10 w-0.5 h-full" :class="step.done ? 'bg-[#16A34A]' : ui.dark ? 'bg-gray-700' : 'bg-gray-200'"></div>
        <div class="w-10 h-10 rounded-full flex items-center justify-center text-lg z-10 flex-shrink-0"
          :class="step.done ? 'bg-[#16A34A]' : step.active ? 'bg-[#FF5A1F] animate-pulse' : ui.dark ? 'bg-gray-700' : 'bg-gray-100'">
          {{ step.icon }}
        </div>
        <div class="flex-1 pt-2">
          <div class="flex items-center justify-between">
            <p class="font-semibold text-sm" :class="step.done||step.active?(ui.dark?'text-white':'text-[#1A1A1A]'):(ui.dark?'text-gray-500':'text-gray-400')">{{ step.label }}</p>
            <span v-if="step.time" class="text-xs" :class="ui.dark?'text-gray-500':'text-gray-400'">{{ step.time }}</span>
          </div>
          <p class="text-xs mt-1" :class="ui.dark?'text-gray-500':'text-gray-400'">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

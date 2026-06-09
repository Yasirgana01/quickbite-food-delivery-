<script setup lang="ts">
import { FOOTER_COLS } from '@/data'
import { useUIStore } from '@/stores'
const ui = useUIStore()
</script>

<template>
  <footer class="border-t mt-8" :class="ui.dark ? 'bg-gray-900 border-gray-800' : 'bg-[#1A1A1A]'">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-9 h-9 bg-gradient-to-br from-[#FF5A1F] to-amber-500 rounded-xl flex items-center justify-center">
              <span class="text-white">🍔</span>
            </div>
            <span class="font-bold text-xl text-white" style="font-family:var(--font-display)">
              Quick<span class="text-[#FF5A1F]">Bite</span>
            </span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            Your favourite food, delivered lightning fast. Available 24/7 across Nigeria.
          </p>
          <div class="flex gap-3 mt-4">
            <a href="#" class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#FF5A1F] transition-colors">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#FF5A1F] transition-colors">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>
        <div v-for="col in FOOTER_COLS" :key="col.title">
          <h4 class="text-white font-semibold mb-3">{{ col.title }}</h4>
          <ul class="space-y-2">
            <li v-for="item in col.items" :key="item">
              <a href="#" class="text-gray-400 text-sm hover:text-[#FF5A1F] transition-colors">{{ item }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-gray-500 text-sm">© 2025 QuickBite. All rights reserved.</p>
        <div class="flex gap-4">
          <a href="#" class="text-gray-500 hover:text-[#FF5A1F] transition-colors text-sm">Privacy</a>
          <a href="#" class="text-gray-500 hover:text-[#FF5A1F] transition-colors text-sm">Terms</a>
          <a href="#" class="text-gray-500 hover:text-[#FF5A1F] transition-colors text-sm">Support</a>
        </div>
      </div>
    </div>
  </footer>
</template>

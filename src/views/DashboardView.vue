<script setup lang="ts">
import { ref } from 'vue'
import { navigate } from '@/composables/useRouter'
import { useUIStore } from '@/stores'
import { PAST_ORDERS, SAVED_ADDRESSES, COUPONS } from '@/data'

const ui   = useUIStore()
const tab  = ref('Orders')
const TABS = ['Orders', 'Addresses', 'Coupons', 'Settings']
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 py-8 min-h-screen">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5A1F] to-amber-500 flex items-center justify-center text-white text-2xl font-black">JD</div>
        <div><h1 class="text-2xl font-bold" style="font-family:var(--font-display)" :class="ui.dark?'text-white':''">Welcome back, John!</h1><p class="text-sm" :class="ui.dark?'text-gray-400':'text-gray-500'">john.doe@email.com · Lagos, Nigeria</p></div>
      </div>
      <div class="flex items-center gap-3 px-5 py-3 rounded-2xl" :class="ui.dark?'bg-gray-800':'bg-orange-50'">
        <span class="text-2xl">🏆</span><div><p class="text-xs font-medium" :class="ui.dark?'text-gray-400':'text-gray-600'">Loyalty Points</p><p class="font-black text-xl text-[#FF5A1F]">2,450</p></div>
      </div>
    </div>

    <div class="flex gap-2 overflow-x-auto pb-2 mb-6">
      <button v-for="t in TABS" :key="t" @click="tab = t"
        class="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
        :class="tab === t ? 'bg-[#FF5A1F] text-white' : ui.dark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-600 shadow-sm border border-gray-200'">{{ t }}</button>
    </div>

    <!-- Orders -->
    <div v-if="tab === 'Orders'" class="space-y-4">
      <div v-for="order in PAST_ORDERS" :key="order.id" class="p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4" :class="ui.dark?'bg-gray-800':'bg-white shadow-sm border border-gray-100'">
        <img :src="order.image" :alt="order.restaurant" class="w-16 h-16 rounded-xl object-cover flex-shrink-0"/>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap"><span class="font-bold" :class="ui.dark?'text-white':''">{{ order.restaurant }}</span><span class="tag-chip" :class="order.status==='Delivered'?'bg-green-50 text-[#16A34A]':'bg-orange-50 text-[#FF5A1F]'">{{ order.status }}</span></div>
          <p class="text-sm mt-1" :class="ui.dark?'text-gray-400':'text-gray-500'">{{ order.items }} · {{ order.date }}</p>
        </div>
        <div class="flex flex-col sm:items-end gap-2">
          <span class="font-bold text-[#FF5A1F] text-lg">₦{{ order.total.toLocaleString() }}</span>
          <button class="btn-outline px-4 py-1.5 rounded-xl text-xs font-semibold">Reorder</button>
        </div>
      </div>
    </div>

    <!-- Addresses -->
    <div v-if="tab === 'Addresses'" class="space-y-4">
      <div v-for="addr in SAVED_ADDRESSES" :key="addr.id" class="p-5 rounded-2xl flex items-start gap-4" :class="ui.dark?'bg-gray-800':'bg-white shadow-sm border border-gray-100'">
        <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl flex-shrink-0">{{ addr.icon }}</div>
        <div class="flex-1"><p class="font-semibold" :class="ui.dark?'text-white':''">{{ addr.label }}</p><p class="text-sm mt-0.5" :class="ui.dark?'text-gray-400':'text-gray-500'">{{ addr.address }}</p></div>
        <div class="flex gap-3"><button class="text-[#FF5A1F] text-sm font-medium hover:underline">Edit</button><button class="text-red-500 text-sm font-medium hover:underline">Delete</button></div>
      </div>
      <button class="w-full py-3.5 rounded-2xl border-2 border-dashed text-sm font-semibold flex items-center justify-center gap-2 transition-colors" :class="ui.dark?'border-gray-700 text-gray-400 hover:border-[#FF5A1F] hover:text-[#FF5A1F]':'border-gray-300 text-gray-500 hover:border-[#FF5A1F] hover:text-[#FF5A1F]'">+ Add New Address</button>
    </div>

    <!-- Coupons -->
    <div v-if="tab === 'Coupons'" class="space-y-4">
      <div v-for="coupon in COUPONS" :key="coupon.code" class="p-5 rounded-2xl flex items-center gap-4" :class="ui.dark?'bg-gray-800':'bg-white shadow-sm border border-gray-100'">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" :class="coupon.active?'bg-gradient-to-br from-[#FF5A1F] to-amber-500':'bg-gray-200'">🎟️</div>
        <div class="flex-1"><p class="font-bold text-lg" :class="ui.dark?'text-white':''">{{ coupon.code }}</p><p class="text-sm" :class="ui.dark?'text-gray-400':'text-gray-500'">{{ coupon.desc }}</p><p class="text-xs mt-1" :class="coupon.active?'text-[#16A34A]':'text-red-400'">{{ coupon.active ? 'Valid until '+coupon.expiry : 'Expired' }}</p></div>
        <button v-if="coupon.active" class="btn-outline px-4 py-1.5 rounded-xl text-xs font-semibold">Use</button>
      </div>
    </div>

    <!-- Settings -->
    <div v-if="tab === 'Settings'">
      <div class="p-5 rounded-2xl" :class="ui.dark?'bg-gray-800':'bg-white shadow-sm border border-gray-100'">
        <h3 class="font-bold mb-4" style="font-family:var(--font-display)" :class="ui.dark?'text-white':''">Profile Settings</h3>
        <div class="grid sm:grid-cols-2 gap-4">
          <div v-for="(val, lbl) in {'First Name':'John','Last Name':'Doe','Email':'john.doe@email.com','Phone':'+234 801 234 5678'}" :key="lbl">
            <label class="text-sm font-medium mb-1.5 block" :class="ui.dark?'text-gray-300':'text-gray-700'">{{ lbl }}</label>
            <input type="text" :value="val" class="w-full px-4 py-3 rounded-xl border text-sm focus:border-[#FF5A1F] outline-none" :class="ui.dark?'bg-gray-700 border-gray-600 text-white':'bg-gray-50 border-gray-200'"/>
          </div>
        </div>
        <button class="mt-4 btn-primary px-8 py-3 rounded-xl font-semibold text-sm">Save Changes</button>
      </div>
    </div>
  </div>
</template>

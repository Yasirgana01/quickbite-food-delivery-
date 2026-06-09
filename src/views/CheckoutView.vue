<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from '@/router'
import { useCartStore, useUIStore } from '@/stores'
import { PAYMENT_METHODS } from '@/data'
import type { CheckoutForm } from '@/types'

const router = useRouter()
const cart   = useCartStore()
const ui     = useUIStore()
const step   = ref(0)
const form   = reactive<CheckoutForm>({name:'',phone:'',address:'',city:'',state:'',landmark:'',notes:''})
const selectedPayment = ref('cash')
const orderNumber = ref('')
const STEPS = ['Address','Payment','Confirmation']

function placeOrder() {
  orderNumber.value = `QB-${Math.floor(Math.random()*9000)+1000}`
  cart.clear()
  step.value = 2
}
</script>
<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8 min-h-screen">
    <h1 class="text-3xl font-bold mb-8" style="font-family:var(--font-display)" :class="ui.dark?'text-white':''">Checkout</h1>
    <div class="flex items-center gap-2 mb-10">
      <template v-for="(s,i) in STEPS" :key="s">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all" :class="step>i?'progress-step-done':step===i?'progress-step-active':'progress-step-pending'">
            <svg v-if="step>i" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
            <span v-else>{{i+1}}</span>
          </div>
          <span class="text-sm font-medium hidden sm:block" :class="step===i?'text-[#FF5A1F]':ui.dark?'text-gray-400':'text-gray-500'">{{s}}</span>
        </div>
        <div v-if="i<STEPS.length-1" class="w-8 sm:w-16 h-0.5" :class="step>i?'bg-[#16A34A]':ui.dark?'bg-gray-700':'bg-gray-200'"></div>
      </template>
    </div>
    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <!-- Step 0 -->
        <div v-if="step===0" class="space-y-4" style="animation:slideUp 0.4s ease-out">
          <h3 class="font-bold text-lg" style="font-family:var(--font-display)" :class="ui.dark?'text-white':''">Delivery Address</h3>
          <div class="grid sm:grid-cols-2 gap-4">
            <div><label class="text-sm font-medium mb-1.5 block" :class="ui.dark?'text-gray-300':'text-gray-700'">Full Name</label><input v-model="form.name" type="text" placeholder="John Doe" class="w-full px-4 py-3 rounded-xl border text-sm focus:border-[#FF5A1F] outline-none transition-colors" :class="ui.dark?'bg-gray-800 border-gray-700 text-white':'bg-gray-50 border-gray-200'"/></div>
            <div><label class="text-sm font-medium mb-1.5 block" :class="ui.dark?'text-gray-300':'text-gray-700'">Phone</label><input v-model="form.phone" type="tel" placeholder="+234 801 234 5678" class="w-full px-4 py-3 rounded-xl border text-sm focus:border-[#FF5A1F] outline-none transition-colors" :class="ui.dark?'bg-gray-800 border-gray-700 text-white':'bg-gray-50 border-gray-200'"/></div>
          </div>
          <div><label class="text-sm font-medium mb-1.5 block" :class="ui.dark?'text-gray-300':'text-gray-700'">Delivery Address</label><input v-model="form.address" type="text" placeholder="123 Victoria Island, Lagos" class="w-full px-4 py-3 rounded-xl border text-sm focus:border-[#FF5A1F] outline-none transition-colors" :class="ui.dark?'bg-gray-800 border-gray-700 text-white':'bg-gray-50 border-gray-200'"/></div>
          <div class="grid sm:grid-cols-3 gap-4">
            <div><label class="text-sm font-medium mb-1.5 block" :class="ui.dark?'text-gray-300':'text-gray-700'">City</label><input v-model="form.city" type="text" placeholder="Lagos" class="w-full px-4 py-3 rounded-xl border text-sm focus:border-[#FF5A1F] outline-none" :class="ui.dark?'bg-gray-800 border-gray-700 text-white':'bg-gray-50 border-gray-200'"/></div>
            <div><label class="text-sm font-medium mb-1.5 block" :class="ui.dark?'text-gray-300':'text-gray-700'">State</label><input v-model="form.state" type="text" placeholder="Lagos" class="w-full px-4 py-3 rounded-xl border text-sm focus:border-[#FF5A1F] outline-none" :class="ui.dark?'bg-gray-800 border-gray-700 text-white':'bg-gray-50 border-gray-200'"/></div>
            <div><label class="text-sm font-medium mb-1.5 block" :class="ui.dark?'text-gray-300':'text-gray-700'">Landmark</label><input v-model="form.landmark" type="text" placeholder="Near GTB" class="w-full px-4 py-3 rounded-xl border text-sm focus:border-[#FF5A1F] outline-none" :class="ui.dark?'bg-gray-800 border-gray-700 text-white':'bg-gray-50 border-gray-200'"/></div>
          </div>
          <div><label class="text-sm font-medium mb-1.5 block" :class="ui.dark?'text-gray-300':'text-gray-700'">Notes (optional)</label><textarea v-model="form.notes" placeholder="Ring doorbell twice..." class="w-full px-4 py-3 rounded-xl border text-sm focus:border-[#FF5A1F] outline-none resize-none h-24" :class="ui.dark?'bg-gray-800 border-gray-700 text-white':'bg-gray-50 border-gray-200'"></textarea></div>
          <button @click="step=1" class="w-full btn-primary py-3.5 rounded-2xl font-semibold">Continue to Payment →</button>
        </div>
        <!-- Step 1 -->
        <div v-if="step===1" class="space-y-4" style="animation:slideUp 0.4s ease-out">
          <h3 class="font-bold text-lg" style="font-family:var(--font-display)" :class="ui.dark?'text-white':''">Payment Method</h3>
          <div class="grid sm:grid-cols-2 gap-4">
            <button v-for="pm in PAYMENT_METHODS" :key="pm.id" @click="selectedPayment=pm.id"
              class="p-4 rounded-2xl border-2 text-left transition-all"
              :class="selectedPayment===pm.id?'border-[#FF5A1F] bg-orange-50':ui.dark?'border-gray-700':'border-gray-200'">
              <div class="flex items-center gap-3 mb-1">
                <span class="text-2xl">{{pm.icon}}</span>
                <span class="font-semibold text-sm" :class="ui.dark?'text-white':''">{{pm.name}}</span>
                <div v-if="selectedPayment===pm.id" class="ml-auto w-5 h-5 bg-[#FF5A1F] rounded-full flex items-center justify-center">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                </div>
              </div>
              <p class="text-xs" :class="ui.dark?'text-gray-400':'text-gray-500'">{{pm.desc}}</p>
            </button>
          </div>
          <div v-if="selectedPayment==='card'" class="space-y-3 p-5 rounded-2xl border" :class="ui.dark?'bg-gray-800 border-gray-700':'bg-gray-50'">
            <input type="text" placeholder="Card Number" class="w-full px-4 py-3 rounded-xl border text-sm focus:border-[#FF5A1F] outline-none" :class="ui.dark?'bg-gray-900 border-gray-700 text-white':'bg-white border-gray-200'"/>
            <div class="grid grid-cols-2 gap-3">
              <input type="text" placeholder="MM / YY" class="w-full px-4 py-3 rounded-xl border text-sm outline-none" :class="ui.dark?'bg-gray-900 border-gray-700 text-white':'bg-white border-gray-200'"/>
              <input type="text" placeholder="CVV" class="w-full px-4 py-3 rounded-xl border text-sm outline-none" :class="ui.dark?'bg-gray-900 border-gray-700 text-white':'bg-white border-gray-200'"/>
            </div>
          </div>
          <div>
            <p class="text-sm font-medium mb-2" :class="ui.dark?'text-gray-300':'text-gray-700'">Tip your rider 🙏</p>
            <div class="flex gap-2">
              <button v-for="tip in [0,200,500,1000]" :key="tip" @click="cart.selectedTip=tip"
                class="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                :class="cart.selectedTip===tip?'bg-[#FF5A1F] text-white':ui.dark?'bg-gray-800 text-gray-300 border border-gray-700':'bg-gray-50 text-gray-600 border border-gray-200'">
                {{tip===0?'None':'₦'+tip}}
              </button>
            </div>
          </div>
          <div class="flex gap-3">
            <button @click="step=0" class="flex-1 btn-outline py-3.5 rounded-2xl font-semibold">← Back</button>
            <button @click="placeOrder" class="flex-1 btn-primary py-3.5 rounded-2xl font-semibold">Place Order 🎉</button>
          </div>
        </div>
        <!-- Step 2 -->
        <div v-if="step===2" class="text-center py-12" style="animation:slideUp 0.4s ease-out">
          <div class="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h2 class="text-3xl font-black mb-3" style="font-family:var(--font-display)" :class="ui.dark?'text-white':''">Order Confirmed! 🎉</h2>
          <p class="text-lg mb-2" :class="ui.dark?'text-gray-400':'text-gray-500'">Order #{{orderNumber}} has been placed!</p>
          <p class="text-sm mb-8" :class="ui.dark?'text-gray-500':'text-gray-400'">Estimated delivery: 25–35 minutes</p>
          <div class="flex gap-4 justify-center">
            <button @click="router.push('tracking')" class="btn-primary px-8 py-3 rounded-2xl font-semibold">Track Order</button>
            <button @click="router.push('home')" class="btn-outline px-8 py-3 rounded-2xl font-semibold">Back Home</button>
          </div>
        </div>
      </div>
      <!-- Summary -->
      <div v-if="step<2">
        <div class="rounded-2xl p-5 sticky top-20" :class="ui.dark?'bg-gray-800':'bg-white shadow-sm border border-gray-100'">
          <h3 class="font-bold text-base mb-4" style="font-family:var(--font-display)" :class="ui.dark?'text-white':''">Order Summary</h3>
          <div v-if="cart.items.length===0" class="text-center py-6">
            <p class="text-sm" :class="ui.dark?'text-gray-400':'text-gray-500'">No items in cart</p>
            <button @click="router.push('restaurants')" class="mt-3 text-[#FF5A1F] text-sm font-medium hover:underline">Browse restaurants</button>
          </div>
          <div v-else>
            <div class="space-y-3 mb-4">
              <div v-for="item in cart.items" :key="item.id" class="flex items-center gap-3">
                <img :src="item.image" :alt="item.name" class="w-10 h-10 rounded-lg object-cover"/>
                <div class="flex-1 min-w-0"><p class="text-xs font-medium truncate" :class="ui.dark?'text-gray-300':''">{{item.name}}</p><p class="text-xs" :class="ui.dark?'text-gray-500':'text-gray-400'">×{{item.qty}}</p></div>
                <span class="text-xs font-bold text-[#FF5A1F]">₦{{(item.price*item.qty).toLocaleString()}}</span>
              </div>
            </div>
            <div class="space-y-2 text-sm border-t pt-4" :class="ui.dark?'border-gray-700':''">
              <div class="flex justify-between"><span :class="ui.dark?'text-gray-400':'text-gray-500'">Subtotal</span><span :class="ui.dark?'text-white':''">₦{{cart.subtotal.toLocaleString()}}</span></div>
              <div class="flex justify-between"><span :class="ui.dark?'text-gray-400':'text-gray-500'">Delivery</span><span :class="ui.dark?'text-white':''">₦{{cart.deliveryFee.toLocaleString()}}</span></div>
              <div class="flex justify-between"><span :class="ui.dark?'text-gray-400':'text-gray-500'">Service</span><span :class="ui.dark?'text-white':''">₦{{cart.serviceFee.toLocaleString()}}</span></div>
              <div class="flex justify-between pt-2 border-t font-bold" :class="ui.dark?'border-gray-700':''">
                <span :class="ui.dark?'text-white':''">Total</span><span class="text-[#FF5A1F]">₦{{cart.total.toLocaleString()}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

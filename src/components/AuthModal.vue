<script setup lang="ts">
import { ref } from 'vue'
import { useUIStore } from '@/stores'

const ui = useUIStore()
const showPass = ref(false)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="ui.authModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="ui.authModal = false">
        <div class="w-full max-w-md rounded-3xl p-8 shadow-2xl" style="animation:slideUp 0.4s ease-out"
          :class="ui.dark ? 'bg-gray-900' : 'bg-white'">

          <!-- Logo & header -->
          <div class="text-center mb-6">
            <div class="w-14 h-14 bg-gradient-to-br from-[#FF5A1F] to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span class="text-white text-2xl">🍔</span>
            </div>
            <h2 class="text-2xl font-bold" style="font-family:var(--font-display)" :class="ui.dark ? 'text-white' : ''">
              {{ ui.authTab === 'login' ? 'Welcome back' : 'Join QuickBite' }}
            </h2>
            <p class="text-sm mt-1" :class="ui.dark ? 'text-gray-400' : 'text-gray-500'">
              {{ ui.authTab === 'login' ? 'Sign in to your account' : 'Create your free account' }}
            </p>
          </div>

          <!-- Tabs -->
          <div class="flex rounded-2xl p-1 mb-6 gap-1" :class="ui.dark ? 'bg-gray-800' : 'bg-gray-100'">
            <button v-for="tab in ['login', 'signup'] as const" :key="tab"
              @click="ui.authTab = tab"
              class="flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all"
              :class="ui.authTab === tab ? 'bg-white text-[#FF5A1F] shadow-sm' : (ui.dark ? 'text-gray-400' : 'text-gray-500')">
              {{ tab === 'login' ? 'Login' : 'Sign up' }}
            </button>
          </div>

          <!-- Form -->
          <div class="space-y-3 mb-4">
            <div v-if="ui.authTab === 'signup'" class="grid grid-cols-2 gap-3">
              <input type="text" placeholder="First name" class="w-full px-4 py-3 rounded-xl text-sm border focus:border-[#FF5A1F] transition-colors" :class="ui.dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'"/>
              <input type="text" placeholder="Last name"  class="w-full px-4 py-3 rounded-xl text-sm border focus:border-[#FF5A1F] transition-colors" :class="ui.dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'"/>
            </div>
            <input type="email" placeholder="Email address" class="w-full px-4 py-3.5 rounded-xl text-sm border focus:border-[#FF5A1F] transition-colors" :class="ui.dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'"/>
            <div class="relative">
              <input :type="showPass ? 'text' : 'password'" placeholder="Password"
                class="w-full px-4 py-3 pr-12 rounded-xl text-sm border focus:border-[#FF5A1F] transition-colors"
                :class="ui.dark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'"/>
              <button @click="showPass = !showPass" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg v-if="!showPass" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
              </button>
            </div>
            <div v-if="ui.authTab === 'login'" class="flex items-center justify-between">
              <label class="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" class="rounded accent-[#FF5A1F]"/>
                <span :class="ui.dark ? 'text-gray-400' : 'text-gray-600'">Remember me</span>
              </label>
              <a href="#" class="text-sm text-[#FF5A1F] hover:underline font-medium">Forgot password?</a>
            </div>
          </div>

          <button @click="ui.authModal = false; ui.loggedIn = true" class="w-full btn-primary py-3.5 rounded-2xl font-semibold text-base mb-4">
            {{ ui.authTab === 'login' ? 'Sign In' : 'Create Account' }}
          </button>

          <!-- Social login -->
          <div class="relative flex items-center gap-3 mb-4">
            <div class="flex-1 h-px" :class="ui.dark ? 'bg-gray-700' : 'bg-gray-200'"></div>
            <span class="text-xs" :class="ui.dark ? 'text-gray-500' : 'text-gray-400'">or continue with</span>
            <div class="flex-1 h-px" :class="ui.dark ? 'bg-gray-700' : 'bg-gray-200'"></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <button class="flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all hover:shadow-md"
              :class="ui.dark ? 'border-gray-700 hover:bg-gray-800 text-white' : 'border-gray-200 hover:bg-gray-50'">
              <svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button class="flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all hover:shadow-md"
              :class="ui.dark ? 'border-gray-700 hover:bg-gray-800 text-white' : 'border-gray-200 hover:bg-gray-50'">
              <svg class="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

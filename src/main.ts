import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import App from './App.vue'
import './style.css'

function showStartupError(error: unknown) {
  const fallback = document.querySelector<HTMLElement>('.app-fallback p')
  if (!fallback) return

  const message = error instanceof Error ? error.message : String(error)
  fallback.textContent = `QuickBite could not start in this browser. Error: ${message}`
}

try {
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
  document.documentElement.dataset.quickbite = 'mounted'
} catch (error) {
  showStartupError(error)
  console.error('QuickBite startup failed:', error)
}

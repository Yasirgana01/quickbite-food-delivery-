import { ref, markRaw, type Component } from 'vue'
import HomeView       from '@/views/HomeView.vue'
import RestaurantsView from '@/views/RestaurantsView.vue'
import MenuView        from '@/views/MenuView.vue'
import CheckoutView    from '@/views/CheckoutView.vue'
import TrackingView    from '@/views/TrackingView.vue'
import DashboardView   from '@/views/DashboardView.vue'

export type RouteName = 'home' | 'restaurants' | 'menu' | 'checkout' | 'tracking' | 'dashboard'

const views: Record<RouteName, Component> = {
  home:        markRaw(HomeView),
  restaurants: markRaw(RestaurantsView),
  menu:        markRaw(MenuView),
  checkout:    markRaw(CheckoutView),
  tracking:    markRaw(TrackingView),
  dashboard:   markRaw(DashboardView),
}

export const currentRoute = ref<RouteName>('home')
export const routeParams  = ref<Record<string, string | number>>({})

export function currentView() {
  return views[currentRoute.value]
}

export function navigate(name: RouteName, params: Record<string, string | number> = {}) {
  currentRoute.value = name
  routeParams.value  = params
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

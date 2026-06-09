<script setup lang="ts">
import { RouterView } from '@/router'
import AppNavbar  from '@/components/AppNavbar.vue'
import CartDrawer from '@/components/CartDrawer.vue'
import AuthModal  from '@/components/AuthModal.vue'
import HomeView        from '@/views/HomeView.vue'
import RestaurantsView from '@/views/RestaurantsView.vue'
import MenuView        from '@/views/MenuView.vue'
import CheckoutView    from '@/views/CheckoutView.vue'
import TrackingView    from '@/views/TrackingView.vue'
import DashboardView   from '@/views/DashboardView.vue'

const routes = {
  home:        HomeView,
  restaurants: RestaurantsView,
  menu:        MenuView,
  checkout:    CheckoutView,
  tracking:    TrackingView,
  dashboard:   DashboardView,
}
</script>

<template>
  <div>
    <AppNavbar />
    <main>
      <RouterView :routes="routes" />
    </main>
    <CartDrawer />
    <AuthModal />
  </div>
</template>

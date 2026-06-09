import { ref, computed, provide, inject, defineComponent, h } from 'vue'
import type { App, InjectionKey, Ref, Component } from 'vue'

export type RouteName = 'home' | 'restaurants' | 'menu' | 'checkout' | 'tracking' | 'dashboard'

export interface Route {
  name: RouteName
  params: Record<string, string>
}

const ROUTER_KEY: InjectionKey<RouterInstance> = Symbol('router')

interface RouterInstance {
  current: Ref<Route>
  push(name: RouteName, params?: Record<string, string>): void
  routeName: Ref<RouteName>
}

function createMemoryRouter(): RouterInstance & { install(app: App): void } {
  const current = ref<Route>({ name: 'home', params: {} })
  const routeName = computed(() => current.value.name)

  function push(name: RouteName, params: Record<string, string> = {}) {
    current.value = { name, params }
    // Scroll to top without touching history
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return {
    current: current as Ref<Route>,
    routeName: routeName as unknown as Ref<RouteName>,
    push,
    install(app: App) {
      const router = { current: current as Ref<Route>, routeName: routeName as unknown as Ref<RouteName>, push }
      app.provide(ROUTER_KEY, router)
    },
  }
}

export const router = createMemoryRouter()

export function useRouter() {
  const r = inject(ROUTER_KEY)
  if (!r) throw new Error('Router not provided')
  return r
}

export function useRoute() {
  const r = inject(ROUTER_KEY)
  if (!r) throw new Error('Router not provided')
  return r.current
}

// RouterView component
export const RouterView = defineComponent({
  name: 'RouterView',
  props: {
    routes: {
      type: Object as () => Partial<Record<RouteName, Component>>,
      required: true,
    },
  },
  setup(props) {
    const r = inject(ROUTER_KEY)!
    return () => {
      const component = props.routes[r.current.value.name]
      return component ? h(component) : null
    }
  },
})

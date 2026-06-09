import { ref, onMounted, onUnmounted } from 'vue'

export function useCountdown(initialH = 2, initialM = 45, initialS = 30) {
  const h = ref(initialH)
  const m = ref(initialM)
  const s = ref(initialS)
  let timer: ReturnType<typeof setInterval>

  onMounted(() => {
    timer = setInterval(() => {
      if (s.value > 0) { s.value-- }
      else if (m.value > 0) { m.value--; s.value = 59 }
      else if (h.value > 0) { h.value--; m.value = 59; s.value = 59 }
    }, 1000)
  })

  onUnmounted(() => clearInterval(timer))

  const pad = (n: number) => String(n).padStart(2, '0')

  return { h, m, s, pad }
}

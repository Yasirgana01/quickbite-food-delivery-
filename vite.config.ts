import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'quickbite-classic-production-script',
      writeBundle(options) {
        const outputDir = options.dir ?? 'dist'
        const indexPath = join(outputDir, 'index.html')
        const html = readFileSync(indexPath, 'utf8')

        const updated = html.replace(
          /<script type="module" crossorigin src="([^"]+)"><\/script>/,
          '<script defer src="$1"></script>',
        )

        writeFileSync(indexPath, updated)
      },
    },
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    open: true,
  },
})

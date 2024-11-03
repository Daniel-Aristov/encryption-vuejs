import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    outDir: './dist'
  },
  resolve: {
    dedupe: ['vue'],
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})

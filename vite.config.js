import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        blogs: resolve(import.meta.dirname, 'blogs/index.html'),
        videos: resolve(import.meta.dirname, 'videos/index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
        article: resolve(import.meta.dirname, 'blog/state-of-the-judiciary-report-2025-26/index.html'),
      },
    },
  },
})

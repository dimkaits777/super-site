import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Three.js is a known-large vendor and is loaded in its own lazy chunk.
    chunkSizeWarningLimit: 1000,
  },
})

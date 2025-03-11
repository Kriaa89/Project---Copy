import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    open: true
  }
})

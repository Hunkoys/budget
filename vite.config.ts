import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import express from './server/express-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), express('server/index.ts')],
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import path from "path"

// `ANALYZE=1 npm run build` writes a bundle report to stats.html (dev-only).
const analyze = process.env.ANALYZE === '1'

export default defineConfig({
  plugins: [
    react(),
    analyze && visualizer({ filename: 'stats.html', gzipSize: true, template: 'treemap' }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

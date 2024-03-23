import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    target: 'esnext'
  },
  define: {
    'process.env': process.env
  },
  plugins: [react(), svgr()],
  resolve: {
    // Relative import
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})

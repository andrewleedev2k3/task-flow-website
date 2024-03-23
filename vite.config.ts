import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
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

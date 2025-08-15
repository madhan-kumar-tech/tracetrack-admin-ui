import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'ui-vendor': ['@radix-ui/react-avatar', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
          'icons-vendor': ['lucide-react'],
        },
      },
    },
    // Enable source maps for production debugging
    sourcemap: false,
    // Optimize chunk size
    chunkSizeWarningLimit: 600,
  },
  // Development optimizations
  server: {
    hmr: {
      overlay: false, // Disable error overlay for better UX
    },
  },
})

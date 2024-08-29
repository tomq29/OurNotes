import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/ws': {
      //   target: 'ws://localhost:1234',  // WebSocket server URL
      //   ws: true,  // Enable WebSocket proxying
      //   changeOrigin: true,
      // },
      '/api': {
        target: 'http://localhost/',
        changeOrigin: true,
      },
    },
  },
});

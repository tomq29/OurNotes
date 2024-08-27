import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying WebSocket connections to the Socket.IO server
      '/socket.io': {
        target: 'http://localhost:3000', // Replace with your actual server URL
        ws: true, // Proxy WebSockets
        changeOrigin: true,
      },
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      },
    },
  },
});

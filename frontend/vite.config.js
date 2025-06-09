// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// vite.config.js


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',                      // Required for Render
    port: 5173,                           // Optional
    allowedHosts: ['mern-stack-frontend-d4if.onrender.com'] // 👈 Add this
  }
});



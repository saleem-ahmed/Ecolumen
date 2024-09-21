import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {},
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@import "src/styles/globals/variables.scss";`,
  //     },
  //   },
  // },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
});

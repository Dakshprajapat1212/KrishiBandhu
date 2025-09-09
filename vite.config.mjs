// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  build: {
    chunkSizeWarningLimit: 2000
  },
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ['.amazonaws.com']
  }
});
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    host: true,
    port: 3000,
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
  base: "/",
});

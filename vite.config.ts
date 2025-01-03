import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: "0.0.0.0",
  //   port: 5173,
  //   https: {
  //     key: "./key.pem",
  //     cert: "./cert.pem",
  //   },
    
  // },
  resolve: {
    alias: {
      "@components": "/src/Components",
      "@assets": "/src/assets",
      "@state": "/src/State",
      "@hooks": "/src/Hooks",
      "@routes": "/src/Routes",
      "@ui": "/src/Components/ui",
      "@lib": "/src/Components/lib",
    },
  },
});

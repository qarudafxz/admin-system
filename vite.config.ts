import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      manifest: {
        name: "Admin",
        display: "standalone",
        short_name: "Admin",
        description: "Admin/Agent Management System",
        theme_color: "#3910C7",
        background_color: "#00041E",
        start_url: "/",
        icons: [
          {
            src: "./public/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./public/icon-512x512.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "./public/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "./public/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
})

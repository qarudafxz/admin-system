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
      includeAssets: ["android.png"],
      manifest: {
        name: "Admin",
        short_name: "Admin",
        description: "Admin/Agent Management System",
        theme_color: "#00041E",
        background_color: "#00041E",
        start_url: "/",
        icons: [
          {
            src: "/android-launchericon-96-96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/android-launchericon-192-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-launchericon-512-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        display: "standalone",
      },
    }),
  ],
})

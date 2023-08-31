import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        panel: "video_overlay.html",
      },
      output: {
        dir: "dist",
      },
    },
  },
});

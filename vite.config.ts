import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      input: {
        main: "src/main.tsx",
        video_overlay: "video_overlay.html",
        config: "config.html",
      },
      output: {
        dir: "dist",
      },
    },
  },
});

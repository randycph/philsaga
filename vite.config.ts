import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command, mode, isPreview }) => ({
  base:
    command === "build" || isPreview
      ? process.env.VITE_BASE_PATH ||
        loadEnv(mode, process.cwd()).VITE_BASE_PATH ||
        "/philsaga/"
      : "/",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["gsap", "gsap/ScrollTrigger", "lenis"],
          "ui-primitives": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-navigation-menu",
            "embla-carousel-react",
          ],
        },
      },
    },
  },
}));

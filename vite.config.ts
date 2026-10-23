import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/philsaga/" : "/",
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

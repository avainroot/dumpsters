import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
      "@components/ui": resolve(__dirname, "src/components/ui"),
      "@lib": resolve(__dirname, "src/lib"),
      "@provider": resolve(__dirname, "src/provider"),
      "@": resolve(__dirname, "./src"),
    },
  },
});

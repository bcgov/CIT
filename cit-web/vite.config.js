import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "shared-components/build/components/loader/Loader.css":
        "/src/styles/Loader.css",
    },
  },
  publicDir: "./public",
  root: "./src",
  build: {
    outDir: "../build",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.js"],
  },
});

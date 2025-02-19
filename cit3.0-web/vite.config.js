import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    // {
    //   name: "load+transform-js-files-as-jsx",
    //   async transform(code, id) {
    //     if (!id.match(/.*\.js$/)) {
    //       return null;
    //     }

    //     // Use the exposed transform from vite, instead of directly
    //     // transforming with esbuild
    //     return transformWithEsbuild(code, id, {
    //       loader: "jsx",
    //       jsx: "automatic", // 👈 this is important
    //     });
    //   },
    // },
  ],
  server: {
    port: 3000, // Change this if needed
  },
  //   esbuild: {
  //     loader: {
  //       ".js": "jsx", // Add this line to handle .js files as JSX
  //     },
  //     include: [/\.js$/],
  //   },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  publicDir: "./public",
  root: "./src",
  build: {
    outDir: "../build",
  },
});

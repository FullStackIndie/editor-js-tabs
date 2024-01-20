import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  base: "/",
  build: {
    outDir: "../../wwwroot/blog",
    emptyOutDir: true,
    brotliSize: false,
    manifest: true,
    minify: mode === "development" ? false : false,
    cssMinify: "esbuild",
    cssCodeSplit: true,
    sourcemap: command === "serve" ? "inline" : false,
    chunkSizeWarningLimit: 1000,
    lib: {
      entry: {
        main: "src/js/main.js",
      },
      formats: ["es"],
    },
    server: {
      cors: {
        origin: true,
      },
    },
    rollupOptions: {
      input: {
        main: "src/js/main.js",
        css: "src/sass/styles.scss",
      },
      output: {
        format: "es",
        dir: "../../wwwroot/blog",
        assetFileNames: "[ext]/[name].[hash][extname]",
        chunkFileNames: "chunks/[name].[hash].js",
        entryFileNames: "js/[name]-[hash].[format].js",
        preserveModules: false,
        minifyInternalExports: false,
      },
    },
  },
}));

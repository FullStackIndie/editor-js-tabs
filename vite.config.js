import { defineConfig } from "vite";
import transformManifest from "./vite-plugins/transform-manifest";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [transformManifest],
  base: "/",
  publicDir: "./src/public",
  // assetsInclude: ["**/*.xml", "**/*.html"],
  build: {
    outDir: "../../wwwroot/blog",
    emptyOutDir: true,
    brotliSize: false,
    manifest: true,
    minify: "esbuild",
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
        "js/parser": "src/js/parser/editor-parser.js",
        "js/editorjs-tabs": "src/js/tabs/editorjs-tabs.js",
        "js/blog-write": "src/js/blog-write.js",
        "css/main": "src/sass/styles.scss",
        "css/parser": "src/js/parser/parser.css",
      },
      output: {
        format: "es",
        dir: "../../wwwroot/blog",
        assetFileNames: "[ext]/[name].[hash][extname]",
        chunkFileNames: "chunks/[name].[hash].js",
        entryFileNames: "[name].[hash].[format].js",
        preserveModules: false,
        minifyInternalExports: false,
      },
    },
  },
}));

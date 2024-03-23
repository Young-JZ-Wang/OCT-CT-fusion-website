import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
//
export default defineConfig({
  root: "./src",
  base: "/",
  publicDir: "../public",

  // Development server configuration
  server: {
    // Port number
    port: 3000,

    // Hostname
    host: "localhost",

    // Enable HTTPS
    https: false,
  },

  // Production build configuration
  build: {
    // Adjust the chunk size warning limit as needed
    chunkSizeWarningLimit: 1000,

    // Ensure that assets are served relative to the current directory
    assetsDir: "",
    //Output directory

    outDir: "../dist", // Specify the output directory for your build

    // Enable/disable minification
    minify: true,

    // Enable/disable CSS code splitting
    cssCodeSplit: true,

    // Configure assets behavior
    assetsInlineLimit: 4096,

    // Configure source map generation
    sourcemap: false,

    // Modify rollup options to include all HTML files in the output directory
    rollupOptions: {
      input: {
        // Specify all HTML files here dynamically
        ...Object.fromEntries(
          fs
            .readdirSync(path.resolve(__dirname, "src"))
            .filter((file) => file.endsWith(".html"))
            .map((file) => [path.basename(file, ".html"), `src/${file}`])
        ),
        // Add script.js as an entry point
        main: "/js/main.js",
        script: "/js/script.js",
      },
      output: {
        // Ensure your JS files are included in the output directory
        // (e.g., if it's in the "src/js" directory)
        dir: "dist",
        entryFileNames: "[name].[hash].js",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // Add more aliases as needed
    },
  },
});

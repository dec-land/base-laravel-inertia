import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import inertia from '@inertiajs/vite';

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.tsx"],
      ssr: "resources/js/ssr.tsx",
      refresh: true,
    }),
    react(),
    inertia({ ssr: { entry: "resources/js/ssr.tsx" } }),
    tailwindcss(),
  ],
  build: {
    minify: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@inertiajs')) {
              return 'vendor-inertia';
            }
            return 'vendor';
          }
        },
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
});

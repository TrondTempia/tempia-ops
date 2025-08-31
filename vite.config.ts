import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: { 
    outDir: "build", 
    emptyOutDir: true 
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// IMPORTANT: Replace YOUR_REPO_NAME with your actual GitHub repository name!
// Example: if your repo is "cswstudying", use "/cswstudying/"
export default defineConfig({
  base: "/practicehub/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

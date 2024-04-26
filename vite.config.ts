import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@base", replacement: path.resolve(__dirname, "src", "base") },
      { find: "@app", replacement: path.resolve(__dirname, "src", "app") },
    ],
  },
  server: {
    open: true,
  },
});

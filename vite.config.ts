import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// server: {
//   https: {
//     key: fs.readFileSync("./localhost.decrypted.key"),
//     cert: fs.readFileSync("./localhost.crt"),
//   },
// },

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})

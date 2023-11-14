import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import fs from "fs"
// import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync("./localhost.decrypted.key"),
      cert: fs.readFileSync("./localhost.crt"),
    },
  },
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

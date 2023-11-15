import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "./",

  server: {
    plugins:[react()],
    port: 3000,
    host: "0.0.0.0",
  },
});

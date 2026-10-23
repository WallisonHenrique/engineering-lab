import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import mfConfig from "./module-federation.config.ts";

export default defineConfig({
  plugins: [react(), federation(mfConfig)],
  preview: {
    port: 4175,
    strictPort: true,
  },
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});

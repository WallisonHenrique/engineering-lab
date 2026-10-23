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
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*"],
      exclude: ["src/main.tsx", "src/vite-env.d.ts", "**/*.test.tsx"],
    },
  },
});

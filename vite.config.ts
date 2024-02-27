import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  test: {
    css: false,
    include: ["src/**/__tests__/*"],
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
    clearMocks: true,
    coverage: {
      include: ["src/**/*"],
      exclude: ["src/main.tsx"],
      thresholds: {
        "100": true,
      },
      provider: "istanbul",
      enabled: true,
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    tsconfigPaths(),
    react(),
    ...(mode === "test"
      ? []
      : [
          VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.png", "robots.txt", "apple-touch-icon.png"],
          }),
        ]),
  ],
}));

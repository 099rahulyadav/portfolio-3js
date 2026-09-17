import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 45000,
  use: {
    baseURL: "http://127.0.0.1:3001",
    viewport: { width: 1440, height: 900 },
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    launchOptions: {
      channel: process.env.PLAYWRIGHT_CHANNEL || (process.platform === "win32" ? "msedge" : undefined),
      args: ["--enable-unsafe-swiftshader"],
    },
  },
  webServer: {
    command: "node node_modules/next/dist/bin/next dev -p 3001",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: true,
    timeout: 60000,
  },
});

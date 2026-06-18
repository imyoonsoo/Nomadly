import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          environment: "jsdom",
        },
      },
      {
        test: {
          browser: {
            enabled: true,
            provider: playwright(),
          },
        },
      },
    ],
  },
});

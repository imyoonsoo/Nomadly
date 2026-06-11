import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
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

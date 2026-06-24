/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you based on your tsconfig.json paths)
    "^@/(.*)$": "<rootDir>/$1",
    // remark/rehype packages are pure ESM; Jest (CommonJS transform) can't load them.
    // Map to CJS-compatible stubs so module loading works. Production code uses the real packages.
    "^remark$": "<rootDir>/__mocks__/remark-stub.cjs",
    "^remark-gfm$": "<rootDir>/__mocks__/remark-plugin-stub.cjs",
    "^remark-emoji$": "<rootDir>/__mocks__/remark-plugin-stub.cjs",
    "^remark-smartypants$": "<rootDir>/__mocks__/remark-plugin-stub.cjs",
    "^remark-rehype$": "<rootDir>/__mocks__/remark-plugin-stub.cjs",
    "^rehype-raw$": "<rootDir>/__mocks__/remark-plugin-stub.cjs",
    "^rehype-pretty-code$": "<rootDir>/__mocks__/remark-plugin-stub.cjs",
    "^rehype-stringify$": "<rootDir>/__mocks__/remark-plugin-stub.cjs",
  },
  testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: ["node_modules/(?!(three|@react-three)/)"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!jest.config.js",
    "!jest.setup.js",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

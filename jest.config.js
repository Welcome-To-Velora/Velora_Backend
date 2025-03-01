// jest.config.js (updated for ES Modules)
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx|mjs|ts|tsx)$": "babel-jest",
  },
  testMatch: [
    "<rootDir>/tests/**/*.test.js",  // Ensure your test files are inside the "test" folder and named correctly
  ],
};

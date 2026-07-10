// Add the .js extension explicitly
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Point this to your root directory so it finds next.config.js and .env files
  dir: "./",
});

const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  // Only look for tests inside the __tests__ directory
  testMatch: ["<rootDir>/__tests__/**/*.test.{js,jsx,ts,tsx}"],
};

export default createJestConfig(config);

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',      // Use ts-jest preset to handle TypeScript files
  testEnvironment: 'node', // Default test environment for Node.js
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Process .ts and .tsx files using ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'], // Specify file types to test
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'], // Match test files
  coverageDirectory: './coverage', // Optional: Directory for test coverage reports
  collectCoverage: true,  // Optional: Collect code coverage
};

export default config;

const base = require('./jest.base.cjs');

/** @type {import('jest').Config} */
module.exports = {
  ...base,
  testMatch: ['<rootDir>/**/*.unit.spec.ts'], 
  collectCoverage: true,
  coverageDirectory: 'coverage-unit',
  coverageReporters: ['text', 'lcov', 'html']
};

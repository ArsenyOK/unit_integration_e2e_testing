const base = require('./jest.base.cjs');

/** @type {import('jest').Config} */
module.exports = {
  ...base,
  testMatch: ['<rootDir>/**/*.int.spec.ts'],   
  collectCoverage: true,
  coverageDirectory: 'coverage-int',
  coverageReporters: ['text', 'lcov', 'html']
};

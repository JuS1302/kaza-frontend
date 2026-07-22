const nextJest = require('next/jest')

// next/jest configure automatiquement Jest pour Next.js (alias @/, variables d'env, etc.)
const createJestConfig = nextJest({ dir: './' })

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

module.exports = createJestConfig(config)

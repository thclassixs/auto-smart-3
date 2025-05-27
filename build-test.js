#!/usr/bin/env node

/**
 * Comprehensive build test script
 * Tests all aspects of the application before deployment
 */

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("🚀 Starting comprehensive build test...\n")

// Test functions
const tests = [
  {
    name: "TypeScript Type Check",
    command: "npx tsc --noEmit",
    description: "Checking TypeScript types and syntax",
  },
  {
    name: "ESLint Code Quality",
    command: "npx eslint . --ext .ts,.tsx,.js,.jsx",
    description: "Checking code quality and standards",
  },
  {
    name: "Next.js Build",
    command: "npm run build",
    description: "Building the application for production",
  },
]

// File existence checks
const requiredFiles = [
  "next.config.mjs",
  "package.json",
  "tailwind.config.ts",
  "tsconfig.json",
  "app/layout.tsx",
  "app/page.tsx",
  "lib/constants.ts",
  "lib/types.ts",
  "lib/utils.ts",
  "lib/api.ts",
  "lib/auth.ts",
  "lib/mock-users.ts",
]

// Check required files
console.log("📁 Checking required files...")
const missingFiles = []
requiredFiles.forEach((file) => {
  if (!fs.existsSync(file)) {
    missingFiles.push(file)
  } else {
    console.log(`✅ ${file}`)
  }
})

if (missingFiles.length > 0) {
  console.log("\n❌ Missing required files:")
  missingFiles.forEach((file) => console.log(`   - ${file}`))
  process.exit(1)
}

console.log("\n✅ All required files present\n")

// Run tests
const testResults = []

for (const test of tests) {
  console.log(`🔍 ${test.description}...`)

  try {
    const startTime = Date.now()
    execSync(test.command, { stdio: "pipe" })
    const duration = Date.now() - startTime

    console.log(`✅ ${test.name} passed (${duration}ms)`)
    testResults.push({ ...test, status: "passed", duration })
  } catch (error) {
    console.log(`❌ ${test.name} failed`)
    console.log(`Error: ${error.message}`)
    testResults.push({ ...test, status: "failed", error: error.message })
  }
  console.log("")
}

// Summary
console.log("📊 Build Test Summary:")
console.log("=".repeat(50))

testResults.forEach((result) => {
  const status = result.status === "passed" ? "✅" : "❌"
  const duration = result.duration ? ` (${result.duration}ms)` : ""
  console.log(`${status} ${result.name}${duration}`)
})

const failedTests = testResults.filter((r) => r.status === "failed")
const passedTests = testResults.filter((r) => r.status === "passed")

console.log(`\n📈 Results: ${passedTests.length} passed, ${failedTests.length} failed`)

if (failedTests.length > 0) {
  console.log("\n❌ Build test failed. Please fix the issues above before deploying.")
  process.exit(1)
} else {
  console.log("\n🎉 All tests passed! Application is ready for deployment.")

  // Check build output
  if (fs.existsSync(".next")) {
    console.log("✅ Build output generated successfully")

    // Check for critical files in build
    const buildFiles = [".next/static", ".next/server"]
    buildFiles.forEach((file) => {
      if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`)
      } else {
        console.log(`⚠️  ${file} missing`)
      }
    })
  }

  console.log("\n🚀 Ready for production deployment!")
}

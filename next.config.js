/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true
  },
  // Disable ESLint during development to avoid build errors
  // You should still run ESLint separately or in your CI pipeline
  eslint: {
    ignoreDuringBuilds: true
  },
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here
  },
  // Configure Turbopack
  turbopack: {
    // Explicitly set the root directory to avoid workspace warning
    root: __dirname
  }
}

module.exports = nextConfig
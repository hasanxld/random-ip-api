// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // For Netlify deployment
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Output standalone for better performance
  output: 'standalone',
}

module.exports = nextConfig

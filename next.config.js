// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // For Netlify
  trailingSlash: true,
  images: {
    unoptimized: true
  },
}

module.exports = nextConfig

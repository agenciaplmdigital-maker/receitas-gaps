/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: '/offline.html',
  },
  cacheOnFrontEndNav: true,
})

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
})

module.exports = nextConfig

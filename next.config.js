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

const withNextIntl = require('next-intl/with-default-config');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
}

module.exports = withPWA(withNextIntl(nextConfig))

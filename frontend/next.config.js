/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '172.16.8.21'],
  },
}

module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '192.168.78.21','10.1.24.93'],
  },
}

module.exports = nextConfig
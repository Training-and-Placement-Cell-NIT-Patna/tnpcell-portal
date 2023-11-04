/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '192.168.1.42', '14.139.219.168', 'tpc.nitp.ac.in', 'https://tpc.nitp.ac.in','http://tpc.nitp.ac.in'],
  },
}

module.exports = nextConfig
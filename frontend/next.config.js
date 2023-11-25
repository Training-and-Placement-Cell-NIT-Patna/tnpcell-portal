/** @type {import('next').NextConfig} */
// https://stackoverflow.com/questions/70688660/cors-issue-next-js-application
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '192.168.1.42', '14.139.219.168', 'tpc.nitp.ac.in', 'https://tpc.nitp.ac.in', 'http://tpc.nitp.ac.in'],
  },
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
        ]
      }
    ]
  },
  // @important Never remove this
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Define the path to match.
        destination: 'http://192.168.1.42:1337/api/:path*', //
      },
      // For accessing multimedia files of backend strapi
      {
        source: '/uploads/:path*',
        destination: 'http://192.168.1.42:1337/uploads/:path*',
      }
    ]
  },
}

module.exports = nextConfig
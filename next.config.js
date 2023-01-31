/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shikimori.one',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'img.youtube.com',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig

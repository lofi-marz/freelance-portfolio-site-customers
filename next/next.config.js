/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'marimari.tech',
        pathname: '**',
      },
      {
        hostname: 'localhost'
      }
    ],
}
}

module.exports = nextConfig;
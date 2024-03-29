/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'marileon.me',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: 'marileon.me',
                pathname: '**',
            },
            {
                hostname: 'localhost',
            },
        ],
        unoptimized: true,
    },
};

export default nextConfig;

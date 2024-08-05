/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['th.bing.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: '/**',
            },
        ],
    }
};

export default nextConfig;

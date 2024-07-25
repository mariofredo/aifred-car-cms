/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'laravel4.isysedge.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aifred.superfk.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

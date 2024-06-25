/** @type {import('next').NextConfig} */
const nextConfig = {
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

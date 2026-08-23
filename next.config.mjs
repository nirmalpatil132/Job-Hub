/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Job-Hub',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

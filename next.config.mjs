/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2orzbldbf1ng3.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;

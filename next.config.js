/** @type {import('next').NextConfig} */
const nextConfig = {
  cleanDistDir: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;

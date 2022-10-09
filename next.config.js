if (!process.env.NEXTAUTH_SECRET) throw new Error('Please set NEXTAUTH_SECRET');

if (!process.env.NEXTAUTH_URL) throw new Error('Please set NEXTAUTH_URL');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  /* We already do type check on GH actions */
  typescript: {
    ignoreBuildErrors: !!process.env.CI,
  },
  /* We already do linting on GH actions */
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;

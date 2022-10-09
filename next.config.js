if (!process.env.NEXTAUTH_SECRET) throw new Error('Please set NEXTAUTH_SECRET');

if (!process.env.NEXTAUTH_URL) throw new Error('Please set NEXTAUTH_URL');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

module.exports = nextConfig;

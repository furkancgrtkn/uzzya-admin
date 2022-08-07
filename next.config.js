/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_APP_API_URL: "http://localhost:8080",
  },
};

module.exports = nextConfig;

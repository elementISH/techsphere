/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  distDir: "./build",
  output: "export",
};

module.exports = nextConfig;

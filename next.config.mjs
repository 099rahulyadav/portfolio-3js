/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next-app",
  allowedDevOrigins: ["127.0.0.1"],
  images: { unoptimized: true },
};
export default nextConfig;

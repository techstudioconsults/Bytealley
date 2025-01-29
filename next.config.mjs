/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  transpilePackages: ["lucide-react"],
  images: {
    remotePatterns: [
      {
        hostname: "productize.nyc3.cdn.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;

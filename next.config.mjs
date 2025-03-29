/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  transpilePackages: ["lucide-react"],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "productize.nyc3.cdn.digitaloceanspaces.com",
      },
      {
        hostname: "bytealley.fra1.cdn.digitaloceanspaces.com",
      },
      {
        hostname: "trybytealley.nyc3.cdn.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;

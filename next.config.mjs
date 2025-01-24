/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  transpilePackages: ["lucide-react"],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "productize.nyc3.cdn.digitaloceanspaces.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/auth/callback",
        has: [
          {
            type: "query",
            key: "code",
          },
        ],
        permanent: false,
        destination: "/auth/fetching-data?code=:code",
      },
    ];
  },
};

export default nextConfig;

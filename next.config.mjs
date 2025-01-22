/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  transpilePackages: ["lucide-react"],
  reactStrictMode: false,
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

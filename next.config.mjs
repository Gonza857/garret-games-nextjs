/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static1.gamespot.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.cloudflare.steamstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "store.playstation.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.playstation.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

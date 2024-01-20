/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        hostname: "https://via.placeholder.com",

        port: "",
        pathname: "/random",
      },
    ],
  },
};

module.exports = nextConfig;

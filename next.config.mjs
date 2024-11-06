/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "votre-backend-domaine.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/img/**",
      },
    ],
  },
};

export default nextConfig;

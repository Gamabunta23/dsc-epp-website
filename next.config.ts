import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Schlanker, eigenständiger Server-Build für Docker/Coolify-Deployment
  output: "standalone",
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "*.ngrok.io",
    "*.ngrok-free.app",
    "192.168.178.194",
  ],
};

export default nextConfig;

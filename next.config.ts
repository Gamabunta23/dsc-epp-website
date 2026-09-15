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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Browser sollen die Domain nur noch per HTTPS ansteuern
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

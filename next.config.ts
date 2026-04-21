/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.freepik.com", "res.cloudinary.com", "api.dicebear.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

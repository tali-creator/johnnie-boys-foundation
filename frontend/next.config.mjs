/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    // Unoptimized in dev (no image server needed locally).
    // On Vercel, optimization is handled automatically so this is false in production.
    unoptimized: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        // Cloudflare R2 public bucket domain
        protocol: "https",
        hostname: "pub-d25cd5c76b7344a191fe84040fbb7eca.r2.dev",
      },
    ],
  },

  // 'standalone' output is for self-hosted deployments (e.g. Docker/Render).
  // On Vercel, it conflicts with Turbopack because Turbopack doesn't emit the
  // .nft.json trace files that standalone mode depends on. Vercel handles its
  // own bundling, so this option is not needed here.
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },

  // ✅ Updated devIndicators (removed deprecated options)
  devIndicators: {
    position: "bottom-right", // replaces buildActivityPosition
  },

  // ✅ Removed 'experimental.after' and 'experimental.ppr'
  // since they're either default or Canary-only
};

export default nextConfig;

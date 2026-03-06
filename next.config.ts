/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This allows the production build to finish even if there are type errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
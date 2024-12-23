/** @type {import('next').NextConfig} */

const nextConfig = {
  // swcMinify: true,
  // productionBrowserSourceMaps: false, // Disable source maps in development
  // optimizeFonts: false, // Disable font optimization

  // the following remote patterns are for Next Image component sources
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "js.devexpress.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/404",
        destination: "/",
        permanent: true,
      },
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

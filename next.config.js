/**
 * Next.js configuration for FitTrack Blog
 * Optimizes images, sets security headers, and configures SEO-friendly settings
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },

  // Image optimization configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['example.com'], // Add any external image domains here
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security and SEO headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects for SEO (if needed in the future)
  async redirects() {
    return [
      // Example redirect - add more as needed
      // {
      //   source: '/old-blog/:slug',
      //   destination: '/blog/:slug',
      //   permanent: true,
      // },
    ];
  },

  // Compress responses for better performance
  compress: true,

  // Enable PWA-like features
  poweredByHeader: false,

  // Strict mode for better development experience
  reactStrictMode: true,

  // Enable SWC minification for better performance
  swcMinify: true,
};

module.exports = nextConfig;
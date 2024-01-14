module.exports = {
  images: {
    domains: ['tailwindui.com'],
  },
  async headers() {
    return [
      {
        // Allow requests from all domains
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
    ];
  },
};
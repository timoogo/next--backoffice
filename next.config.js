module.exports = {
    images: {
      domains: ['tailwindui.com'],
    },
    async headers() {
      return [
        {
          // Autoriser les requêtes provenant de tous les domaines
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
  };
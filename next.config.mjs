// import dns from 'node:dns';
// dns.setServers(['8.8.8.8', '8.8.4.4']);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     dangerouslyAllowSVG: true,
//     contentDispositionType: 'attachment',
//     contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: '**',
//         port: '',
//         pathname: '**',
//       },
//       {
//         protocol: 'http',
//         hostname: '**',
//         port: '',
//         pathname: '**',
//       },
//     ],
//   },
// };

// export default nextConfig;

//2

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
        },
      ]
    };
  },
};

export default nextConfig;
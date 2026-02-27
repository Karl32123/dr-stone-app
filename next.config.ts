/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'static.wikia.nocookie.net' },
      { protocol: 'https', hostname: '*.wikia.nocookie.net' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
    unoptimized: true   // This is the key fix — bypasses hotlink blocks
  },
};

export default nextConfig;

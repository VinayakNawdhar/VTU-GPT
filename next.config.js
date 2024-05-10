/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains : ['t1.gstatic.com','lh3.googleusercontent.com']
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
    },
  reactStrictMode : false
}

module.exports = nextConfig

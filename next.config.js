/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    domains: ["www.adhamdannaway.com", "i.ibb.co", "via.placeholder.com","s3-media0.fl.yelpcdn.com"],
  },
};

module.exports = nextConfig;

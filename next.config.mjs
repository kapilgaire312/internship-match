/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        "https://pub-0b07b77433294c43b13b9a293df13038.r2.dev/profile-pics/**",
      ),
    ],
  },
};

export default nextConfig;

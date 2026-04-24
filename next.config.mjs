/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://pub-4e224a60371345f9994eb80b6f5ef710.r2.dev/**"),
      new URL("https:///**"),
      {
        protocol: "https",
        hostname:
          "internkaji-resumes.f8f3c68e1ae5e8d7da2b4a502f859914.r2.cloudflarestorage.com",
        port: "",
        pathname: "/profile-pics/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  serverExternalPackages: ["pdfjs-dist"],
};

export default nextConfig;

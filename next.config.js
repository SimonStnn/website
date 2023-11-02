/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["default", "nl", "en"],
    defaultLocale: "default",
    localeDetection: false,
  },
};

module.exports = nextConfig;

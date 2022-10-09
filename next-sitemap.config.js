const siteUrl = process.env.NEXT_PUBLIC_DOMAIN_URL.replace(/\/$/, '');

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalPaths: [`${siteUrl}/sitemap.xml`],
  },
};

module.exports = config;

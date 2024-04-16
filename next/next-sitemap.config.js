/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.leondev.uk',
    generateRobotsTxt: true,

    exclude: [
        '/blog-sitemap.xml',
        '/blog/*',
        '/category/*',
        '/ruby',
        '/spotify-login',
        '/*.png',
    ],
    robotsTxtOptions: {
        additionalSitemaps: ['https://example.com/blog-sitemap.xml'],
    },
};

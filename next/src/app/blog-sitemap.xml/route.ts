// app/server-sitemap-index.xml/route.ts
import { getPostBriefs } from '@/utils/strapi/strapi-rsc';
import { getServerSideSitemap } from 'next-sitemap';

export async function GET(request: Request): Response {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')
    const posts = await getPostBriefs();
    if (!posts) return new Response(null);
    return getServerSideSitemap(
        posts.map((a) => ({
            loc: 'https://www.omarileon.me/blog/' + a.slug,
            lastmod: a.date,
        }))
    );
}

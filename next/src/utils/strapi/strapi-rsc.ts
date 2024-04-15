import path from 'path';
import { cache } from 'react';
import readingTime from 'reading-time';
import 'server-only';
import type {
    Post,
    PostBrief,
    ProjectContent,
    StrapiPaginatedResponse,
    StrapiPagination,
    StrapiPostResponse,
    StrapiPostShortResponse,
    TestimonialContent,
} from './types';
const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337/api/';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';
const STRAPI_SPOTIFY_TOKEN = process.env.STRAPI_SPOTIFY_TOKEN;
const OG_BASE_URL = process.env.OG_BASE_URL || 'https://leondev.uk';
const BLOG_PATH = '/freelance-posts';
export async function getStrapiContent<T>(
    apiPath: string,
    params: Record<string, string | string> = {},
    token = STRAPI_TOKEN
): Promise<T> {
    console.log('Fetching:', apiPath);
    const res = await fetch(
        path.join(STRAPI_URL, apiPath) + new URLSearchParams(params),
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const json = (await res.json()) as {
        data: T;
        meta?: { pagination: StrapiPagination };
    };

    return json.data;
}

export const getTestimonials = cache(async () =>
    getStrapiContent<TestimonialContent[]>('testimonials')
);
export const getProjects = cache(async () =>
    getStrapiContent<ProjectContent[]>(
        'projects?' +
            new URLSearchParams({
                populate: '*',
                encodeValuesOnly: 'true',
            })
    ).then((ps) => ps?.filter((p) => p.attributes.target !== 'job'))
);

export function getOGUrl(title: string) {
    return OG_BASE_URL + '/api/og?' + new URLSearchParams({ title });
}
export const getPost = cache(async (slug: string): Promise<Post | null> => {
    const post = await getStrapiContent<StrapiPostResponse[]>(
        'freelance-posts?populate=*&pagination[page]=0&pagination[pageSize]=1&filters[slug][$eq]=' +
            slug
    ).then((ps) => (ps ? ps[0] : undefined));

    if (!post) return null;

    const { attributes } = post;
    const og = attributes.ogImage.data;
    console.log(attributes);
    return {
        ...attributes,
        date: attributes.publishedAt,
        categories: attributes.post_categories.data.map((c) => c.attributes),
        readingTime: readingTime(post.attributes.content),
        ogImage: og
            ? {
                  url: `https://marileon.me/cms${og.attributes.url}`,
                  alternativeText: og.attributes.alternativeText,
              }
            : {
                  url: getOGUrl(attributes.title),
                  alternativeText: 'OG Image',
              },
    };
});

export async function getAllArticles(page = 1, pageSize = 10) {
    const fullPath =
        BLOG_PATH +
        `?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*&sort=publishedAt:desc`; //TODO: Fix the fields issue

    const data = await getStrapiContent<StrapiPostShortResponse[]>(fullPath);
    return data;
}

export async function getPostBriefs(
    page = 1,
    amount = 10
): Promise<PostBrief[]> {
    return getAllArticles(page, amount).then((res) =>
        res.map(({ attributes }) => ({
            ...attributes,
            date: attributes.publishedAt,
            categories: attributes.post_categories.data.map(
                (c) => c.attributes
            ),

            ogImage: attributes.ogImage.data
                ? {
                      url: `https://marileon.me/cms${attributes.ogImage.data.attributes.url}`,
                      alternativeText:
                          attributes.ogImage.data.attributes.alternativeText,
                  }
                : {
                      url: getOGUrl(attributes.title),
                      alternativeText: 'OG Image',
                  },
        }))
    );
}

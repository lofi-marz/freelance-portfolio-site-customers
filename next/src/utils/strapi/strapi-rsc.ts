import { cache } from 'react';
import 'server-only';
import path from 'path';
const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337/api/';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN || '';
const STRAPI_SPOTIFY_TOKEN = process.env.STRAPI_SPOTIFY_TOKEN;
const BLOG_PATH = '/freelance-posts';
import type {
    PostBrief,
    ProjectContent,
    StrapiPaginatedResponse,
    StrapiPagination,
    StrapiPostResponse,
    StrapiPostShortResponse,
    TestimonialContent,
} from './types';
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
    console.log(json);
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
export const getPost = cache(async (slug: string) => {
    const post = await getStrapiContent<StrapiPostResponse[]>(
        'freelance-posts?populate=*&pagination[page]=0&pagination[pageSize]=1&filters[slug][$eq]=' +
            slug
    ).then((ps) => (ps ? ps[0] : undefined));
    if (!post) return null;
    return post;
});

export async function getAllArticles(page = 1, pageSize = 10) {
    const fullPath =
        BLOG_PATH +
        `?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*&sort=publishedAt:desc`; //TODO: Fix the fields issue

    const data = await getStrapiContent<StrapiPostShortResponse[]>(fullPath);
    console.log(data);
    return data;
}

export async function getPostBriefs(
    page = 1,
    amount = 10
): Promise<PostBrief[]> {
    return getAllArticles(page, amount).then((res) =>
        res.map(
            ({
                attributes: { title, description, publishedAt, slug, ogImage },
            }) => ({
                title,
                description,
                slug,
                date: publishedAt,
                ogImage: ogImage.data,
            })
        )
    );
}

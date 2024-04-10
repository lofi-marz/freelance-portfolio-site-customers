import { MDXRemoteSerializeResult } from 'next-mdx-remote';

import { ReadTimeResults } from 'reading-time';
type StrapiContent<T> = {
    id: number;
    attributes: T & StrapiTimestamp;
};

export type StrapiPagination = {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
};

export type StrapiPaginatedResponse<T> = {
    data: T[];
    meta: { pagination: StrapiPagination };
};

export type GlobalContent = {
    about: AboutContent;
    projects: ProjectContent[];
    testimonials: TestimonialContent[];
};

type StrapiTimestamp = {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type AboutContent = StrapiContent<{
    aboutText: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}>;

export type ProjectContent = StrapiContent<{
    title: string;
    description: string;
    repoLink: string;
    liveLink: string;
    brief: string;
    desktopPreview: { data: StrapiImage };
    mobilePreview: { data: StrapiImage };
    mockup: { data: StrapiImage };
    target: 'freelance' | 'job' | 'both';
}>;

export type TestimonialContent = StrapiContent<{
    role: string;
    text: string;
    name: string;
}>;

export type StrapiImage = StrapiContent<{
    alternativeText: string;
    width: number;
    height: number;
    url: string;
}>;

export type StrapiPostCategoryResponse = StrapiContent<{
    name: string;
    slug: string;
}>;
export type StrapiPostResponse = StrapiContent<{
    title: string;
    description: string;
    slug: string;
    content: string;
    ogImage: { data: StrapiImage };
    postCategories: { data: StrapiPostCategoryResponse[] };
}>;

export type StrapiPostShortResponse = StrapiContent<
    Pick<
        StrapiPostResponse['attributes'],
        'title' | 'slug' | 'createdAt' | 'description' | 'ogImage'
    >
>;

export type Post = {
    title: string;
    description: string;
    content: MDXRemoteSerializeResult;
    date: string;
    readingTime: ReadTimeResults;
    categories: PostCategory[];
    slug: string;
};

export type PostBrief = {
    title: string;
    description: string;
    date: string;
    slug: string;
    ogImage: StrapiImage;
};

export type PostCategory = {
    name: string;
    slug: string;
};

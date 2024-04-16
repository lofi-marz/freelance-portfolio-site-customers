import { FormattedHeading } from '@/components/FormattedHeading';
import type { Metadata, ResolvingMetadata } from 'next';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { DetailedHTMLProps, AnchorHTMLAttributes, HTMLAttributes } from 'react';
import {
    getAllArticles,
    getPost,
    getPostBriefs,
} from 'utils/strapi/strapi-rsc';
import Image from 'next/image';
import { ReadMore } from '@/components/sections/Blog';
import { cn } from '@/utils/utils';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const posts = await getPostBriefs();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

type PageProps = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const res = await getPost(params.slug);
    if (!res) return {};
    const { title, description, date, ogImage } = res;
    const ogImageUrl = ogImage
        ? `https://marileon.me/cms${ogImage.url}`
        : 'https://localhost:3005/api/og?' + new URLSearchParams({ title });

    return {
        title: `${title} | Leon Web Design`,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime: date,
            url: 'https://leondev.uk/blog/' + params.slug,
            images: [
                {
                    url: ogImageUrl,
                    alt: ogImage?.alternativeText ?? 'OpenGraph image',
                },
            ],
        },
    };
}
const components: MDXRemoteProps['components'] = {
    a: ({
        href,
        target,
        children,
    }: DetailedHTMLProps<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
    >) => (
        <Link href={href!} target={target}>
            {children}
        </Link>
    ),
    h2: ({
        className,
        children,
        ...props
    }: DetailedHTMLProps<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    >) => (
        <h2 {...props} className={className}>
            <FormattedHeading>{children}</FormattedHeading>
        </h2>
    ),
};

export default async function Page({ params }: { params: { slug: string } }) {
    const post = await getPost(params.slug);

    if (!post) return notFound(); //TODO: Redirect?
    const relatedPosts = (await getPostBriefs()).filter(
        ({ slug }) => params.slug !== slug
    );
    const isStaticOG = !post.ogImage.url.includes('/api/og');
    return (
        <>
            {isStaticOG && (
                <div
                    className="relative aspect-[2/1] max-h-[48rem] w-full brightness-90 lg:aspect-auto lg:h-[calc(55vh+1.5rem)]"
                    style={{ boxShadow: 'inset 0 0 10px' }}>
                    <Image
                        src={post.ogImage.url}
                        className="h-full w-full object-cover shadow-inner"
                        alt=""
                        fill
                    />
                </div>
            )}
            <div
                className={cn(
                    'z-10 -mt-12 w-full rounded-t-3xl bg-theme shadow-lg',
                    !isStaticOG && 'mt-0 pt-24'
                )}>
                <div className="padding-page flex flex-col items-center gap-24 py-24">
                    <article className="prose prose-base prose-stone min-h-screen font-body dark:prose-invert lg:prose-lg prose-headings:font-title">
                        <h1 className="font-body text-3xl lg:text-6xl">
                            <FormattedHeading>{post.title}</FormattedHeading>
                        </h1>
                        <MDXRemote
                            source={post.content}
                            components={components}
                        />
                    </article>
                    {relatedPosts && <ReadMore posts={relatedPosts} />}
                </div>
            </div>
        </>
    );
}

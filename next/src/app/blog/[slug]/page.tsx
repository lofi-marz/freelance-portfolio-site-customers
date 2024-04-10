import { FormattedHeading } from '@/components/FormattedHeading';
import type { Metadata, ResolvingMetadata } from 'next';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { DetailedHTMLProps, AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { getPost, getPostBriefs } from 'utils/strapi/strapi-rsc';
import Image from 'next/image';
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
    const {
        attributes: { title, description, publishedAt, ogImage },
    } = res;
    return {
        title: `${title} | Leon Web Design`,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime: publishedAt,
            url: 'https://leondev.uk/blog/' + params.slug,
            images: [
                {
                    url: `https://marileon.me/cms${ogImage.data.attributes.url}`,
                    alt: ogImage.data.attributes.alternativeText,
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
    const res = await getPost(params.slug);
    if (!res) return null; //TODO: Redirect?

    const { attributes: post } = res;
    return (
        <>
            <div className="relative aspect-[2/1] max-h-[48rem] w-full overflow-clip lg:aspect-auto lg:h-[50vh]">
                <Image
                    src={`https://marileon.me/cms${post.ogImage.data.attributes.url}`}
                    className="h-full w-full object-cover saturate-[0.5]"
                    alt=""
                    fill
                />
                <div className="absolute inset-0 size-full bg-theme opacity-80" />
            </div>
            <div className="padding-page flex flex-col items-center py-24">
                <article className="prose prose-base prose-stone min-h-screen font-body dark:prose-invert lg:prose-lg prose-headings:font-title">
                    <h1 className="font-body text-3xl lg:text-6xl">
                        <FormattedHeading>{post.title}</FormattedHeading>
                    </h1>
                    <MDXRemote source={post.content} components={components} />
                </article>
            </div>
        </>
    );
}

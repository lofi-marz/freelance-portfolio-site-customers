import { FormattedHeading } from '@/components/FormattedHeading';
import type { Metadata, ResolvingMetadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPost } from 'utils/strapi/strapi-rsc';

type PageProps = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug;

    return {
        title: `Leon Web Design | ${slug}`,
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
    const res = await getPost(params.slug);
    if (!res) return null; //TODO: Redirect?

    const { attributes: post } = res;
    return (
        <div className="mt-24 flex flex-col items-center">
            <article className="prose prose-stone min-h-screen max-w-screen-lg font-body dark:prose-invert prose-headings:font-title">
                <h1>
                    <FormattedHeading>{post.title}</FormattedHeading>
                </h1>
                <MDXRemote source={post.content} />
            </article>
        </div>
    );
}

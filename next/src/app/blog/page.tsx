import type { Metadata, ResolvingMetadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPost, getPostBriefs } from 'utils/strapi/strapi-rsc';
import { BlogTitle } from '@/components/sections/Blog';
import { PostLinkCard } from '@/components/sections/Blog/PostLinkCard';
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
    const briefs = await getPostBriefs(0, 10000);

    return (
        <div className="padding-page flex flex-col items-center gap-24 py-24">
            <BlogTitle>Blog.</BlogTitle>
            <ul className="grid-auto-fill-96 2xl:grid-auto-fill-[48rem] flex w-full flex-col gap-4 gap-y-24 lg:grid lg:gap-9">
                {[...briefs, ...briefs, ...briefs].map((b) => (
                    <PostLinkCard key={b.slug} {...b} />
                ))}
            </ul>
        </div>
    );
}

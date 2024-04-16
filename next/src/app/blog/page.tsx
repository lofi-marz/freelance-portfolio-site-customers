import type { Metadata, ResolvingMetadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPost, getPostBriefs } from 'utils/strapi/strapi-rsc';
import { BlogTitle } from '@/components/sections/Blog';
import {
    PostLinkCard,
    PostLinkImageCard,
} from '@/components/sections/Blog/PostLinkCard';
import styles from '@/components/sections/Blog/Blog.module.css';
import { cn } from '@/utils/utils';
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
        title: 'Posts | Leon Web Design',
    };
}

export default async function Page() {
    const [b1, b2, b3, b4, ...rest] = await getPostBriefs(0, 10000);
    console.log('Briefs:', b1, b2, b3, b4, rest);
    return (
        <div className="padding-page flex flex-col items-center gap-24 py-24">
            <BlogTitle>Blog.</BlogTitle>
            <ul
                className={cn(
                    'hidden aspect-[3/2] w-full grid-cols-3 grid-rows-2 gap-8 first:*:col-span-2 last:*:col-span-2 md:grid'
                )}>
                {[b1, b2, b3, b4].map((b) => (
                    <PostLinkImageCard key={b.slug} post={b} />
                ))}
            </ul>
        </div>
    );
}

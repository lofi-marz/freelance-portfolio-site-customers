import { PostBrief } from '@/utils/strapi/types';
import { PostLinkCard } from './PostLinkCard';

export function ReadMore({ posts }: { posts: PostBrief[] }) {
    return (
        <div className="flex w-full max-w-4xl flex-col gap-8 px-12">
            <h2 className="text-6xl">Read More</h2>
            <ul className="grid w-full max-w-screen-lg gap-8  grid-auto-fill-48">
                {[...posts].map((b) => (
                    <PostLinkCard key={b.slug} post={b} variant="blog-footer" />
                ))}
            </ul>
        </div>
    );
}

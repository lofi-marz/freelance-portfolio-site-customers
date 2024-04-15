import { FormattedHeading } from '@/components/FormattedHeading';
import { PostBrief } from '@/utils/strapi/types';
import { cn } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
type PostLinkCardProps = {
    post: PostBrief;
    variant?: 'default' | 'blog-footer';
};

export function PostLinkImageCard({
    post: { title, description, slug, ogImage },
}: PostLinkCardProps) {
    console.log(ogImage);

    return (
        <Link
            className="group/post relative flex flex-col gap-4 rounded-2xl text-light"
            href={`/blog/${slug}`}>
            <div className="relative h-full w-full overflow-clip  rounded-2xl bg-primary pb-2 brightness-50">
                <Image
                    src={ogImage.url}
                    alt={ogImage?.alternativeText ?? ''}
                    fill
                    className="h-full w-full object-cover transition-all duration-500 ease-in-out group-hover/post:scale-110"
                />
                <div className="absolute inset-0 size-full bg-primary/10" />
            </div>
            <h2
                className={cn(
                    ' absolute bottom-0 rounded-lg  p-4 text-3xl underline-offset-0 transition-all duration-500',
                    'group-hover/post:underline group-hover/post:underline-offset-2'
                )}>
                <FormattedHeading>{title}</FormattedHeading>
            </h2>
        </Link>
    );
}
export function PostLinkCard({
    post: { title, description, slug, ogImage },
    variant = 'default',
}: PostLinkCardProps) {
    console.log(ogImage);

    return (
        <Link
            className="group/post flex flex-col gap-4 rounded-2xl"
            href={`/blog/${slug}`}>
            <div className="relative aspect-[1280/720] w-full overflow-clip  rounded-2xl bg-primary pb-2">
                <Image
                    src={ogImage.url}
                    alt={ogImage?.alternativeText ?? ''}
                    fill
                    className="h-full w-full object-cover transition-all duration-500 ease-in-out group-hover/post:scale-110"
                />
            </div>
            <h2
                className={cn(
                    ' rounded-lg text-2xl underline-offset-0  transition-all duration-500 md:py-4',
                    variant === 'default' &&
                        'group-hover/post:bg-theme-invert group-hover/post:p-4 group-hover/post:text-theme',
                    variant === 'blog-footer' &&
                        'group-hover/post:underline group-hover/post:underline-offset-2'
                )}>
                <FormattedHeading>{title}</FormattedHeading>
            </h2>
        </Link>
    );
}

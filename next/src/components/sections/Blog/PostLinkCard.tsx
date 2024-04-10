import { FormattedHeading } from '@/components/FormattedHeading';
import { PostBrief } from '@/utils/strapi/types';
import Image from 'next/image';
import Link from 'next/link';
export function PostLinkCard({ title, description, slug, ogImage }: PostBrief) {
    console.log(ogImage);
    return (
        <Link
            className="group/post flex flex-col gap-4 rounded-2xl"
            href={`/blog/${slug}`}>
            <div className="relative aspect-[1.618/1] w-full overflow-clip  rounded-2xl bg-primary pb-2">
                <Image
                    src={`https://marileon.me/cms${ogImage.attributes.url}`}
                    alt={ogImage.attributes.alternativeText}
                    fill
                    className="h-full w-full object-cover transition-all duration-500 ease-in-out group-hover/post:scale-110"
                />
            </div>
            <h2 className=" rounded-lg text-2xl transition-all  duration-500 group-hover/post:bg-theme-invert group-hover/post:p-4 group-hover/post:text-theme md:py-4">
                <FormattedHeading>{title}</FormattedHeading>
            </h2>
        </Link>
    );
}

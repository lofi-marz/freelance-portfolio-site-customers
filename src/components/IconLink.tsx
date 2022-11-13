import { WithChildrenProps } from '../types';

type IconLinkProps = {
    href: string;
} & WithChildrenProps;

export function IconLink({ href, children }: IconLinkProps) {
    return (
        <a
            key={href}
            href={href}
            className="rounded from-primary to-secondary p-2 text-2xl transition-all hover:bg-gradient-to-r">
            {children}
        </a>
    );
}

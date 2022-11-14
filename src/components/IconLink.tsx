import { WithChildrenProps } from '../types';

type IconLinkProps = {
    href: string;
} & WithChildrenProps;

export function IconLink({ href, children }: IconLinkProps) {
    return (
        <a
            key={href}
            href={href}
            className="rounded p-2 text-2xl transition-all">
            {children}
        </a>
    );
}

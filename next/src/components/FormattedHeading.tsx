import { PropsWithChildren } from 'react';
import { Dot } from './Dot';

export function FormattedHeading({ children }: PropsWithChildren) {
    if (typeof children !== 'string') return children;
    if (children.endsWith('?') || children.endsWith('.')) {
        const start = children.slice(0, children.length - 1);
        const end = children.at(-1);
        return (
            <>
                {start}
                <span className="text-primary">{end}</span>
            </>
        );
    }
    return (
        <>
            {children}
            <Dot />
        </>
    );
}

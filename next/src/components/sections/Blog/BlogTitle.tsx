import { FormattedHeading } from '@/components/FormattedHeading';
import { PropsWithChildren } from 'react';

export function BlogTitle({ children }: PropsWithChildren) {
    return (
        <h1 className="text-8xl lowercase">
            <FormattedHeading>{children}</FormattedHeading>
        </h1>
    );
}

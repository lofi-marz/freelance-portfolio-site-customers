import { PropsWithChildren, createContext, useContext } from 'react';

import { AboutContent, GlobalContent } from '../utils/strapi';

const StrapiContentContext = createContext<GlobalContent | undefined>(
    undefined
);

/*export function useStrapiContentContext() {
    return useContext(StrapiContentContext);
}*/

export function StrapiContentContextProvider({
    children,
    strapiContent,
}: PropsWithChildren & { strapiContent: GlobalContent }) {
    return (
        <StrapiContentContext.Provider value={strapiContent}>
            {children}
        </StrapiContentContext.Provider>
    );
}

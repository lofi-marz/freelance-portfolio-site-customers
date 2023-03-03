import { createContext, useContext } from 'react';
import { WithChildrenProps } from '../types';
import { AboutContent, GlobalContent } from '../utils/strapi';

const StrapiContentContext = createContext<GlobalContent | undefined>(
    undefined
);

export function useStrapiContentContext() {
    return useContext(StrapiContentContext);
}

export function StrapiContentContextProvider({
    children,
    strapiContent,
}: WithChildrenProps & { strapiContent: GlobalContent }) {
    return (
        <StrapiContentContext.Provider value={strapiContent}>
            {children}
        </StrapiContentContext.Provider>
    );
}

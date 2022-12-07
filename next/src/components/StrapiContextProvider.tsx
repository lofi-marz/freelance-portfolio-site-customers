import { createContext, useContext } from 'react';
import { WithChildrenProps } from '../types';

const StrapiContentContext = createContext<
  Record<string, any> | undefined
  >(undefined);

export function useCurrentlyPlayingContext() {
  return useContext(StrapiContentContext);
}

export function StrapiContentContextProvider({
                                                  children,
                                                  strapiContent,
                                                }: WithChildrenProps & { strapiContent: Record<string, any> }) {
  return (
    <StrapiContentContext.Provider value={strapiContent}>
      {children}
    </StrapiContentContext.Provider>
  );
}

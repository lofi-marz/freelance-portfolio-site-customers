'use client';
import { PropsWithChildren, createContext, useContext } from 'react';
import { GetCurrentlyPlayingResponse } from '../utils/spotify';

const CurrentlyPlayingContext = createContext<
    GetCurrentlyPlayingResponse | undefined
>(undefined);

export function useCurrentlyPlayingContext() {
    return useContext(CurrentlyPlayingContext);
}

export function CurrentlyPlayingContextProvider({
    children,
    currentlyPlaying,
}: PropsWithChildren & { currentlyPlaying?: GetCurrentlyPlayingResponse }) {
    return (
        <CurrentlyPlayingContext.Provider value={currentlyPlaying}>
            {children}
        </CurrentlyPlayingContext.Provider>
    );
}

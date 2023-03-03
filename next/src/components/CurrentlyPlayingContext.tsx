import { createContext, useContext } from 'react';
import { GetCurrentlyPlayingResponse } from '../utils/spotify';
import { WithChildrenProps } from '../types';

const CurrentlyPlayingContext = createContext<
    GetCurrentlyPlayingResponse | undefined
>(undefined);

export function useCurrentlyPlayingContext() {
    return useContext(CurrentlyPlayingContext);
}

export function CurrentlyPlayingContextProvider({
    children,
    currentlyPlaying,
}: WithChildrenProps & { currentlyPlaying?: GetCurrentlyPlayingResponse }) {
    return (
        <CurrentlyPlayingContext.Provider value={currentlyPlaying}>
            {children}
        </CurrentlyPlayingContext.Provider>
    );
}

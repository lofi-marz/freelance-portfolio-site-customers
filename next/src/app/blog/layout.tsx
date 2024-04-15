import { Footer } from '@/components/sections/Footer';
import { Nav } from '@/components/sections/Nav';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <main className="flex min-h-screen w-full flex-col">
            <Nav colour="mono" />
            <div className="flex  grow flex-col justify-between">
                {children}
            </div>
            <Footer section="blog" />
        </main>
    );
}

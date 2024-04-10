import { Footer } from '@/components/sections/Footer';
import { Nav } from '@/components/sections/Nav';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <main className="min-h-screen w-full">
            <Nav className="" />
            <div className="flex flex-col">{children}</div>
            <Footer section="blog" />
        </main>
    );
}

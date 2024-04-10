'use client';
import { MotionLink } from './motion';

export function EmailSidebar() {
    return (
        <div className="fixed left-0 z-40 hidden h-screen items-center justify-center mix-blend-difference md:flex">
            <MotionLink
                href="mailto:hello@leondev.uk"
                className="heading -rotate-90 text-light "
                style={{ rotate: '-90deg' }}
                initial="hide"
                animate="show"
                transition={{ delay: 2 }}
                variants={{ hide: { x: -100 }, show: { x: 0 } }}>
                hello@leondev.uk
            </MotionLink>
        </div>
    );
}

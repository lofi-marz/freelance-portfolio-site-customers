import { FaTimes } from 'react-icons/fa';
import { MouseEventHandler } from 'react';
import { motion } from 'framer-motion';
import { CircleFillVariants, links } from './Nav';
import { NavLogo } from './NavLogo';
export function NavLink({
    name,
    href,
    onClick,
}: {
    name: string;
    href: string;
    onClick: MouseEventHandler;
}) {
    return (
        <motion.a
            className=""
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={onClick}>
            {name}.
        </motion.a>
    );
}
export function NavMobileMenu({
    custom,
    onClick,
    height,
}: {
    custom: [number, number];
    onClick: MouseEventHandler;
    height: string | number;
}) {
    return (
        <motion.div className="absolute right-0 top-0 z-50 flex h-screen w-full flex-col text-2xl text-light">
            <div
                className="-mb-1 flex w-full items-center justify-between bg-dark px-6"
                style={{
                    height,
                }}>
                <NavLogo />
                <button onClick={onClick}>
                    <FaTimes />
                </button>
            </div>
            <motion.div
                className="flex h-screen w-full flex-col gap-3 bg-dark px-12 py-12 font-semibold"
                variants={CircleFillVariants}
                custom={custom}
                initial="hide"
                animate="show"
                exit="exit">
                {Object.entries(links).map(([name, href]) => (
                    <NavLink
                        key={name}
                        name={name}
                        href={href}
                        onClick={onClick}
                    />
                ))}
                <ul className="font-medium underline underline-offset-4 transition-all hover:underline-offset-8">
                    <li>
                        <a>hello@leondev.uk</a>
                    </li>
                </ul>
            </motion.div>
        </motion.div>
    );
}

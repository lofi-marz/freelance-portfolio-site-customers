import { DarkModeToggle } from '@/components/DarkModeToggle';
import clsx from 'clsx';
import { title } from 'fonts';

export function Nav() {
    return (
        <nav
            className={clsx(
                'fixed top-0 z-10 flex h-16 w-full items-center justify-center uppercase',
                title.className
            )}>
            <ul className="flex items-center justify-center gap-16 text-sm font-bold">
                {['home', 'about', 'projects', 'freelance'].map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>
        </nav>
    );
}

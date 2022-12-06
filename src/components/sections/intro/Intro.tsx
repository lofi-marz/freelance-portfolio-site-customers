import { motion, useScroll, useTransform } from 'framer-motion';
import clsx from 'clsx';
import { title } from '../../../fonts';
import { SocialsDesktop } from '@/components/sections/intro/Socials';

export function Intro() {
    const { scrollYProgress } = useScroll();
    const height = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);

    return (
        <div
            className={clsx(
                'themed-bg sticky top-0 flex h-[150vh] w-full flex-col items-start justify-start overflow-clip',
                title.className
            )}>
            <div className="themed-bg flex h-screen w-full overflow-clip py-16">
                <div className="flex h-full w-16 items-center justify-center text-sm font-bold uppercase">
                    <div className="-rotate-90">othompsonedwards@gmail.com</div>
                </div>
                <div className="flex h-full w-full flex-col items-start justify-start overflow-clip">
                    <motion.div
                        className="flex h-screen w-full flex-row items-start justify-center shadow"
                        style={{ height }}>
                        <div className="relative h-full w-[90%] bg-primary text-dark-50">
                            <SocialsDesktop />
                        </div>
                        <div className="themed-bg-invert themed-text-invert relative z-10 flex h-full w-full flex-grow items-center justify-start py-12 shadow">
                            <motion.div
                                className="flex w-full flex-col items-start justify-center p-10 text-5xl font-bold"
                                layoutId="greeting">
                                <h1>hi, I&apos;m omari</h1>
                                <h2 className="text-5xl text-primary">
                                    web developer + student
                                </h2>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
                <div className="h-full w-16"></div>
            </div>
        </div>
    );
}

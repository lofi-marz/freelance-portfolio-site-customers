import { CodeWindow } from '@/components/CodeWindow';
import { motion, useMotionValue } from 'framer-motion';
import { WithChildrenProps } from 'types';
import screenshot from 'assets/pet.png';
import Image from 'next/image';
import { Dot } from '@/components/Dot';
import { Dots } from '@/components/Dots';
import { useState, MouseEventHandler } from 'react';
export function Services() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [mouseEntered, setMouseEntered] = useState(false);

    const onMouseMove: MouseEventHandler = (e) => {
        x.set(e.clientX); //Offsets to make the image line up with the actual cursor
        y.set(e.clientY);
    };
    return (
        <div className="space-y-16 lg:px-40 lg:py-24" id="services">
            <motion.h3
                className=" text-center text-5xl md:text-6xl"
                initial="hide"
                whileInView="show">
                What I Offer
            </motion.h3>
            <motion.section
                className="flex grid-cols-2 flex-col gap-16 bg-theme p-6 lg:grid "
                onMouseMove={onMouseMove}
                onMouseEnter={() => setMouseEntered(true)}
                onMouseLeave={() => setMouseEntered(false)}>
                <div className="aspect-square w-full">
                    <Dots followMouse={mouseEntered} x={x} y={y} />
                </div>
                <div className="flex w-full flex-col justify-evenly gap-12">
                    <ServiceText title="Robust Hosting">
                        Reliable, low-cost hosting, without compromising on
                        speed or quality.
                    </ServiceText>

                    <ServiceText title="Creative Web Design">
                        Bring your business to life with a bespoke website that
                        boosts engagement and helps your business stand out from
                        the rest.
                    </ServiceText>

                    <ServiceText title="Bespoke Web Development">
                        I’ll build your site to suit your specific needs, and
                        your website performs lightning fast, no bloated or
                        messy code to slow it down.
                    </ServiceText>
                    <ServiceText title="Effective Search Engine Optimisation">
                        Your website is built with SEO in mind, using advanced
                        pre-rendering techniques to improve your website's
                        ranking potential.
                    </ServiceText>
                </div>
            </motion.section>
        </div>
    );
}

function ServiceText({
    title,
    children,
}: { title: string } & WithChildrenProps) {
    return (
        <div className="flex flex-col items-start justify-center gap-2 text-lg">
            <h3 className="text-xl">{title}</h3>
            {children}
        </div>
    );
}
function ServiceSection({ children }: WithChildrenProps) {
    return (
        <div className="group flex h-[60vh] flex-row gap-16 odd:flex-row-reverse">
            {children}
        </div>
    );
}

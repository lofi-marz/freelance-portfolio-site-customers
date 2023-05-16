import {
    AnimatePresence,
    useMotionValueEvent,
    useTime,
    useTransform,
    Variants,
} from 'framer-motion';
import React, { useState } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { WithChildrenProps } from '../../../types';
import { FaCalendar, FaPhone, FaServer, FaFlask } from 'react-icons/fa';
import { useStrapiContentContext } from '@/components/StrapiContextProvider';
import Image from 'next/image';

export function Bespoke() {
    const desktop = useMediaQuery('md');
    const { projects } = useStrapiContentContext()!;
    const project = projects[4];
    const src =
        'https://marimari.tech/cms' +
        (desktop
            ? project.attributes.desktopPreview.data.attributes.url
            : project.attributes.mobilePreview.data.attributes.url);
    return (
        <section className="themed-text-invert themed-bg-invert relative z-0 flex h-screen  w-full flex-col items-center justify-start gap-6 px-6 py-36 font-title md:flex-row-reverse md:px-36">
            <div className="z-50 -mt-96 w-4/5 md:mt-auto md:grow">
                <Preview src={src} />
            </div>
            <div className="z-20 flex h-full w-full flex-col items-start justify-start gap-6 md:w-1/2 md:justify-center">
                <h2 className="text-center text-5xl font-bold md:text-start">
                    Bespoke Web Development
                </h2>
                <p className="text-center font-body text-xl leading-normal md:pr-24 md:text-start">
                    I specialise in bespoke sites, built from scratch for your
                    needs. For you, this means a blazingly fast site, secure by
                    design, and optimised to rank highly on Google.
                </p>
            </div>
        </section>
    );
}

function Preview({ src }: { src: string }) {
    return (
        <div className="z-50 flex w-full flex-col overflow-clip rounded-xl drop-shadow-md">
            <div className="themed-bg z-50 flex h-7 w-full items-center justify-start gap-1 p-2">
                <span className="aspect-square h-full rounded-full bg-red-400" />
                <span className="aspect-square h-full rounded-full bg-amber-400" />
                <span className="aspect-square h-full rounded-full bg-green-400" />
            </div>
            <div className="relative aspect-[9/16] w-full md:aspect-[16/9]">
                <Image
                    src={src}
                    alt=""
                    fill
                    className="themed-bg z-10 object-cover object-top"
                />
            </div>
        </div>
    );
}

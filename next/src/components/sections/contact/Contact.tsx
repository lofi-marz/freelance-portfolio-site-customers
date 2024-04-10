'use client';
import clsx from 'clsx';
import { title } from '../../../styles/fonts';
import { SlideInText } from '@/components/SlideInText';
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useTransform,
    Variants,
} from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRef, useState } from 'react';

import axios from 'axios';
import { FaCheck } from 'react-icons/fa';
import { Dot } from '@/components/Dot';

type FormInputs = {
    name: string;
    email: string;
    message: string;
};

export function Contact() {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'start start'],
    });

    const parallax = useTransform(scrollYProgress, [0, 1], [-250, 0]);
    //useMotionValueEvent(scrollYProgress, 'change', (v) => console.log(v));
    const {
        register,
        handleSubmit,
        formState: { isSubmitted },
    } = useForm<FormInputs>({
        shouldUseNativeValidation: true,
    });

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        const params = new URLSearchParams(data);
        setStatus('submitting');
        console.log('Sending email:', data, params.toString());
        axios
            .post('/api/contact?' + params.toString())
            .then((res) => setStatus('done'))
            .catch((e) => {
                console.log(e);
                setStatus('error');
            });
    };
    const [status, setStatus] = useState<
        null | 'submitting' | 'done' | 'error'
    >(null);
    return (
        <section className="relative z-10 h-screen bg-theme">
            <motion.section
                id="contact"
                initial="hide"
                whileInView="show"
                transition={{ staggerChildren: 1 }}
                className={clsx(
                    'flex h-screen w-full flex-col items-center justify-center gap-12 overflow-clip bg-theme-invert p-12 text-6xl text-theme-invert md:text-7xl',
                    title.className
                )}
                ref={ref}>
                <div className="flex items-center justify-center text-center font-medium md:w-2/3">
                    <SlideInText invert>
                        Let&apos;s talk about your business
                        <Dot />
                    </SlideInText>
                </div>
                <form
                    className="flex w-full flex-col gap-4 text-xl text-theme-invert  md:w-2/3"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex w-full grid-cols-2 flex-col gap-4 md:grid">
                        <input
                            placeholder="Name"
                            className="border-dark-800 bg-dark-900 placeholder:text-dark-700 w-full rounded border-b-2 p-4"
                            {...register('name')}
                        />
                        <input
                            placeholder="Email"
                            className="border-dark-800 bg-dark-900 placeholder:text-dark-700 w-full rounded border-b-2 p-4"
                            {...register('email')}
                        />
                    </div>
                    <textarea
                        className="border-dark-800 bg-dark-900 placeholder:text-dark-700 rounded border-b-2 p-4"
                        placeholder="Message"
                        rows={5}
                        {...register('message')}
                    />
                    <button
                        className={clsx(
                            'hover:button-solid-light card-primary hover:card-solid mx-auto flex w-full items-center justify-center p-4 px-24 transition-all',
                            status === 'done' ? 'bg-green-400' : 'bg-primary'
                        )}>
                        {status === 'done' ? <FaCheck /> : 'Submit'}
                    </button>
                </form>
            </motion.section>
        </section>
    );
}
const linksRowVariants: Variants = {
    hide: {},
    show: {},
};
const linkVariants: Variants = {
    hide: { opacity: 0 },
    show: { opacity: 1 },
};

function LinksRow({ links }: { links: [string, string][] }) {
    return (
        <motion.div
            variants={linksRowVariants}
            className="flex w-full flex-row justify-between text-sm font-bold uppercase">
            {links.map(([text, url]) => (
                <motion.a
                    variants={linkVariants}
                    key={text}
                    href={url}
                    target="_blank"
                    rel="noreferrer">
                    {text}
                </motion.a>
            ))}
        </motion.div>
    );
}

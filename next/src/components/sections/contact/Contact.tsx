import clsx from 'clsx';
import { title } from '../../../fonts';
import { SlideInText } from '@/components/SlideInText';
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useTransform,
    Variants,
} from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRef } from 'react';
import qs from 'querystring';
import axios from 'axios';

type FormInputs = {
    name: string;
    email: string;
    message: string;
};

export function Contact() {
    const links = {
        LinkedIn:
            'https://www.linkedin.com/in/omari-thompson-edwards-b7307b195',
        Email: 'mailto:othompsonedwards@gmail.com',
        GitHub: 'https://github.com/lofi-marz',
        UpWork: 'https://www.upwork.com/freelancers/~019c194b11d5dfabbc',
        CV: 'Omari Thompson-Edwards CV.pdf',
    };

    const {
        register,
        handleSubmit,
        formState: { isSubmitted },
    } = useForm<FormInputs>({
        shouldUseNativeValidation: true,
    });

    const firstHalf = Object.entries(links).slice(0, 3);
    const secondHalf = Object.entries(links).slice(3);
    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        const params = qs.stringify({ email: data.email });
        console.log('Sending email:', data.email);
        axios.post('/api/send-email?' + params).then((res) => console.log(res));
    };
    return (
        <motion.section
            initial="hide"
            whileInView="show"
            transition={{ staggerChildren: 1 }}
            className={clsx(
                'themed-bg-invert themed-text-invert relative z-30 flex h-screen w-full flex-col items-center justify-center gap-6 overflow-clip p-12 text-6xl md:text-7xl',
                title.className
            )}>
            <div className="flex items-center justify-center text-center font-medium md:w-2/3">
                <SlideInText invert>
                    Let&apos;s talk about your project
                </SlideInText>
            </div>
            <form
                className="themed-text-invert flex w-full flex-col gap-4 text-xl  md:w-2/3"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="flex w-full grid-cols-2 flex-col gap-4 md:grid">
                    <input
                        placeholder="Name"
                        className="w-full border-b-2 border-dark-800 bg-dark-900 p-4 placeholder:text-dark-700"
                    />
                    <input
                        placeholder="Email"
                        className="w-full border-b-2 border-dark-800 bg-dark-900 p-4 placeholder:text-dark-700"
                    />
                </div>
                <textarea
                    className="rounded border-b-2 border-dark-800 bg-dark-900 p-4 placeholder:text-dark-700"
                    placeholder="Message"
                    rows={5}></textarea>
                <button className="hover:button-solid-light card-primary hover:card-solid w-full p-4">
                    Submit
                </button>
            </form>
        </motion.section>
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

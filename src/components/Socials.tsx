import { useState } from 'react';
import { AnimatedIconLink, IconLink } from '@/components/IconLink';
import { FaAt, FaBook, FaGithub, FaLinkedin } from 'react-icons/fa';

export function SocialsDesktop() {
    const [selectedSocial, setSelectedSocial] = useState<number | null>(null);
    const onEnter = (index: number | null) => {
        console.log(index);
        setSelectedSocial(index);
    };

    return (
        <div
            className="flex w-full flex-row items-center justify-center gap-2 rounded text-stone-800 dark:text-white"
            onMouseLeave={() => setSelectedSocial(null)}>
            <div className="absolute h-1 w-full bg-red-400" />
            <div className="z-10 flex w-fit flex-row items-center justify-center gap-2 bg-white px-2 dark:bg-stone-900">
                <AnimatedIconLink
                    href="Omari Thompson-Edwards CV.pdf"
                    index={selectedSocial}
                    onEnter={onEnter}
                    social={0}>
                    <FaBook />
                </AnimatedIconLink>
                <AnimatedIconLink
                    href="https://www.linkedin.com/in/omari-thompson-edwards-b7307b195"
                    index={selectedSocial}
                    onEnter={onEnter}
                    social={1}>
                    <FaLinkedin />
                </AnimatedIconLink>
                <AnimatedIconLink
                    href="https://github.com/lofi-marz"
                    index={selectedSocial}
                    onEnter={onEnter}
                    social={2}>
                    <FaGithub />
                </AnimatedIconLink>
                <AnimatedIconLink
                    href="mailto:othompsonedwards@gmail.com?subject=I%20need%20a%20website!"
                    index={selectedSocial}
                    onEnter={onEnter}
                    social={3}>
                    <FaAt />
                </AnimatedIconLink>
            </div>
        </div>
    );
}

function SocialsMobile() {
    return (
        <div className="flex w-full items-center justify-center gap-2 rounded md:flex-col md:bg-red-400 md:text-white">
            <IconLink href="mailto:othompsonedwards@gmail.com">
                <FaBook />
            </IconLink>
            <IconLink href="https://www.linkedin.com/in/omari-thompson-edwards-b7307b195">
                <FaLinkedin />
            </IconLink>
            <IconLink href="https://github.com/lofi-marz">
                <FaGithub />
            </IconLink>
            <IconLink href="mailto:othompsonedwards@gmail.com">
                <FaAt />
            </IconLink>
        </div>
    );
}

import { useState } from 'react';
import { AnimatedIconLink, IconLink } from '@/components/IconLink';
import {
    FaArrowDown,
    FaAt,
    FaBook,
    FaGithub,
    FaLinkedin,
} from 'react-icons/fa';

export function SocialsDesktop() {
    const [selectedSocial, setSelectedSocial] = useState<number | null>(null);
    const onEnter = (index: number | null) => {
        console.log(index);
        setSelectedSocial(index);
    };

    return (
        <div
            className="absolute right-0 z-10 flex h-full flex-col items-center justify-center gap-2 px-5 text-3xl text-dark-50"
            onMouseLeave={() => setSelectedSocial(null)}>
            <div className="z-10 flex w-fit flex-col items-center justify-center gap-1 rounded-r">
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
            <FaArrowDown className="absolute bottom-12 text-xl" />
        </div>
    );
}

function SocialsMobile() {
    return (
        <div className="flex w-full items-center justify-center gap-2 rounded md:flex-col md:bg-red-400 md:text-dark-50">
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

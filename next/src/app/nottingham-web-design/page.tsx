import { Nav } from '@/components/sections/Nav';
import { Variants } from 'framer-motion';
import '@/styles/globals.css';

import { LandingPageWrapper } from '@/components/LandingPage';
import { About } from '@/components/sections/About';
import { Bespoke } from '@/components/sections/bespoke';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/projects';
import { Services } from '@/components/sections/Services';
import { Testimonials } from '@/components/sections/Testimonials/Testimonials';
import { LocalBusinessJsonLd } from 'next-seo';

import { getProjects, getTestimonials } from 'utils/strapi/strapi-rsc';

//const title = Poppins({ weight: ['600', '700', '800', '900'] });

const headingVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
};

const underlineVariants: Variants = {
    hidden: { width: '0%' },
    visible: { width: '100%', transition: { duration: 1, ease: 'easeInOut' } },
};

export default async function Home() {
    //TODO: Better error handling here
    const testimonials = await getTestimonials();
    const projects = await getProjects();
    if (!projects || !testimonials) return null;
    console.log('Projects:', projects, 'Testimonials:', testimonials);
    return (
        <>
            <LocalBusinessJsonLd
                type="store"
                id="https://leondev.uk"
                name="Leon Web Design"
                description="Nottingham-based Bespoke Web Development"
                address="Nottingham, NG7"
                useAppDir
            />
            <LandingPageWrapper>
                <Nav />
                <Hero subtitle="Nottingham-Based Web Design & Development" />
                <About
                    content={
                        <>
                            I specialize in small business web design and
                            development for clients anywhere in Nottingham.
                            Every line of code is written by hand to ensure the
                            best performance, which helps bring in more
                            customers to your site and bring more revenue to
                            your business
                        </>
                    }
                />
                <Bespoke title="Nottingham Web Design" />
                <Services />
                <Projects projects={projects} />
                <Testimonials testimonials={testimonials} />
                <Contact />
                <Footer />
            </LandingPageWrapper>
        </>
    );
}

import { CTA } from '@/components/Button';
import { Dot } from '@/components/Dot';

export function Pricing() {
    return (
        <section className="relative flex w-full flex-col items-center justify-center gap-8 bg-theme-invert px-6 py-24 text-theme md:px-40 lg:h-screen">
            <p className="heading text-center text-4xl leading-normal lg:text-7xl">
                <span className="text-primary">
                    <span className="text-theme-subtitle line-through opacity-20">
                        £250
                    </span>{' '}
                    £50
                </span>{' '}
                Upfront
                <br />
                <span className="leading-normal text-primary">
                    <span className="text-theme-subtitle line-through opacity-20">
                        £30
                    </span>{' '}
                    £20
                </span>
                /mo
                <Dot />
            </p>

            <div className="heading text-xl text-primary">
                2 discount slots left
            </div>
            <CTA variant="default" />
        </section>
    );
}

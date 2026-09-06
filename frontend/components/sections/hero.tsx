import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { AnimateIn } from "@/components/animate-in";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-240 items-end bg-primary pt-24 text-primary-foreground"
    >
      <Image
        src="/hero.jpeg"
        alt="A mentor holding a young boy close"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-55"
      />
      <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/75 to-primary/20" />
      <div className="relative mx-10 grid w-full max-w-8xl gap-10 px-5 pb-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:pb-28">
        <div className="max-w-3xl">
          <AnimateIn delay={200} duration={800}>
            <p className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[.25em] text-accent">
              Guiding boys to greatness
            </p>
          </AnimateIn>
          <AnimateIn delay={400} duration={900}>
            <h1 className="text-balance font-serif text-5xl font-bold leading-[.98] tracking-tight sm:text-7xl lg:text-8xl">
              Little men.
              <br />
              <span className="text-accent">Big dreams.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={600} duration={800}>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-8 text-primary-foreground/85 sm:text-xl">
              We help boys and young men in underserved communities discover their
              potential, build confidence, and become leaders who create positive
              change.
            </p>
          </AnimateIn>
          <AnimateIn delay={800} duration={800}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#programs"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-bold text-accent-foreground transition hover:translate-y-[-2px]"
              >
                Explore our work <ArrowRight size={18} />
              </a>
              <a
                href="#about"
                className="rounded-full border border-primary-foreground/50 px-6 py-3.5 font-bold transition hover:bg-primary-foreground hover:text-primary"
              >
                Learn about us
              </a>
            </div>
          </AnimateIn>
        </div>
        <div className="hidden items-end justify-end lg:flex">
          <AnimateIn delay={1000} direction="left" duration={800}>
            <div className="max-w-xs border-l-2 border-accent pl-6">
              <p className="font-serif text-3xl font-bold">
                Every boy deserves a chance to dream.
              </p>
              <p className="mt-4 text-sm leading-6 text-primary-foreground/70">
                Education. Mentorship. Skills. Well-being.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-background [clip-path:ellipse(70%_100%_at_50%_100%)]" />
    </section>
  );
}

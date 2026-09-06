import Image from "next/image";
import { AnimateIn } from "@/components/animate-in";

export function Partner() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-9xl md:px-15">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimateIn direction="up">
            <div>
              <p className="text-2xl font-bold text-accent">Get Involved</p>
              <h2 className="mt-4 font-serif text-4xl font-bold sm:text-5xl">
                Become a Partner
              </h2>
              <p className="mt-6 text-xl leading-8 text-foreground/80">
                Join us in our mission to empower the next generation of leaders.
                Your partnership makes a lasting impact on the lives of boys and
                young men in our community.
              </p>
              <a
                href="/contact"
                className="mt-8 inline-block rounded-full bg-accent px-8 py-4 text-lg font-bold text-black transition-colors hover:bg-accent/90"
              >
                Partner With Us
              </a>
            </div>
          </AnimateIn>
          <AnimateIn delay={200} direction="up">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
              <Image
                src="/partner.png"
                alt="Become a Partner"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

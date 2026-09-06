import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { images } from "./data";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-32"
    >
      <div>
        <p className="eyebrow">Why we exist</p>
        <h2 className="section-title">
          A stronger future starts with{" "}
          <span className="text-accent">one boy.</span>
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Johnnie Boy&apos;s Foundation supports and empowers boys and young men
          through programs that promote their physical, emotional, and social
          well-being. We create safe spaces where ambition is encouraged and
          every young person is seen.
        </p>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Our work is rooted in northern Nigeria, with a vision that reaches
          every community where a boy needs opportunity, guidance, and a reason
          to believe in tomorrow.
        </p>
        <a
          href="#contact"
          className="mt-8 inline-flex items-center gap-2 font-bold text-primary underline decoration-accent decoration-2 underline-offset-4"
        >
          Partner with us <ArrowRight size={18} />
        </a>
      </div>
      <div className="relative">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={images.project}
            alt="Boys learning together during a foundation program"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="rounded-[2rem] object-cover object-center"
          />
        </div>
        <div className="absolute -bottom-6 -left-4 max-w-[240px] rounded-2xl bg-accent p-6 text-accent-foreground shadow-xl sm:-left-8">
          <p className="font-serif text-3xl font-bold">One dream</p>
          <p className="mt-1 text-sm font-semibold">at a time.</p>
        </div>
      </div>
    </section>
  );
}

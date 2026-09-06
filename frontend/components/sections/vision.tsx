import Image from "next/image";
import { AnimateIn } from "@/components/animate-in";

const visionPoints = [
  {
    title: "Empower Potential",
    copy: "To empower and inspire boys to reach their full potential through education, mentorship, and community involvement.",
  },
  {
    title: "Safe Environment",
    copy: "To create a safe and supportive environment for boys to develop their leadership skills, self-confidence, and sense of purpose.",
  },
  {
    title: "Positive Role Models",
    copy: "To promote positive role models for boys and to provide access to resources and support to help them navigate the challenges of growing up.",
  },
  {
    title: "Community of Leaders",
    copy: "To create a community of boys who are committed to making a positive impact on the world, and to inspire them to become responsible and compassionate adults and leaders.",
  },
];

export function Vision() {
  return (
    <section
      className="py-24 relative text-primary-foreground lg:py-32 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/vision.png')" }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/10 to-black/50 z-10"></div>
      <div className="mx-auto max-w-9xl px-5 relative z-20 lg:px-8">
        <AnimateIn direction="up">
          <div className="text-center">
            <p className="text-2xl font-bold  text-accent">Our Vision</p>
            <h2 className="mt-4 font-serif text-4xl font-bold sm:text-5xl">
              Building tomorrow&apos;s leaders
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-white">
              The mission of Johnnie Boy&apos;s Foundation is to support and
              empower boys and young men through programs and services that
              promote their physical, emotional, and social well-being.
            </p>
          </div>
        </AnimateIn>
        <AnimateIn delay={200} direction="up">
          <div className="mt-16 lg:px-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visionPoints.map((point) => (
              <article
                key={point.title}
                className="rounded-2xl border border-accent bg-black/50  p-10"
              >
                <h3 className="font-serif text-2xl font-bold text-accent">
                  {point.title}
                </h3>
                <p className="mt-4 text-xl leading-7 text-white">{point.copy}</p>
              </article>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

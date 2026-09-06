"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";

export function ProgramDetail({ program }: { program: { slug: string; title: string; description: string; badge: string; image: string; fullCopy: string } }) {
  return (
    <section className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-accent transition hover:gap-3"
        >
          <ArrowLeft size={18} /> Back to programs
        </Link>
        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl">
          <Image
            src={program.image}
            alt={program.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <AnimateIn direction="up">
          <span className="mt-6 w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
            {program.badge}
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
            {program.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {program.description}
          </p>
        </AnimateIn>
        <AnimateIn delay={200} direction="up">
          <p className="mt-8 text-lg leading-8">
            {program.fullCopy}
          </p>
        </AnimateIn>
        <AnimateIn delay={400} direction="up">
          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-bold text-accent-foreground transition hover:bg-accent/90"
            >
              Back to all programs <ArrowLeft size={18} />
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Mail } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";

interface ComingSoonProps {
  title?: string;
  subtitle?: string;
  description?: string;
  /** If true, renders as a full-page standalone view (with its own height/bg).
   *  If false, renders inline (useful inside existing page layouts). */
  fullPage?: boolean;
}

export function ComingSoon({
  title = "Coming Soon",
  subtitle,
  description = "We're working hard to bring you something amazing. This page is currently under construction — check back soon!",
  fullPage = true,
}: ComingSoonProps) {
  const content = (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary px-5 py-24 text-primary-foreground">
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <Image
          src="/hero.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/85 to-primary" />

      {/* Decorative accent ring */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <AnimateIn direction="up" delay={0}>
          {/* Icon badge */}
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm">
            <Clock size={36} className="text-accent" />
          </div>

          {subtitle && (
            <p className="eyebrow mb-3 text-accent">{subtitle}</p>
          )}

          <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>
        </AnimateIn>

        <AnimateIn direction="up" delay={120}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/75">
            {description}
          </p>
        </AnimateIn>

        <AnimateIn direction="up" delay={200}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-accent-foreground transition hover:bg-accent/90"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <a
              href="mailto:info@johnnieboysfoundation.org"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-7 py-3 text-sm font-bold text-primary-foreground transition hover:border-accent hover:text-accent"
            >
              <Mail size={16} />
              Contact Us
            </a>
          </div>
        </AnimateIn>

        {/* Logo watermark */}
        <AnimateIn direction="up" delay={280}>
          <div className="mt-16 flex flex-col items-center gap-3 opacity-50">
            <Image
              src="/logo/logo.svg"
              alt="Johnnie Boy's Foundation"
              width={120}
              height={67}
              className="h-8 w-auto object-contain"
            />
            <p className="text-xs tracking-widest text-primary-foreground/60 uppercase">
              Little men, big dreams.
            </p>
          </div>
        </AnimateIn>
      </div>
    </div>
  );

  if (!fullPage) {
    return content;
  }

  // Full page: pad top for fixed header
  return <main className="pt-0">{content}</main>;
}

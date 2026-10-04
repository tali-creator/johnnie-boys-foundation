import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Johnnie Boy's Foundation",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main>
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary px-5 py-24 text-primary-foreground">
        {/* Background */}
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

        {/* Decorative rings */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          {/* 404 large number */}
          <p className="font-serif text-9xl font-bold text-accent/30 sm:text-[10rem]">
            404
          </p>

          <h1 className="mt-2 font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Page Not Found
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/75">
            Oops! The page you&apos;re looking for doesn&apos;t exist or may
            have been moved. Let&apos;s get you back on track.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-accent-foreground transition hover:bg-accent/90"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-7 py-3 text-sm font-bold text-primary-foreground transition hover:border-accent hover:text-accent"
            >
              Contact Us
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/50">
              Popular pages
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {[
                { label: "About", href: "/about" },
                { label: "Programs", href: "/mentorship" },
                { label: "Initiatives", href: "/initiatives" },
                { label: "Impact", href: "/impact" },
                { label: "Gallery", href: "/gallery-events" },
                { label: "Get Involved", href: "/get-involved" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-primary-foreground/20 px-4 py-1.5 text-sm text-primary-foreground/70 transition hover:border-accent/50 hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div className="mt-16 flex flex-col items-center gap-3 opacity-50">
            <Image
              src="/logo/logo.svg"
              alt="Johnnie Boy's Foundation"
              width={120}
              height={67}
              className="h-8 w-auto object-contain"
            />
            <p className="text-xs uppercase tracking-widest text-primary-foreground/60">
              Little men, big dreams.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

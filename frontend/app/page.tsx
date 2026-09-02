"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Heart,
  Menu,
  X,
} from "lucide-react";

const images = {
  hero: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-04%20at%2000.23.12_02a4d0f2.jpg-PYjbd3I787DJsJwkBEXEHVDWnCC51V.jpeg",
  project:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b1.jpg-KXpR71EOenqAMQ1C3G0IcaQikVpJER.jpeg",
  mission:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b3.jpg%20%281%29-UAqMGhDSGFWDAXC4ejCeUDwCEg29DX.jpeg",
  skills:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bloom%20pet%20project-AcDJ6gkwxzKMNG1coRzDRxMwFswiG4.png",
  child:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boy%203.jpg-upchMBkkSTDh5WktvtbBrkJi0x97Qd.jpeg",
};

const programs = [
  {
    title: "Education",
    copy: "Learning materials, scholarships, and school support that help boys stay in school and excel.",
    icon: "01",
  },
  {
    title: "Mentorship",
    copy: "Trusted role models who listen, guide, and help young men build confidence and purpose.",
    icon: "02",
  },
  {
    title: "Skills Training",
    copy: "Practical digital, creative, and vocational skills that open doors to future careers.",
    icon: "03",
  },
  {
    title: "Health & Well-being",
    copy: "Care, counseling, and wellness support so every boy can thrive physically and emotionally.",
    icon: "04",
  },
];

export default function Page() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a
            href="#top"
            className="flex items-center gap-3"
            aria-label="Johnnie Boy's Foundation home"
          >
            <img
              src={images.child}
              alt=""
              className="size-10 rounded-full object-cover object-center"
            />
            <span className="font-serif text-lg font-bold tracking-tight text-primary">
              JOHNNIE BOY&apos;S <span className="text-accent">FOUNDATION</span>
            </span>
          </a>
          <nav
            className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-5 border-b border-border bg-background px-5 py-6 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
          >
            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold hover:text-accent"
            >
              About
            </a>
            <a
              href="#programs"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold hover:text-accent"
            >
              Our work
            </a>
            <a
              href="#impact"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold hover:text-accent"
            >
              Impact
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold hover:text-accent"
            >
              Contact
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-primary px-5 py-2.5 text-center text-sm font-bold text-primary-foreground transition hover:bg-accent hover:text-accent-foreground"
            >
              Get involved
            </a>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section
        id="top"
        className="relative flex min-h-[760px] items-end bg-primary pt-24 text-primary-foreground"
      >
        <img
          src={images.hero}
          alt="A mentor holding a young boy close"
          className="absolute inset-0 size-full object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/75 to-primary/20" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 pb-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:pb-28">
          <div className="max-w-3xl">
            <p className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[.25em] text-accent">
              <span className="h-px w-12 bg-accent" />
              Guiding boys to greatness
            </p>
            <h1 className="text-balance font-serif text-5xl font-bold leading-[.98] tracking-tight sm:text-7xl lg:text-8xl">
              Little men.
              <br />
              <span className="text-accent">Big dreams.</span>
            </h1>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-8 text-primary-foreground/85 sm:text-xl">
              We help boys and young men in underserved communities discover
              their potential, build confidence, and become leaders who create
              positive change.
            </p>
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
          </div>
          <div className="hidden items-end justify-end lg:flex">
            <div className="max-w-xs border-l-2 border-accent pl-6">
              <p className="font-serif text-3xl font-bold">
                Every boy deserves a chance to dream.
              </p>
              <p className="mt-4 text-sm leading-6 text-primary-foreground/70">
                Education. Mentorship. Skills. Well-being.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-background [clip-path:ellipse(70%_100%_at_50%_100%)]" />
      </section>

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
            Johnnie Boy&apos;s Foundation supports and empowers boys and young
            men through programs that promote their physical, emotional, and
            social well-being. We create safe spaces where ambition is
            encouraged and every young person is seen.
          </p>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Our work is rooted in northern Nigeria, with a vision that reaches
            every community where a boy needs opportunity, guidance, and a
            reason to believe in tomorrow.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 font-bold text-primary underline decoration-accent decoration-2 underline-offset-4"
          >
            Partner with us <ArrowRight size={18} />
          </a>
        </div>
        <div className="relative">
          <img
            src={images.project}
            alt="Boys learning together during a foundation program"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover object-center"
          />
          <div className="absolute -bottom-6 -left-4 max-w-[240px] rounded-2xl bg-accent p-6 text-accent-foreground shadow-xl sm:-left-8">
            <p className="font-serif text-3xl font-bold">One dream</p>
            <p className="mt-1 text-sm font-semibold">at a time.</p>
          </div>
        </div>
      </section>

      <section id="programs" className="bg-secondary py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">What we do</p>
            <h2 className="section-title">
              Building the conditions for{" "}
              <span className="text-accent">greatness.</span>
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Our programs are designed around the whole person, turning support
              into confidence and confidence into possibility.
            </p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {programs.map((program) => (
              <article
                key={program.title}
                className="group flex flex-col justify-between rounded-3xl bg-background p-7 transition hover:bg-primary hover:text-primary-foreground sm:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm font-bold text-accent">
                    {program.icon}
                  </span>
                  <ArrowRight className="transition group-hover:translate-x-1" />
                </div>
                <div>
                  <h3 className="mt-16 font-serif text-3xl font-bold">
                    {program.title}
                  </h3>
                  <p className="mt-3 max-w-md leading-7 text-muted-foreground group-hover:text-primary-foreground/75">
                    {program.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="impact"
        className="bg-primary py-24 text-primary-foreground lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <p className="eyebrow text-accent">Our mission</p>
            <h2 className="section-title text-primary-foreground">
              Opportunity changes{" "}
              <span className="text-accent">everything.</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary-foreground/75">
              We believe education, mentorship, and practical skills can break
              cycles of poverty and create future leaders who strengthen their
              communities.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <CheckCircle2 className="text-accent" />
              <span className="font-semibold">A safe place to grow</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <CheckCircle2 className="text-accent" />
              <span className="font-semibold">Tools for independence</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <CheckCircle2 className="text-accent" />
              <span className="font-semibold">Role models for the journey</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={images.mission}
              alt="Mentor working with boys at computers"
              className="col-span-2 aspect-[16/8] w-full rounded-3xl object-cover"
            />
            <img
              src={images.skills}
              alt="Skills training program poster"
              className="aspect-square w-full rounded-3xl object-cover"
            />
            <div className="flex aspect-square flex-col justify-end rounded-3xl bg-accent p-6 text-accent-foreground">
              <Heart className="mb-auto" fill="currentColor" />
              <p className="font-serif text-3xl font-bold">
                Your support makes room for possibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8 lg:py-32"
      >
        <div>
          <p className="eyebrow">Join the movement</p>
          <h2 className="section-title">
            Help a boy see what&apos;s{" "}
            <span className="text-accent">possible.</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Whether you want to volunteer, partner, donate, or simply learn
            more, we&apos;d love to hear from you.
          </p>
          <div className="mt-10 flex flex-col gap-4 text-sm font-semibold">
            <a
              href="mailto:johnnieboysfoundation@gmail.com"
              className="hover:text-accent"
            >
              johnnieboysfoundation@gmail.com
            </a>
            <a href="tel:+2348131576436" className="hover:text-accent">
              +234 813 157 6436
            </a>
            <span className="text-muted-foreground">Kaduna, Nigeria</span>
          </div>
        </div>
        <form
          className="flex flex-col gap-5 rounded-3xl bg-secondary p-6 sm:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          {sent ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="size-12 text-accent" />
              <h3 className="mt-5 font-serif text-3xl font-bold">
                Thank you for reaching out.
              </h3>
              <p className="mt-2 text-muted-foreground">
                Our team will be in touch soon.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-bold">
                  Name
                  <input
                    required
                    className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-bold">
                  Email
                  <input
                    required
                    type="email"
                    className="rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm font-bold">
                I&apos;m interested in...
                <select className="rounded-xl border border-border bg-background px-4 py-3 font-normal">
                  <option>Volunteering</option>
                  <option>Partnering</option>
                  <option>Supporting a program</option>
                  <option>Learning more</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-bold">
                Message
                <textarea
                  required
                  rows={5}
                  className="resize-none rounded-xl border border-border bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-accent"
                />
              </label>
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground transition hover:bg-accent hover:text-accent-foreground">
                Send message <ArrowRight size={18} />
              </button>
            </>
          )}
        </form>
      </section>

      <footer className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between lg:px-8">
          <div>
            <div className="font-serif text-xl font-bold">
              JOHNNIE BOY&apos;S <span className="text-accent">FOUNDATION</span>
            </div>
            <p className="mt-2 text-sm text-primary-foreground/60">
              Guiding boys to greatness.
            </p>
          </div>
          <div className="text-left text-sm text-primary-foreground/60 sm:text-right">
            <p>Little men, big dreams.</p>
            <p className="mt-1">© 2026 Johnnie Boy&apos;s Foundation</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

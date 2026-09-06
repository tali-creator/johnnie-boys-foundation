"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  Users,
  BookOpen,
  Target,
} from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import { SocialLinks } from "@/components/social-links";

const aimsAndObjectives = [
  "Promoting access to quality and accessible education for underprivileged boys.",
  "Providing mentorship programs to instill discipline, leadership skills, and sound moral values.",
  "Delivering skills acquisition and vocational training opportunities to prepare young boys for a productive future.",
  "Promoting healthy living, sports, and well-being through health awareness initiatives and outreach programs.",
  "Carrying out and supporting research on the socio-economic development of boys from birth to adulthood.",
];

const images = [
  "/hero.jpeg",
  "/mentor.png",
  "/vision.png",
  "/enroll-a-boy.jpeg",
  "/volunteer.png",
  "/partner.jpeg",
  "/donate.jpeg",
  "img1.jpeg",
  "img2.jpeg",
  "img3.jpeg",
];

const pillars = [
  {
    title: "Education",
    description:
      "Learning materials, scholarships, and school support that help boys stay in school and excel.",
    icon: BookOpen,
  },
  {
    title: "Mentorship",
    description:
      "Trusted role models who listen, guide, and help young men build confidence and purpose.",
    icon: Users,
  },
  {
    title: "Skills Training",
    description:
      "Practical digital, creative, and vocational skills that open doors to future careers.",
    icon: Target,
  },
  {
    title: "Health & Well-being",
    description:
      "Care, counseling, and wellness support so every boy can thrive physically and emotionally.",
    icon: Heart,
  },
];

const values = [
  {
    title: "Equity",
    description:
      "Every boy deserves equal access to opportunities, regardless of background or circumstance.",
  },
  {
    title: "Integrity",
    description:
      "We operate with transparency, honesty, and accountability in everything we do.",
  },
  {
    title: "Empowerment",
    description:
      "We believe in building capacity and confidence in every young person we serve.",
  },
  {
    title: "Community",
    description:
      "We strengthen communities by investing in their most valuable resource — their youth.",
  },
];

export default function AboutPage() {
  return (
    <section id="about" className="bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-primary py-24 text-primary-foreground lg:py-32">
        <Image
          src="/hero.jpeg"
          alt="About Johnnie Boy's Foundation"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/40 via-primary/80 to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 text-center lg:px-8">
          <AnimateIn direction="up">
            <p className="eyebrow text-accent">About Us</p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-[.98] tracking-tight sm:text-6xl lg:text-8xl">
              Guiding Boys
              <br />
              <span className="text-accent">to Greatness</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-primary-foreground/80">
              We believe every boy has the potential to become a leader. Through
              education, mentorship, and community support, we help young men in
              northern Nigeria discover their purpose and build their future.
            </p>
          </AnimateIn>
          <AnimateIn delay={200} direction="up">
            <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <CheckCircle2 className="mx-auto text-accent" size={32} />
                <h3 className="mt-4 font-serif text-lg font-bold">
                  Empower Boys
                </h3>
                <p className="mt-2 text-sm text-primary-foreground/70">
                  Providing access to quality education and resources for boys
                  in underserved communities.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
                <Users className="mx-auto text-accent" size={32} />
                <h3 className="mt-4 font-serif text-lg font-bold">
                  Build Leaders
                </h3>
                <p className="mt-2 text-sm text-primary-foreground/70">
                  Mentoring young men to become confident, skilled, and
                  purposeful leaders.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-background [clip-path:ellipse(70%_100%_at_50%_100%)]" />
      </div>

      {/* Who We Are */}
      <div id="who-we-are" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <AnimateIn direction="up">
          <div className="text-center">
            <p className="eyebrow">Who We Are</p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              We are a foundation and a partner
              <br />
              for boys&apos; futures.
            </h2>
          </div>
        </AnimateIn>
        <AnimateIn delay={100} direction="up">
          <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-8 text-muted-foreground">
            Johnnie Boy&apos;s Foundation is a registered non-profit
            organization with a passion for helping boys and young men in
            northern Nigeria reach their full potential. We create safe spaces
            where ambition is encouraged, education is prioritized, and every
            young person is seen and supported.
          </p>
        </AnimateIn>
        <AnimateIn delay={200} direction="up">
          <div className=" flex flex-wrap justify-between items-center mt-12 gap-4">
            {images.map((img, index) => (
              <div
                className="relative mt-12 aspect-6/4 border-3 overflow-hidden w-fit rounded-3xl"
                key={index}
              >
                <Image
                  src={img}
                  alt={`Image ${index + 1}`}
                  width={200}
                  height={120}
                  className="object-center hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* Registration Info */}
      <div className="border-y border-border bg-primary py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn direction="up">
            <div className="grid gap-8 text-center sm:grid-cols-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-accent">
                  RC/IT Number
                </p>
                <p className="mt-2 font-serif text-2xl text-primary-foreground font-bold">
                  9548864
                </p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-accent">
                  Date of Registration
                </p>
                <p className="mt-2 font-serif text-2xl text-primary-foreground font-bold">
                  May 14, 2026
                </p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-accent">
                  CAC Status
                </p>
                <p className="mt-2 font-serif text-2xl text-primary-foreground font-bold">
                  Active
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Mission / Vision / Promise */}
      <div id="mission" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <AnimateIn direction="up">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Target className="text-accent" size={28} />
              </div>
              <h3 className="mt-6 font-serif text-xl font-bold">Our Mission</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                To support and empower boys and young men through programs and
                services that promote their physical, emotional, and social
                well-being.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Users className="text-accent" size={28} />
              </div>
              <h3 className="mt-6 font-serif text-xl font-bold">Our Vision</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                To be a leading foundation in northern Nigeria, creating a
                community of empowered boys who grow into responsible and
                impactful leaders.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Heart className="text-accent" size={28} />
              </div>
              <h3 className="mt-6 font-serif text-xl font-bold">Our Promise</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                To create safe, supportive environments where every boy can
                discover his potential, build confidence, and become a leader
                who creates positive change.
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* Program Section */}
      <div className="bg-primary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn direction="up">
            <div className="text-center">
              <p className="text-primary-foreground">Our Program</p>
              <h2 className="mt-4 font-serif text-white text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Little Men, Big Dreams
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground">
                Our flagship program provides mentorship, education, skills
                training, and wellness support to boys and young men in
                underserved communities across Taraba and Kaduna states.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={200} direction="up">
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-border bg-card p-8 transition hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                    <pillar.icon className="text-accent" size={24} />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-bold">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Aims & Objectives */}
      <div id="aims" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimateIn direction="up">
            <div>
              <p className="eyebrow">Aims &amp; Objectives</p>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">
                What drives everything we do.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Our five core objectives guide every program, partnership, and
                initiative we undertake.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={200} direction="up">
            <div className="space-y-4">
              {aimsAndObjectives.map((aim, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-xl border border-border bg-card p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {aim}
                  </p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Values Section */}
      <div id="values" className="border-y border-border bg-primary  py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn direction="up">
            <div className="text-center">
              <p className="text-accent">Our Values</p>
              <h2 className="mt-4 font-serif text-white text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Committed to our values
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground">
                The principles that guide our work and define who we are as an
                organization.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={200} direction="up">
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl bg-card p-8 transition hover:shadow-xl"
                >
                  <h3 className="font-serif text-xl font-bold text-accent">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Board of Trustees */}
      <div id="team" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <AnimateIn direction="up">
          <div className="text-center">
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Board of Trustees
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              The dedicated individuals guiding our mission and vision.
            </p>
          </div>
        </AnimateIn>
        <AnimateIn delay={200} direction="up">
          <div className="mt-16 flex justify-center gap-12">
            {[
              {
                name: "Barnabas Johnnie",
                role: "Chairman",
                img: "barnabas.jpeg",
              },
              { name: "Abijah Johnnie", role: "Trustee", img: "abijah.png" },
              {
                name: "Chioma Oguegbu",
                role: "Secretary / Trustee",
                img: "chioma.jpeg",
              },
            ].map((trustee) => (
              <div key={trustee.name} className="text-center">
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src={trustee.img}
                    alt={trustee.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 font-serif text-xl font-bold">
                  {trustee.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-accent">
                  {trustee.role}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>

      {/* Join / Get Involved */}
      <div id="get-involved" className="bg-primary py-20 text-primary-foreground lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn direction="up">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="eyebrow text-accent">Get Involved</p>
                <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">
                  Join us and make your mark
                </h2>
                <p className="mt-6 text-lg leading-8 text-primary-foreground/80">
                  Whether you want to volunteer, partner, donate, or simply
                  learn more, there&apos;s a way for you to plug in with Johnnie
                  Boy&apos;s Foundation and help shape the future of boys and
                  young men in our communities.
                </p>
                <Link
                  href="/get-involved"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-bold text-accent-foreground transition hover:bg-accent/90"
                >
                  Get involved <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl">
                  <Image
                    src="/partner.png"
                    alt="Get Involved"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Contact */}
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <AnimateIn direction="up">
          <div className="text-center">
            <p className="eyebrow">Contact</p>
            <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Let&apos;s connect
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              No 3 Mozambique Crescent, Barnawa Shopping Complex, Kaduna, Kaduna
              State, Nigeria
            </p>
              <SocialLinks />
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

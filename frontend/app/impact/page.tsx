"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, Users, BookOpen, Target, Heart, Lightbulb, Award, Calendar } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import {
  impactStats,
  mentorshipTopics,
  partners,
  trainingAreas,
  programBenefits,
  supportProvided,
  areasOfImpact,
  coreValues,
  galleryImages,
} from "@/components/sections/impact-data";

export default function ImpactPage() {
  return (
    <section id="impact" className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden min-h-[90vh] bg-primary py-24 text-primary-foreground lg:py-32">
        <Image
          src="/hero.jpeg"
          alt="Our Impact"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/80 to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 text-center lg:px-8">
          <AnimateIn direction="up">
            <p className="eyebrow text-accent">BLOOM Initiative</p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Our Impact
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80">
              Little Men, Big Dreams — Upgrading Minds, Shaping Futures.
              Discover how we are empowering the next generation of leaders across northern Nigeria.
            </p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-background [clip-path:ellipse(70%_100%_at_50%_100%)]" />
      </div>

      {/* Introduction */}
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimateIn direction="left">
            <div>
              <p className="eyebrow text-accent">Introducing BLOOM</p>
              <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                50 Schools Journey to Purpose Initiative
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                BLOOM is a youth development initiative of Johnnie Boy&apos;s Foundation designed to create pathways for young people to discover their potential, develop practical skills and gain the confidence and support needed to shape their futures.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                As a growing platform for youth empowerment, BLOOM brings together complementary projects that address different stages of young people&apos;s development. One of its key projects is the <strong className="text-foreground">50 Schools Journey to Purpose</strong>, an outreach initiative focused on taking purpose discovery, mentorship, leadership, character development, career guidance and learning resources directly to students in schools.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                The project has so far reached <strong className="text-foreground">2,867 students across 16+ schools</strong>, alongside the distribution of writing materials, mathematical sets and other learning resources.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn direction="right">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
              <Image
                src="/impact/intro-session.jpg"
                alt="BLOOM Initiative Session"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-sm text-white/80">
                A photo session after one of the 50 Schools Journey to Purpose Initiative sessions.
              </p>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* About Foundation */}
      <div className="relative py-16 lg:py-24">
        <Image
          src="/background/svg-wavy-background.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-left"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn direction="up">
            <div className="text-center">
              <p className="eyebrow text-[#0099cc]">About Us</p>
              <h2 className="mt-4 font-serif text-3xl font-bold text-[#1a1a2e] sm:text-4xl">
                Johnnie Boy&apos;s Foundation
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-700">
                A youth-focused development organization dedicated to helping students, young people especially boys and professionals to discover purpose, build character and acquire practical skills for academic, professional and personal excellence.
              </p>
            </div>
          </AnimateIn>

          {/* Vision & Mission */}
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            <AnimateIn delay={0} direction="up">
              <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0099cc]/10">
                  <Target className="h-6 w-6 text-[#0099cc]" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold text-[#1a1a2e]">Our Vision</h3>
                <p className="mt-3 text-gray-600">
                  A generation of young people who are purpose-driven, skilled, and equipped to transform their communities and nation.
                </p>
              </div>
            </AnimateIn>
            <AnimateIn delay={100} direction="up">
              <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0099cc]/10">
                  <Heart className="h-6 w-6 text-[#0099cc]" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold text-[#1a1a2e]">Our Mission</h3>
                <p className="mt-3 text-gray-600">
                  To reach students in schools and communities with purpose discovery, mentorship, and practical skills training that prepares them for life beyond the classroom.
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* Core Values */}
          <div className="mt-16">
            <AnimateIn direction="up">
              <h3 className="text-center font-serif text-2xl font-bold text-[#1a1a2e]">Our Core Values</h3>
            </AnimateIn>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {coreValues.map((value, index) => (
                <AnimateIn key={value.title} delay={index * 50} direction="up">
                  <div className="rounded-xl bg-white/80 backdrop-blur-sm p-6 text-center shadow-sm">
                    <h4 className="font-serif font-bold text-[#1a1a2e]">{value.title}</h4>
                    <p className="mt-2 text-sm text-gray-600">{value.description}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>

          {/* Areas of Impact */}
          <div className="mt-16">
            <AnimateIn direction="up">
              <h3 className="text-center font-serif text-2xl font-bold text-[#1a1a2e]">Our Areas of Impact</h3>
            </AnimateIn>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {areasOfImpact.map((area, index) => (
                <AnimateIn key={area} delay={index * 50} direction="up">
                  <span className="rounded-full bg-[#0099cc]/10 px-4 py-2 text-sm font-semibold text-[#000000]">
                    {area}
                  </span>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimateIn direction="left">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
              <Image
                src="/impact/story.jpg"
                alt="Our Story"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </AnimateIn>
          <AnimateIn direction="right">
            <div>
              <p className="eyebrow text-accent">Our Story</p>
              <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                The Journey That Started With a Question
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                The 50 Schools Journey to Purpose Initiative began with a question that would not let us rest: <strong className="text-foreground">&quot;what if the greatest barrier holding students back was not intelligence, but a lack of exposure and direction?&quot;</strong>
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                We saw students who could recite formulas but had never been asked what they wanted their lives to stand for. We saw classrooms where potential leaders, entrepreneurs and innovators sat quietly, waiting for someone to notice them. That gap is what Johnnie Boy&apos;s Foundation set out to close.
              </p>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                What started as a conversation among a small group of passionate young volunteers has grown into a structured outreach reaching thousands of students across public and private schools in Kaduna State.
              </p>
              <blockquote className="mt-8 border-l-4 border-accent pl-6 italic text-muted-foreground">
                &quot;Every student we meet is a reminder of why this work matters — potential is everywhere; what is missing is exposure and a mentor who believes in them.&quot;
                <footer className="mt-2 text-sm font-semibold text-foreground not-italic">
                  — Israel Olabode Tope, Team Lead MindUpgrade
                </footer>
              </blockquote>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-primary py-16 text-primary-foreground lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn direction="up">
            <h2 className="text-center font-serif text-3xl font-bold sm:text-4xl">
              Our Impact So Far
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-primary-foreground/80">
              Through the 50 Schools Journey to Purpose Initiative, our team has reached deep into classrooms and school halls, delivering purpose discovery sessions, distributing learning materials, and mentoring students.
            </p>
          </AnimateIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {impactStats.map((stat, index) => (
              <AnimateIn key={stat.label} delay={index * 100} direction="up">
                <div className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm">
                  <p className="font-serif text-4xl font-bold text-accent">{stat.number}</p>
                  <p className="mt-2 text-lg text-primary-foreground/80">{stat.label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Mentorship Topics */}
          <div className="mt-16">
            <AnimateIn direction="up">
              <h3 className="text-center font-serif text-2xl font-bold">
                Mentorship Sessions Delivered On
              </h3>
            </AnimateIn>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {mentorshipTopics.map((topic, index) => (
                <AnimateIn key={topic} delay={index * 50} direction="up">
                  <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                    <CheckCircle2 size={16} className="text-accent" />
                    {topic}
                  </span>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <AnimateIn direction="up">
          <h2 className="text-center font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Captured Moments
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
            Glimpses from our outreach sessions across schools in Kaduna State.
          </p>
        </AnimateIn>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <AnimateIn key={image.src} delay={index * 50} direction="up">
              <div className="group relative aspect-square w-full overflow-hidden rounded-2xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 text-sm text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {image.alt}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>

      {/* Partners */}
      <div className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <AnimateIn direction="up">
            <h2 className="text-center font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Our Partners
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
              The 50 Schools Journey to Purpose Initiative has been made possible through the support and collaboration of like-minded organisations who believe in investing in young people.
            </p>
          </AnimateIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner, index) => (
              <AnimateIn key={partner.name} delay={index * 100} direction="up">
                <div className="rounded-2xl bg-card p-6 shadow-sm text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold text-foreground">{partner.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{partner.role}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn direction="up">
            <p className="mt-8 text-center text-muted-foreground">
              We deeply value these partnerships and warmly welcome additional organizations and individuals who share our vision to join us as we expand this work.
            </p>
          </AnimateIn>
        </div>
      </div>

      {/* Future Skills Program */}
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimateIn direction="left">
            <div>
              <p className="eyebrow text-accent">New Program</p>
              <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
                Future Skills & Mentorship Program
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Building on the momentum of the 50 Schools Journey to Purpose Initiative, Johnnie Boy&apos;s Foundation and its partners launched the Future Skills & Mentorship Programme — a structured, completely <strong className="text-foreground">FREE training programme</strong> for selected students who have been reached through our school outreaches.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-accent/10 p-4">
                <Calendar className="h-6 w-6 text-accent" />
                <div>
                  <p className="font-semibold text-foreground">August 2026</p>
                  <p className="text-sm text-muted-foreground">Twice weekly — Tuesday & Thursday, 2 hours per session</p>
                </div>
              </div>
            </div>
          </AnimateIn>
          <AnimateIn direction="right">
            <div className="grid gap-4 sm:grid-cols-2">
              {trainingAreas.map((area, index) => (
                <div key={area} className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  <span className="text-sm font-semibold text-foreground">{area}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>

        {/* Program Benefits */}
        <div className="mt-16">
          <AnimateIn direction="up">
            <h3 className="text-center font-serif text-2xl font-bold text-foreground">
              What Participants Receive
            </h3>
          </AnimateIn>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {programBenefits.map((benefit, index) => (
              <AnimateIn key={benefit} delay={index * 50} direction="up">
                <div className="flex items-start gap-3 rounded-xl bg-card p-6 shadow-sm">
                  <Award className="h-6 w-6 text-accent shrink-0" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>

        {/* Training Gallery */}
        <div className="mt-16">
          <AnimateIn direction="up">
            <h3 className="text-center font-serif text-2xl font-bold text-foreground">
              Skills Training in Action
            </h3>
          </AnimateIn>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <AnimateIn delay={0} direction="up">
              <div className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/impact/data-analysis.jpg"
                  alt="Students learning Data Analysis"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <p className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 p-4 text-sm text-white">
                  Students learning Data Analysis
                </p>
              </div>
            </AnimateIn>
            <AnimateIn delay={100} direction="up">
              <div className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/impact/graphics-design.jpg"
                  alt="Students learning Graphics Design"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <p className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 p-4 text-sm text-white">
                  Students learning Graphics Design
                </p>
              </div>
            </AnimateIn>
            <AnimateIn delay={200} direction="up">
              <div className="group relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/impact/content-creation.jpg"
                  alt="Students learning Content Creation"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <p className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 p-4 text-sm text-white">
                  Students learning Content Creation & Social Media Management
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <AnimateIn direction="left">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
                <Image
                  src="/impact/why-it-matters.jpg"
                  alt="Facilitator leading a mentorship session"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </AnimateIn>
            <AnimateIn direction="right">
              <div>
                <p className=" text-accent">Why This Matters</p>
                <h2 className="mt-4 font-serif text-3xl font-bold text-accent sm:text-4xl">
                  Investing in One Student Changes a Household
                </h2>
                <p className="mt-6 text-lg leading-8 text-primary-foreground">
                  For many students in the communities we serve, opportunities like the Future Skills & Mentorship Program simply do not exist. Without exposure to AI, digital skills, entrepreneurship or structured mentorship, countless capable young people will finish school without ever discovering what they are truly capable of.
                </p>
                <p className="mt-4 text-lg leading-8 text-primary-foreground">
                  Investing in one student does not just change that student — it changes a household. A young person equipped with purpose, skills and confidence becomes a source of income, guidance and hope for their family. Multiply that across hundreds of students and you begin to see how mentoring young people today quietly builds the stronger, more resilient communities of tomorrow.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* Support So Far */}
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <AnimateIn direction="up">
          <h2 className="text-center font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Your Support So Far
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
            Every programme Johnnie Boy&apos;s Foundation runs is offered completely free to students. This is only possible because of partners who believe in investing in young people.
          </p>
        </AnimateIn>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supportProvided.map((item, index) => (
            <AnimateIn key={item} delay={index * 50} direction="up">
              <div className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>

      {/* Closing CTA */}
      <div className="bg-primary py-16 text-primary-foreground lg:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <AnimateIn direction="up">
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">
              Together, We Can Raise a Generation of Purpose-Driven Leaders
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
              Innovators, entrepreneurs, and problem-solvers who will transform our communities and our nation. Join us in making a lasting impact.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/get-involved"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-accent-foreground transition hover:bg-accent/90"
              >
                Partner With Us
                <ArrowRight size={18} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-8 py-3.5 text-sm font-bold text-primary-foreground transition hover:bg-primary-foreground/10"
              >
                Contact Us
              </a>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

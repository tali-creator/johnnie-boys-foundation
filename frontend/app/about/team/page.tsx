"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Mail, ExternalLink, Globe } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import { teamMembers } from "@/components/sections/team-data";

export default function OurTeamPage() {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  return (
    <section id="team" className="min-h-screen bg-background">
      <div className="relative overflow-hidden min-h-[90vh] bg-primary py-24 text-primary-foreground lg:py-32">
        <Image
          src="/hero.jpeg"
          alt="Our Team"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 text-center lg:px-8">
          <AnimateIn direction="up">
            <p className="eyebrow text-accent">Who we are</p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Board of Trustees
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80">
              The passionate individuals behind Johnnie Boy&apos;s Foundation,
              dedicated to empowering boys and young men across northern Nigeria.
            </p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-background [clip-path:ellipse(70%_100%_at_50%_100%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <AnimateIn key={member.id} delay={index * 100} direction="up">
              <button
                onClick={() => setSelectedMember(member)}
                className="group w-full text-left"
              >
                <div className="relative overflow-hidden rounded-2xl bg-card transition hover:shadow-xl">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={`https://ui-avatars.com/api/?name=${member.name.replace(/ /g, "+")}&size=400&background=1a1a2e&color=00e676&bold=true&format=svg`}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-4 text-center opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-accent-foreground">
                        View Profile
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-bold text-foreground">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-accent">
                      {member.role}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-2">
                      {member.shortBio}
                    </p>
                  </div>
                </div>
              </button>
            </AnimateIn>
          ))}
        </div>
      </div>

      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition hover:bg-background"
            >
              <X size={20} />
            </button>
            <div className="relative h-64 w-full overflow-hidden">
              <Image
                src={`https://ui-avatars.com/api/?name=${selectedMember.name.replace(/ /g, "+")}&size=800&background=1a1a2e&color=00e676&bold=true&format=svg`}
                alt={selectedMember.name}
                fill
                sizes="100%"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
            <div className="relative -mt-16 px-8 pb-8">
              <h2 className="font-serif text-3xl font-bold text-foreground">
                {selectedMember.name}
              </h2>
              <p className="mt-1 text-lg font-semibold text-accent">
                {selectedMember.role}
              </p>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                {selectedMember.fullBio}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition hover:bg-accent hover:text-accent-foreground"
                >
                  <Mail size={18} />
                </a>
                <a
                  href={selectedMember.social.linkedin}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition hover:bg-accent hover:text-accent-foreground"
                >
                  <ExternalLink size={18} />
                </a>
                <a
                  href={selectedMember.social.twitter}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition hover:bg-accent hover:text-accent-foreground"
                >
                  <Globe size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

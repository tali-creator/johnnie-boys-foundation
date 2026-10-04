"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";

export const dynamic = "force-dynamic";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Initiative {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  status: "ACTIVE" | "FUNDRAISING" | "UPCOMING" | "COMPLETED";
  heroImage: string | null;
  stats: { label: string; value: string }[];
  partners: { name: string; logoUrl?: string | null }[];
  progressCurrent: number | null;
  progressGoal: number | null;
  progressLabel: string | null;
  order: number;
  createdAt: string;
}

const statusConfig: Record<
  Initiative["status"],
  { label: string; bg: string; text: string }
> = {
  ACTIVE: { label: "Active", bg: "bg-emerald-100", text: "text-emerald-700" },
  FUNDRAISING: {
    label: "Fundraising",
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  UPCOMING: { label: "Upcoming", bg: "bg-blue-100", text: "text-blue-700" },
  COMPLETED: {
    label: "Completed",
    bg: "bg-gray-100",
    text: "text-gray-600",
  },
};

export default function InitiativesPage() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/initiatives`)
      .then((r) => r.json())
      .then((data) => {
        setInitiatives(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="initiatives" className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden min-h-[60vh] bg-primary py-24 text-primary-foreground lg:py-32">
        <Image
          src="/hero.jpeg"
          alt="Our Initiatives"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 text-center lg:px-8">
          <AnimateIn direction="up">
            <p className="eyebrow text-accent">What we do</p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Our Initiatives
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80">
              From education outreach to building creative spaces — discover
              the projects shaping the futures of young people across Nigeria.
            </p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-background [clip-path:ellipse(70%_100%_at_50%_100%)]" />
      </div>

      {/* Initiatives Grid */}
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : initiatives.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">
              No initiatives found.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((initiative, index) => {
              const status = statusConfig[initiative.status];
              return (
                <AnimateIn
                  key={initiative.id}
                  delay={index * 100}
                  direction="up"
                >
                  <Link href={`/initiatives/${initiative.slug}`} className="group block h-full">
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-card transition hover:shadow-xl">
                      {/* Image */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        {initiative.heroImage ? (
                          <Image
                            src={initiative.heroImage}
                            alt={initiative.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                            <span className="font-serif text-4xl font-bold text-primary/20">
                              {initiative.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        {/* Status Badge */}
                        <div className="absolute left-4 top-4">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${status.bg} ${status.text}`}
                          >
                            {status.label}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col p-6">
                        <h2 className="font-serif text-2xl font-bold text-foreground">
                          {initiative.name}
                        </h2>
                        <p className="mt-1 text-sm font-semibold text-accent">
                          {initiative.tagline}
                        </p>
                        <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground line-clamp-3">
                          {initiative.summary}
                        </p>

                        {/* Stats preview */}
                        {initiative.stats.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-3">
                            {initiative.stats.slice(0, 3).map((stat) => (
                              <div
                                key={stat.label}
                                className="text-center"
                              >
                                <p className="text-lg font-bold text-foreground">
                                  {stat.value}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {stat.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Progress bar for fundraising */}
                        {initiative.status === "FUNDRAISING" &&
                          initiative.progressGoal != null &&
                          initiative.progressGoal > 0 && (
                            <div className="mt-4">
                              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-accent transition-all"
                                  style={{
                                    width: `${Math.min(
                                      ((initiative.progressCurrent || 0) /
                                        initiative.progressGoal) *
                                        100,
                                      100
                                    )}%`,
                                  }}
                                />
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {initiative.progressLabel || "Progress"}
                              </p>
                            </div>
                          )}

                        {/* CTA */}
                        <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                          Learn more
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateIn>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

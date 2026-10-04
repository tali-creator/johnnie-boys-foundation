import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { BlockRenderer } from "@/components/block-renderer";

const API =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

interface Initiative {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  status: "ACTIVE" | "FUNDRAISING" | "UPCOMING" | "COMPLETED";
  heroImage: string | null;
  stats: { label: string; value: string }[];
  content: unknown[];
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

async function getInitiative(slug: string): Promise<Initiative | null> {
  try {
    const res = await fetch(`${API}/api/initiatives/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const initiative = await getInitiative(slug);
  if (!initiative) return { title: "Initiative Not Found" };
  return {
    title: initiative.name,
    description: initiative.tagline || initiative.summary,
  };
}

export default async function InitiativeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const initiative = await getInitiative(slug);

  if (!initiative) {
    notFound();
  }

  const status = statusConfig[initiative.status];
  const showProgress =
    initiative.status === "FUNDRAISING" &&
    initiative.progressGoal != null &&
    initiative.progressGoal > 0;

  return (
    <section id="initiative-detail" className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden min-h-[60vh] bg-primary py-24 text-primary-foreground lg:py-32">
        {initiative.heroImage ? (
          <Image
            src={initiative.heroImage}
            alt={initiative.name}
            fill
            sizes="100vw"
            priority
            className="object-cover object-center opacity-30"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 text-center lg:px-8">
          <Link
            href="/initiatives"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-foreground/60 hover:text-primary-foreground transition mb-6"
          >
            <ArrowLeft size={16} />
            All Initiatives
          </Link>
          <div className="mt-2">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${status.bg} ${status.text}`}
            >
              {status.label}
            </span>
          </div>
          <h1 className="mt-4 font-serif text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {initiative.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-primary-foreground/80">
            {initiative.tagline}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-background [clip-path:ellipse(70%_100%_at_50%_100%)]" />
      </div>

      <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-24">
        {/* Progress Bar (Fundraising only) */}
        {showProgress && (
          <div className="mb-12 rounded-2xl bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">
                {initiative.progressLabel || "Progress"}
              </span>
              <span className="text-sm font-bold text-accent">
                {initiative.progressCurrent?.toLocaleString() ?? 0} /{" "}
                {initiative.progressGoal?.toLocaleString()}
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{
                  width: `${Math.min(
                    ((initiative.progressCurrent ?? 0) /
                      initiative.progressGoal!) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Stats Row */}
        {initiative.stats.length > 0 && (
          <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {initiative.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-card p-4 text-center shadow-sm"
              >
                <p className="font-serif text-2xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Content Blocks */}
        <div className="prose-custom">
          <BlockRenderer blocks={initiative.content as any} />
        </div>

        {/* Partners */}
        {initiative.partners.length > 0 && (
          <div className="mt-16 rounded-2xl bg-card p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-5 w-5 text-accent" />
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Our Partners
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {initiative.partners.map((partner) => (
                <div
                  key={partner.name}
                  className="flex items-center gap-2 rounded-full bg-muted/50 px-4 py-2"
                >
                  {partner.logoUrl && (
                    <Image
                      src={partner.logoUrl}
                      alt={partner.name}
                      width={24}
                      height={24}
                      className="rounded-full object-contain"
                    />
                  )}
                  <span className="text-sm font-semibold text-foreground">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/get-involved"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-accent-foreground transition hover:bg-accent/90"
          >
            Get Involved
          </Link>
        </div>
      </div>
    </section>
  );
}

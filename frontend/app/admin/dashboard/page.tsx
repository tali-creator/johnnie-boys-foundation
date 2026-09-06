"use client";

import { useState, useEffect } from "react";
import { useAdminFetch } from "@/lib/admin-auth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  Eye,
  TrendingUp,
  Globe,
  Calendar,
  Clock,
} from "lucide-react";

interface Overview {
  totalVisitors: number;
  totalPageViews: number;
  visitors24h: number;
  visitors7d: number;
  visitors30d: number;
  views24h: number;
  views7d: number;
  views30d: number;
}

interface PageStat {
  path: string;
  views: number;
}

interface TimelinePoint {
  date: string;
  views: number;
}

interface Referrer {
  referrer: string;
  visits: number;
}

export default function AdminDashboardPage() {
  const fetcher = useAdminFetch();
  const [overview, setOverview] = useState<Overview | null>(null);
  const [pages, setPages] = useState<PageStat[]>([]);
  const [timeline, setTimeline] = useState<TimelinePoint[]>([]);
  const [referrers, setReferrers] = useState<Referrer[]>([]);
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetcher("/api/admin/analytics/overview").then((r) => r.json()),
      fetcher("/api/admin/analytics/pages").then((r) => r.json()),
      fetcher(`/api/admin/analytics/timeline?range=${range}`).then((r) =>
        r.json()
      ),
      fetcher("/api/admin/analytics/referrers").then((r) => r.json()),
    ])
      .then(([ov, pg, tl, rf]) => {
        setOverview(ov);
        setPages(pg);
        setTimeline(tl);
        setReferrers(rf);
      })
      .finally(() => setLoading(false));
  }, [range, fetcher]);

  const statCards = overview
    ? [
        {
          label: "Total Visitors",
          value: overview.totalVisitors,
          icon: Users,
          color: "text-blue-600",
        },
        {
          label: "Total Page Views",
          value: overview.totalPageViews,
          icon: Eye,
          color: "text-accent",
        },
        {
          label: "Visitors (24h)",
          value: overview.visitors24h,
          icon: Clock,
          color: "text-green-600",
        },
        {
          label: "Visitors (7d)",
          value: overview.visitors7d,
          icon: Calendar,
          color: "text-amber-600",
        },
      ]
    : [];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Visitor analytics and site overview
        </p>
      </div>

      {/* Stat Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-muted-foreground">
                {card.label}
              </p>
              <card.icon size={18} className={card.color} />
            </div>
            <p className="mt-2 font-serif text-3xl font-bold">
              {loading ? "—" : card.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Timeline Chart */}
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold">Visitor Timeline</h2>
            <div className="flex gap-2">
              {(["7d", "30d"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                    range === r
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => v.slice(5)}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#00e676"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Pages */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-bold">Top Pages</h2>
          <div className="space-y-3">
            {loading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : pages.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data yet</p>
            ) : (
              pages.slice(0, 8).map((p, i) => (
                <div key={p.path} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-muted text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="truncate text-sm">{p.path}</span>
                  </div>
                  <span className="text-sm font-bold text-accent">
                    {p.views}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Referrers */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 font-serif text-lg font-bold">Top Referrers</h2>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : referrers.length === 0 ? (
          <p className="text-sm text-muted-foreground">No referrer data yet</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {referrers.map((r) => (
              <div
                key={r.referrer}
                className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-2"
              >
                <span className="truncate text-sm">{r.referrer}</span>
                <span className="ml-2 shrink-0 text-sm font-bold text-accent">
                  {r.visits}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

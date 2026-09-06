import { Request, Response } from "express";
import { prisma } from "../index";
import { getQueryParam } from "../utils/request";

function detectDeviceType(ua: string | undefined): string {
  if (!ua) return "desktop";
  if (/mobile|android|iphone|ipod/i.test(ua)) return "mobile";
  if (/tablet|ipad/i.test(ua)) return "tablet";
  return "desktop";
}

export async function trackPageView(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { path, referrer } = req.body;
    const userAgent = req.headers["user-agent"] || "";
    const deviceType = detectDeviceType(userAgent);

    // Get or set session cookie
    let sessionId = req.cookies?.jbf_session;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      res.cookie("jbf_session", sessionId, {
        maxAge: 30 * 60 * 1000, // 30 minutes
        httpOnly: true,
        sameSite: "lax",
      });
    }

    // Upsert session
    await prisma.visitorSession.upsert({
      where: { sessionId },
      update: {
        lastSeenAt: new Date(),
        pageViewCount: { increment: 1 },
      },
      create: {
        sessionId,
        pageViewCount: 1,
      },
    });

    // Log page view
    await prisma.pageView.create({
      data: {
        sessionId,
        path,
        referrer: referrer || null,
        userAgent,
        deviceType,
      },
    });

    res.json({ ok: true });
  } catch (error) {
    console.error("Track error:", error);
    res.json({ ok: true }); // Silent fail — don't break the frontend
  }
}

export async function analyticsOverview(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const now = new Date();
    const d24 = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const d7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const d30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [totalVisitors, totalPageViews, visitors24h, visitors7d, visitors30d, views24h, views7d, views30d] =
      await Promise.all([
        prisma.visitorSession.count(),
        prisma.pageView.count(),
        prisma.visitorSession.count({ where: { firstSeenAt: { gte: d24 } } }),
        prisma.visitorSession.count({ where: { firstSeenAt: { gte: d7 } } }),
        prisma.visitorSession.count({ where: { firstSeenAt: { gte: d30 } } }),
        prisma.pageView.count({ where: { createdAt: { gte: d24 } } }),
        prisma.pageView.count({ where: { createdAt: { gte: d7 } } }),
        prisma.pageView.count({ where: { createdAt: { gte: d30 } } }),
      ]);

    res.json({
      totalVisitors,
      totalPageViews,
      visitors24h,
      visitors7d,
      visitors30d,
      views24h,
      views7d,
      views30d,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
}

export async function analyticsPages(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const results = await prisma.pageView.groupBy({
      by: ["path"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 20,
    });

    res.json(
      results.map((r) => ({ path: r.path, views: r._count.id }))
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch page analytics" });
  }
}

export async function analyticsTimeline(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const range = (req.query.range as string) || "7d";
    const days = range === "30d" ? 30 : 7;
    const now = new Date();
    const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const views = await prisma.pageView.findMany({
      where: { createdAt: { gte: start } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    // Group by date
    const daily: Record<string, { date: string; views: number }> = {};
    for (let i = 0; i < days; i++) {
      const d = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().split("T")[0];
      daily[key] = { date: key, views: 0 };
    }

    for (const v of views) {
      const key = v.createdAt.toISOString().split("T")[0];
      if (daily[key]) daily[key].views++;
    }

    res.json(Object.values(daily));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch timeline" });
  }
}

export async function analyticsReferrers(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const results = await prisma.pageView.groupBy({
      by: ["referrer"],
      _count: { id: true },
      where: { referrer: { not: null } },
      orderBy: { _count: { id: "desc" } },
      take: 15,
    });

    res.json(
      results
        .filter((r) => r.referrer)
        .map((r) => ({ referrer: r.referrer, visits: r._count.id }))
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch referrers" });
  }
}

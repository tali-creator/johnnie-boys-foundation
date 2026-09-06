import { Request, Response } from "express";
import { prisma } from "../index";

export async function getSettings(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap = settings.reduce(
      (acc, s) => ({ ...acc, [s.key]: s.value }),
      {} as Record<string, string>
    );
    res.json(settingsMap);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
}

export async function updateSettings(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const updates = req.body;

    for (const [key, value] of Object.entries(updates)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: value as string },
        create: { key, value: value as string },
      });
    }

    res.json({ message: "Settings updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update settings" });
  }
}

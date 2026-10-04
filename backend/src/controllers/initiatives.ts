import { Request, Response } from "express";
import { prisma } from "../index";
import { getParam } from "../utils/request";
import { InitiativeStatus } from "@prisma/client";

export async function listInitiatives(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const initiatives = await prisma.initiative.findMany({
      orderBy: { order: "asc" },
      select: {
        id: true,
        slug: true,
        name: true,
        tagline: true,
        summary: true,
        status: true,
        heroImage: true,
        stats: true,
        partners: true,
        progressCurrent: true,
        progressGoal: true,
        progressLabel: true,
        order: true,
        createdAt: true,
      },
    });

    res.json(initiatives);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch initiatives" });
  }
}

export async function getInitiativeBySlug(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const slug = getParam(req, "slug");
    const initiative = await prisma.initiative.findUnique({
      where: { slug },
    });

    if (!initiative) {
      res.status(404).json({ error: "Initiative not found" });
      return;
    }

    res.json(initiative);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch initiative" });
  }
}

export async function createInitiative(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const initiative = await prisma.initiative.create({
      data: req.body,
    });

    res.status(201).json(initiative);
  } catch (error) {
    res.status(500).json({ error: "Failed to create initiative" });
  }
}

export async function updateInitiative(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = getParam(req, "id");
    const initiative = await prisma.initiative.update({
      where: { id },
      data: req.body,
    });
    res.json(initiative);
  } catch (error) {
    res.status(500).json({ error: "Failed to update initiative" });
  }
}

export async function deleteInitiative(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = getParam(req, "id");
    await prisma.initiative.delete({ where: { id } });
    res.json({ message: "Initiative deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete initiative" });
  }
}

import { Request, Response } from "express";
import { prisma } from "../index";
import { getParam } from "../utils/request";

export async function listPrograms(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch programs" });
  }
}

export async function getProgramBySlug(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const slug = getParam(req, "slug");
    const program = await prisma.program.findUnique({
      where: { slug },
    });
    if (!program) {
      res.status(404).json({ error: "Program not found" });
      return;
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch program" });
  }
}

export async function createProgram(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { title, ...data } = req.body;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const program = await prisma.program.create({
      data: { ...data, title, slug },
    });
    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ error: "Failed to create program" });
  }
}

export async function updateProgram(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = getParam(req, "id");
    const program = await prisma.program.update({
      where: { id },
      data: req.body,
    });
    res.json(program);
  } catch (error) {
    res.status(500).json({ error: "Failed to update program" });
  }
}

export async function deleteProgram(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = getParam(req, "id");
    await prisma.program.delete({ where: { id } });
    res.json({ message: "Program deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete program" });
  }
}

import { Request, Response } from "express";
import { prisma } from "../index";
import { getParam } from "../utils/request";

export async function listTrustees(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const trustees = await prisma.trustee.findMany({
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        role: true,
        photoUrl: true,
      },
    });
    res.json(trustees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trustees" });
  }
}

export async function createTrustee(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const trustee = await prisma.trustee.create({ data: req.body });
    res.status(201).json(trustee);
  } catch (error) {
    res.status(500).json({ error: "Failed to create trustee" });
  }
}

export async function updateTrustee(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = getParam(req, "id");
    const trustee = await prisma.trustee.update({
      where: { id },
      data: req.body,
    });
    res.json(trustee);
  } catch (error) {
    res.status(500).json({ error: "Failed to update trustee" });
  }
}

export async function deleteTrustee(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = getParam(req, "id");
    await prisma.trustee.delete({ where: { id } });
    res.json({ message: "Trustee deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete trustee" });
  }
}

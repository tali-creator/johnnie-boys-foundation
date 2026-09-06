import { Request, Response } from "express";
import { prisma } from "../index";
import { getParam } from "../utils/request";

export async function listTeam(req: Request, res: Response): Promise<void> {
  try {
    const members = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
}

export async function getTeamMember(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = getParam(req, "id");
    const member = await prisma.teamMember.findUnique({
      where: { id },
    });
    if (!member) {
      res.status(404).json({ error: "Team member not found" });
      return;
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team member" });
  }
}

export async function createTeamMember(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const member = await prisma.teamMember.create({ data: req.body });
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: "Failed to create team member" });
  }
}

export async function updateTeamMember(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = getParam(req, "id");
    const member = await prisma.teamMember.update({
      where: { id },
      data: req.body,
    });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: "Failed to update team member" });
  }
}

export async function deleteTeamMember(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = getParam(req, "id");
    await prisma.teamMember.delete({ where: { id } });
    res.json({ message: "Team member deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete team member" });
  }
}

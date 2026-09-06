import { Request, Response } from "express";
import { prisma } from "../index";
import { getParam, getQueryParam } from "../utils/request";
import { SubmissionStatus } from "@prisma/client";

export async function submitVolunteer(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const application = await prisma.volunteerApplication.create({
      data: req.body,
    });

    res.status(201).json({
      message: "Your volunteer application has been submitted.",
      id: application.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit application" });
  }
}

export async function listVolunteers(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const status = getQueryParam(req, "status");
    const where = status
      ? { status: status as SubmissionStatus }
      : {};

    const applications = await prisma.volunteerApplication.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
}

export async function updateVolunteerStatus(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = getParam(req, "id");
    const application = await prisma.volunteerApplication.update({
      where: { id },
      data: { status: req.body.status as SubmissionStatus },
    });
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: "Failed to update application" });
  }
}

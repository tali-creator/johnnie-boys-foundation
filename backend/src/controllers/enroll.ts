import { Request, Response } from "express";
import { prisma } from "../index";
import { getParam, getQueryParam } from "../utils/request";
import { SubmissionStatus } from "@prisma/client";

export async function submitEnrollment(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const enrollment = await prisma.enrollmentRequest.create({
      data: req.body,
    });

    res.status(201).json({
      message: "Enrollment request submitted successfully.",
      id: enrollment.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit enrollment" });
  }
}

export async function listEnrollments(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const status = getQueryParam(req, "status");
    const where = status
      ? { status: status as SubmissionStatus }
      : {};

    const enrollments = await prisma.enrollmentRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch enrollments" });
  }
}

export async function updateEnrollmentStatus(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = getParam(req, "id");
    const enrollment = await prisma.enrollmentRequest.update({
      where: { id },
      data: { status: req.body.status as SubmissionStatus },
    });
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update enrollment" });
  }
}

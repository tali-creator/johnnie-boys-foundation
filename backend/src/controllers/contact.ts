import { Request, Response } from "express";
import { prisma } from "../index";
import { getParam, getQueryParam } from "../utils/request";
import {
  sendEmail,
  contactNotificationEmail,
  autoReplyEmail,
} from "../services/email";
import { InquiryType, SubmissionStatus } from "@prisma/client";

export async function submitContact(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, email, phone, inquiryType, subject, message } = req.body;

    const submission = await prisma.contactSubmission.create({
      data: { name, email, phone, inquiryType, subject, message },
    });

    await sendEmail({
      to: process.env.SMTP_USER || "admin@johnnieboysfoundation.org",
      subject: `[JBF Contact] ${subject}`,
      html: contactNotificationEmail({
        name,
        email,
        phone,
        inquiryType,
        subject,
        message,
      }),
      replyTo: email,
    });

    await sendEmail({
      to: email,
      subject: "Thank you for contacting Johnnie Boy's Foundation",
      html: autoReplyEmail(name),
    });

    res.status(201).json({
      message: "Your message has been received. We'll get back to you soon.",
      id: submission.id,
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
}

export async function listSubmissions(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const status = getQueryParam(req, "status");
    const where = status
      ? { status: status as SubmissionStatus }
      : {};

    const submissions = await prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
}

export async function updateSubmissionStatus(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = getParam(req, "id");
    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: { status: req.body.status as SubmissionStatus },
    });
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: "Failed to update submission" });
  }
}

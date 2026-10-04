import { Router } from "express";
import { prisma } from "../index";
import { authenticateAdmin } from "../middleware/auth";

const router = Router();

// List all submissions (aggregated from contact, volunteer, enroll, donations)
router.get("/", authenticateAdmin, async (req, res) => {
  try {
    const type = req.query.type as string | undefined;
    const submissions: any[] = [];

    // Contact submissions
    if (!type || type === "CONTACT") {
      const contacts = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
      });
      contacts.forEach((c) =>
        submissions.push({
          id: c.id,
          type: "CONTACT",
          data: {
            name: c.name,
            email: c.email,
            phone: c.phone,
            subject: c.subject,
            message: c.message,
            inquiryType: c.inquiryType,
          },
          status: c.status,
          createdAt: c.createdAt,
        })
      );
    }

    // Volunteer applications
    if (!type || type === "VOLUNTEER") {
      const volunteers = await prisma.volunteerApplication.findMany({
        orderBy: { createdAt: "desc" },
      });
      volunteers.forEach((v) =>
        submissions.push({
          id: v.id,
          type: "VOLUNTEER",
          data: {
            name: v.name,
            email: v.email,
            phone: v.phone,
            areaOfInterest: v.areaOfInterest,
            availability: v.availability,
            message: v.message,
          },
          status: v.status,
          createdAt: v.createdAt,
        })
      );
    }

    // Enrollment requests
    if (!type || type === "ENROLL") {
      const enrollments = await prisma.enrollmentRequest.findMany({
        orderBy: { createdAt: "desc" },
      });
      enrollments.forEach((e) =>
        submissions.push({
          id: e.id,
          type: "ENROLL",
          data: {
            boyName: e.boyName,
            guardianName: e.guardianName,
            guardianContact: e.guardianContact,
            age: e.age,
            programInterest: e.programInterest,
            message: e.message,
          },
          status: e.status,
          createdAt: e.createdAt,
        })
      );
    }

    // Donations
    if (!type || type === "DONATION") {
      const donations = await prisma.donation.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          donorName: true,
          email: true,
          amount: true,
          currency: true,
          status: true,
          createdAt: true,
        },
      });
      donations.forEach((d) =>
        submissions.push({
          id: d.id,
          type: "DONATION",
          data: {
            donorName: d.donorName,
            email: d.email,
            amount: d.amount,
            currency: d.currency,
          },
          status: d.status,
          createdAt: d.createdAt,
        })
      );
    }

    // Sort all by date descending
    submissions.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    res.json(submissions);
  } catch (error) {
    console.error("Submissions fetch error:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

// Mark submission as read
router.patch("/:type/:id/read", authenticateAdmin, async (req, res) => {
  try {
    const type = String(req.params.type);
    const id = String(req.params.id);

    switch (type) {
      case "CONTACT":
        await prisma.contactSubmission.update({
          where: { id },
          data: { status: "READ" },
        });
        break;
      case "VOLUNTEER":
        await prisma.volunteerApplication.update({
          where: { id },
          data: { status: "READ" },
        });
        break;
      case "ENROLL":
        await prisma.enrollmentRequest.update({
          where: { id },
          data: { status: "READ" },
        });
        break;
      default:
        res.status(400).json({ error: "Invalid submission type" });
        return;
    }

    res.json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update submission" });
  }
});

// Delete submission
router.delete("/:type/:id", authenticateAdmin, async (req, res) => {
  try {
    const type = String(req.params.type);
    const id = String(req.params.id);

    switch (type) {
      case "CONTACT":
        await prisma.contactSubmission.delete({ where: { id } });
        break;
      case "VOLUNTEER":
        await prisma.volunteerApplication.delete({ where: { id } });
        break;
      case "ENROLL":
        await prisma.enrollmentRequest.delete({ where: { id } });
        break;
      case "DONATION":
        await prisma.donation.delete({ where: { id } });
        break;
      default:
        res.status(400).json({ error: "Invalid submission type" });
        return;
    }

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete submission" });
  }
});

export default router;

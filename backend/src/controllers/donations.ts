import { Request, Response } from "express";
import { prisma } from "../index";
import { getParam, getQueryParam } from "../utils/request";
import {
  initializePayment,
  verifyPayment,
  generateReference,
} from "../services/payment";
import { PaymentStatus } from "@prisma/client";

export async function initializeDonation(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { donorName, email, amount, currency } = req.body;
    const reference = generateReference();

    const donation = await prisma.donation.create({
      data: {
        donorName,
        email,
        amount,
        currency: currency || "NGN",
        paystackReference: reference,
        status: "PENDING",
      },
    });

    const callbackUrl = `${process.env.FRONTEND_URL}/donate/verify?reference=${reference}`;

    const paystackResponse = await initializePayment({
      email,
      amount: Math.round(amount * 100),
      currency: currency || "NGN",
      reference,
      callback_url: callbackUrl,
      metadata: {
        donationId: donation.id,
        donorName: donorName || "Anonymous",
      },
    });

    res.status(201).json({
      authorization_url: paystackResponse.data.authorization_url,
      reference,
      donation_id: donation.id,
    });
  } catch (error) {
    console.error("Donation init error:", error);
    res.status(500).json({ error: "Failed to initialize donation" });
  }
}

export async function verifyDonation(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const reference = getParam(req, "reference");

    const paystackResponse = await verifyPayment(reference);

    if (paystackResponse.data.status === "success") {
      const donation = await prisma.donation.update({
        where: { paystackReference: reference },
        data: {
          status: "SUCCESS",
          metadata: paystackResponse.data as any,
        },
      });

      res.json({ status: "success", donation });
    } else {
      await prisma.donation.update({
        where: { paystackReference: reference },
        data: { status: "FAILED" },
      });

      res.json({ status: "failed" });
    }
  } catch (error) {
    console.error("Donation verify error:", error);
    res.status(500).json({ error: "Failed to verify donation" });
  }
}

export async function handleWebhook(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const event = req.body;

    if (event.event === "charge.success") {
      const { reference } = event.data;

      await prisma.donation.update({
        where: { paystackReference: reference },
        data: {
          status: "SUCCESS",
          metadata: event.data as any,
        },
      });

      console.log(`💰 Donation confirmed: ${reference}`);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook error:", error);
    res.sendStatus(200);
  }
}

export async function listDonations(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const status = getQueryParam(req, "status");
    const where = status
      ? { status: status as PaymentStatus }
      : {};

    const donations = await prisma.donation.findMany({
      where,
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

    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
}

import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  inquiryType: z.enum(["PROGRAM", "VOLUNTEER", "GENERAL"]).default("GENERAL"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const volunteerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  areaOfInterest: z.string().optional(),
  availability: z.string().optional(),
  message: z.string().optional(),
});

export const enrollmentSchema = z.object({
  boyName: z.string().min(2, "Boy's name is required"),
  guardianName: z.string().min(2, "Guardian name is required"),
  guardianContact: z.string().min(5, "Guardian contact is required"),
  age: z.number().int().min(3).max(25).optional(),
  programInterest: z.string().optional(),
  message: z.string().optional(),
});

export const donationSchema = z.object({
  donorName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  amount: z.number().positive("Amount must be positive"),
  currency: z.string().default("NGN"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const postSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.enum(["EVENT", "PROGRAM", "ACTIVITY", "NEWS", "MILESTONE"]),
  coverImage: z.string().url(),
  youtubeId: z.string().optional(),
  author: z.string().default("Johnnie Boy's Foundation"),
  content: z.array(z.record(z.unknown())),
  publishedAt: z.string().datetime().optional(),
});

export const teamMemberSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  shortBio: z.string().min(10),
  fullBio: z.string().min(20),
  email: z.string().email(),
  photoUrl: z.string().url().optional(),
  socialLinks: z
    .object({
      instagram: z.string().url().optional(),
      facebook: z.string().url().optional(),
      twitter: z.string().url().optional(),
      linkedin: z.string().url().optional(),
    })
    .optional(),
  order: z.number().int().default(0),
});

export const trusteeSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  photoUrl: z.string().url().optional(),
  order: z.number().int().default(0),
});

export const programSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  badge: z.string().min(2),
  imageUrl: z.string().url(),
  fullCopy: z.string().min(20),
  order: z.number().int().default(0),
});

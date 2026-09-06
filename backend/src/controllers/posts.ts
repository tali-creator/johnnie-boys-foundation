import { Request, Response } from "express";
import { prisma } from "../index";
import { getParam, getQueryParam } from "../utils/request";
import { GalleryCategory } from "@prisma/client";

export async function listPosts(req: Request, res: Response): Promise<void> {
  try {
    const category = getQueryParam(req, "category");

    const where = category
      ? { category: category as GalleryCategory }
      : {};

    const posts = await prisma.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        category: true,
        coverImage: true,
        youtubeId: true,
        author: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

export async function getPostBySlug(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const slug = getParam(req, "slug");
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
}

export async function createPost(req: Request, res: Response): Promise<void> {
  try {
    const { title, ...data } = req.body;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const post = await prisma.post.create({
      data: { ...data, title, slug },
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
}

export async function updatePost(req: Request, res: Response): Promise<void> {
  try {
    const id = getParam(req, "id");
    const post = await prisma.post.update({
      where: { id },
      data: req.body,
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
}

export async function deletePost(req: Request, res: Response): Promise<void> {
  try {
    const id = getParam(req, "id");
    await prisma.post.delete({ where: { id } });
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
}

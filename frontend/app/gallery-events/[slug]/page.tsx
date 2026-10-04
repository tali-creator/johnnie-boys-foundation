"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User, ChevronRight, Loader2 } from "lucide-react";
import { BlockRenderer } from "@/components/block-renderer";
import { getGalleryItemBySlug, galleryItems as fallbackItems } from "@/components/sections/gallery-data";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type GalleryCategory = "EVENT" | "PROGRAM" | "ACTIVITY" | "NEWS" | "MILESTONE";

interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: GalleryCategory;
  coverImage: string;
  image?: string;
  youtubeId: string | null;
  author: string;
  publishedAt: string;
  date?: string;
  content: unknown[];
}

const categoryColors: Record<GalleryCategory, string> = {
  EVENT: "bg-accent/15 text-accent",
  PROGRAM: "bg-primary/10 text-primary",
  ACTIVITY: "bg-green-500/15 text-green-700",
  NEWS: "bg-blue-500/15 text-blue-700",
  MILESTONE: "bg-amber-500/15 text-amber-700",
};

export default function SinglePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/posts/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to local data
        const local = getGalleryItemBySlug(slug);
        if (local) {
          setPost({
            id: String(local.id),
            slug: local.slug,
            title: local.title,
            description: local.description,
            category: local.category.toUpperCase() as GalleryCategory,
            coverImage: local.image,
            image: local.image,
            youtubeId: (local as any).youtubeId || null,
            author: local.author || "Johnnie Boy's Foundation",
            publishedAt: local.date
              ? new Date(local.date).toISOString()
              : new Date().toISOString(),
            date: local.date,
            content: local.content as unknown[],
          });
        } else {
          setNotFound(true);
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Post not found
        </h1>
        <Link
          href="/gallery-events"
          className="text-sm font-semibold text-accent hover:underline"
        >
          Back to Gallery
        </Link>
      </div>
    );
  }

  const dateStr = post.date || new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section id="post" className="bg-background">
      {/* Hero Image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden lg:aspect-[3/1]">
        <Image
          src={post.coverImage || post.image || "/hero.jpeg"}
          alt={post.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-background [clip-path:ellipse(70%_100%_at_50%_100%)]" />
      </div>

      {/* Article Content */}
      <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8 lg:py-20">
        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition hover:text-accent">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/gallery-events" className="transition hover:text-accent">
            Gallery &amp; Events
          </Link>
          <ChevronRight size={14} />
          <span className="truncate text-foreground">{post.title}</span>
        </nav>

        {/* Meta */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${categoryColors[post.category]}`}
          >
            {post.category}
          </span>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar size={14} />
            {dateStr}
          </div>
          {post.author && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <User size={14} />
              {post.author}
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="mt-6 font-serif text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {/* Divider */}
        <div className="my-8 h-px bg-border" />

        {/* Dynamic Content Blocks */}
        <article>
          <BlockRenderer blocks={post.content as any} />
        </article>

        {/* Divider */}
        <div className="my-12 h-px bg-border" />

        {/* Share / Navigation */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Share this post
            </p>
            <div className="mt-3 flex gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://johnnieboysfoundation.org/gallery-events/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-4 py-2 text-xs font-bold transition hover:border-accent hover:text-accent"
              >
                Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://johnnieboysfoundation.org/gallery-events/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-4 py-2 text-xs font-bold transition hover:border-accent hover:text-accent"
              >
                Facebook
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.title} https://johnnieboysfoundation.org/gallery-events/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-4 py-2 text-xs font-bold transition hover:border-accent hover:text-accent"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <Link
            href="/gallery-events"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent transition hover:gap-3"
          >
            <ArrowRight size={16} className="rotate-180" />
            Back to Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}

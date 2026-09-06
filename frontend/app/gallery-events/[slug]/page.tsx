import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, User, ChevronRight } from "lucide-react";
import {
  galleryItems,
  getGalleryItemBySlug,
  type ContentBlock,
  type GalleryCategory,
} from "@/components/sections/gallery-data";

const categoryColors: Record<GalleryCategory, string> = {
  Event: "bg-accent/15 text-accent",
  Program: "bg-primary/10 text-primary",
  Activity: "bg-green-500/15 text-green-700",
  News: "bg-blue-500/15 text-blue-700",
  Milestone: "bg-amber-500/15 text-amber-700",
};

export function generateStaticParams() {
  return galleryItems.map((item) => ({ slug: item.slug }));
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      if (block.level === 2) {
        return (
          <h2 className="mt-10 font-serif text-2xl font-bold leading-snug sm:text-3xl">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 className="mt-8 font-serif text-xl font-bold leading-snug sm:text-2xl">
          {block.text}
        </h3>
      );

    case "paragraph":
      return (
        <p
          className={`mt-4 text-base leading-8 text-muted-foreground ${block.bold ? "font-bold text-foreground" : ""}`}
        >
          {block.text}
        </p>
      );

    case "image":
      const widthClass =
        block.width === "full"
          ? "w-full"
          : block.width === "two-thirds"
            ? "w-2/3"
            : block.width === "half"
              ? "w-1/2"
              : "w-full";
      return (
        <figure className={`mt-8 ${widthClass}`}>
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={block.src}
              alt={block.alt}
              width={1200}
              height={675}
              className="w-full object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm italic text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "blockquote":
      return (
        <blockquote className="mt-8 border-l-4 border-accent bg-accent/5 px-6 py-5">
          <p className="font-serif text-lg font-bold italic leading-relaxed text-foreground">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite className="mt-3 block text-sm font-semibold not-italic text-accent">
              — {block.attribution}
            </cite>
          )}
        </blockquote>
      );

    case "cta":
      return (
        <div className="mt-8">
          <Link
            href={block.href}
            className={`inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold transition ${
              block.style === "outline"
                ? "border border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                : "bg-accent text-accent-foreground hover:bg-accent/90"
            }`}
          >
            {block.text} <ArrowRight size={16} />
          </Link>
        </div>
      );

    case "youtube":
      return (
        <div className="mt-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${block.youtubeId}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      );

    case "spacer":
      const height =
        block.height === "lg"
          ? "h-16"
          : block.height === "md"
            ? "h-10"
            : "h-6";
      return <div className={height} />;

    default:
      return null;
  }
}

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getGalleryItemBySlug(slug);

  if (!post) {
    notFound();
  }

  const currentIndex = galleryItems.findIndex((item) => item.slug === slug);
  const nextPost = galleryItems[currentIndex + 1] || galleryItems[0];
  const prevPost =
    galleryItems[currentIndex - 1] ||
    galleryItems[galleryItems.length - 1];

  return (
    <section id="post" className="bg-background">
      {/* Hero Image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden lg:aspect-[3/1]">
        <Image
          src={post.image}
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
            {post.category.toUpperCase()}
          </span>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar size={14} />
            {post.date}
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
          {post.content.map((block, index) => (
            <ContentBlockRenderer key={index} block={block} />
          ))}
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

      {/* Previous / Next Post */}
      <div className="border-t border-border bg-muted/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px lg:px-8">
          <Link
            href={`/gallery-events/${prevPost.slug}`}
            className="group flex flex-col gap-2 p-8 transition hover:bg-background"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              ← Previous
            </span>
            <span className="font-serif text-lg font-bold leading-snug group-hover:text-accent">
              {prevPost.title}
            </span>
          </Link>
          <Link
            href={`/gallery-events/${nextPost.slug}`}
            className="group flex flex-col items-end gap-2 p-8 text-right transition hover:bg-background"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Next →
            </span>
            <span className="font-serif text-lg font-bold leading-snug group-hover:text-accent">
              {nextPost.title}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

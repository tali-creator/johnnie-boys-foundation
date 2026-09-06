"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { ContentBlock } from "@/types/blocks";

function extractYoutubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : url;
}

function Spacer({ height }: { height?: string }) {
  const h =
    height === "lg" ? "h-16" : height === "md" ? "h-10" : "h-6";
  return <div className={h} />;
}

function Divider({ style }: { style?: string }) {
  if (style === "dots") {
    return (
      <div className="flex items-center justify-center gap-2 py-8">
        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
      </div>
    );
  }
  if (style === "gradient") {
    return (
      <div className="my-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
    );
  }
  return <div className="my-8 h-px bg-border" />;
}

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            const align = block.alignment === "center" ? "text-center" : "";
            if (block.level === 1) {
              return (
                <h1
                  key={i}
                  className={`mt-10 font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl ${align}`}
                >
                  {block.text}
                </h1>
              );
            }
            if (block.level === 3) {
              return (
                <h3
                  key={i}
                  className={`mt-8 font-serif text-xl font-bold leading-snug sm:text-2xl ${align}`}
                >
                  {block.text}
                </h3>
              );
            }
            return (
              <h2
                key={i}
                className={`mt-10 font-serif text-2xl font-bold leading-snug sm:text-3xl ${align}`}
              >
                {block.text}
              </h2>
            );
          }

          case "paragraph":
            return (
              <p
                key={i}
                className={`mt-4 text-base leading-8 text-muted-foreground ${block.bold ? "font-bold text-foreground" : ""}`}
              >
                {block.text}
              </p>
            );

          case "image": {
            const widthClass =
              block.width === "two-thirds"
                ? "w-2/3"
                : block.width === "half"
                  ? "w-1/2"
                  : "w-full";
            const variant = block.variant || "full";

            return (
              <figure key={i} className={`mt-8 ${widthClass}`}>
                <div
                  className={`overflow-hidden ${
                    variant === "contained"
                      ? "rounded-2xl border border-border"
                      : "rounded-2xl"
                  }`}
                >
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={1200}
                    height={675}
                    className="w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
                {(variant === "with-caption" || block.caption) &&
                  block.caption && (
                    <figcaption className="mt-3 text-center text-sm italic text-muted-foreground">
                      {block.caption}
                    </figcaption>
                  )}
              </figure>
            );
          }

          case "image-gallery": {
            const variant = block.variant || "grid-3";
            const cols =
              variant === "grid-2"
                ? "grid-cols-2"
                : variant === "grid-3"
                  ? "grid-cols-3"
                  : "grid-cols-2";
            return (
              <div key={i} className={`mt-8 grid ${cols} gap-4`}>
                {block.images.map((img, j) => (
                  <div key={j} className="relative overflow-hidden rounded-xl">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={600}
                      height={400}
                      className="w-full object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    {img.caption && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            );
          }

          case "video-embed": {
            const videoId = extractYoutubeId(block.url);
            return (
              <div key={i} className="mt-8">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={block.title || "Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
              </div>
            );
          }

          case "youtube": {
            return (
              <div key={i} className="mt-8">
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
          }

          case "blockquote": {
            const variant = block.variant || "centered-large";
            if (variant === "sidebar-style") {
              return (
                <blockquote
                  key={i}
                  className="mt-8 rounded-2xl bg-muted/50 p-6 border-l-4 border-accent"
                >
                  <p className="font-serif text-lg italic leading-relaxed text-foreground">
                    &ldquo;{block.text}&rdquo;
                  </p>
                  {block.attribution && (
                    <cite className="mt-3 block text-sm font-semibold not-italic text-accent">
                      — {block.attribution}
                    </cite>
                  )}
                </blockquote>
              );
            }
            return (
              <blockquote
                key={i}
                className="mt-8 border-l-4 border-accent bg-accent/5 px-6 py-5"
              >
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
          }

          case "cta":
            return (
              <div key={i} className="mt-8">
                <Link
                  href={block.href}
                  className={`inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold transition ${
                    block.style === "outline"
                      ? "border border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                      : block.style === "secondary"
                        ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        : "bg-accent text-accent-foreground hover:bg-accent/90"
                  }`}
                >
                  {block.text}
                </Link>
              </div>
            );

          case "two-column":
            return (
              <div key={i} className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <BlockRenderer blocks={block.left} />
                </div>
                <div>
                  <BlockRenderer blocks={block.right} />
                </div>
              </div>
            );

          case "divider":
            return <Divider key={i} style={block.style} />;

          case "spacer":
            return <Spacer key={i} height={block.height} />;

          case "stats-highlight": {
            const variant = block.variant || "grid-3";
            const cols =
              variant === "grid-2"
                ? "grid-cols-2"
                : variant === "grid-4"
                  ? "grid-cols-2 sm:grid-cols-4"
                  : "grid-cols-2 sm:grid-cols-3";
            return (
              <div
                key={i}
                className={`mt-8 grid ${cols} gap-6 text-center`}
              >
                {block.stats.map((stat, j) => (
                  <div key={j} className="rounded-2xl bg-primary/5 p-6">
                    <p className="font-serif text-4xl font-bold text-accent">
                      {stat.number}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </>
  );
}

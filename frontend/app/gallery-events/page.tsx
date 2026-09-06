"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play,
  ArrowRight,
  Calendar,
  X,
} from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import {
  galleryItems,
  galleryCategories,
  type GalleryCategory,
  type GalleryItem,
} from "@/components/sections/gallery-data";

const categoryColors: Record<GalleryCategory, string> = {
  Event: "bg-accent/15 text-accent",
  Program: "bg-primary/10 text-primary",
  Activity: "bg-green-500/15 text-green-700",
  News: "bg-blue-500/15 text-blue-700",
  Milestone: "bg-amber-500/15 text-amber-700",
};

function VideoModal({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 transition hover:text-white"
        >
          <X size={28} />
        </button>
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-serif text-xl font-bold text-white">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-white/60">{item.date}</p>
        </div>
      </div>
    </div>
  );
}

function GalleryCard({
  item,
  onPlay,
}: {
  item: GalleryItem;
  onPlay: (item: GalleryItem) => void;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-xl">
      <Link href={`/gallery-events/${item.slug}`}>
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/40">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition group-hover:scale-110">
                <Play size={24} className="ml-1" fill="currentColor" />
              </div>
            </div>
          )}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            <Calendar size={12} />
            {item.date}
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-3 p-6">
        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${categoryColors[item.category]}`}
        >
          {item.category.toUpperCase()}
        </span>
        <h3 className="font-serif text-xl font-bold leading-snug">
          {item.title}
        </h3>
        <p className="text-sm leading-7 text-muted-foreground">
          {item.description}
        </p>
        <Link
          href={`/gallery-events/${item.slug}`}
          className="mt-2 inline-flex w-fit items-center gap-1 text-sm font-bold text-accent transition hover:gap-2"
        >
          Read More <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default function GalleryEventsPage() {
  const [activeCategory, setActiveCategory] = useState<
    GalleryCategory | "All"
  >("All");
  const [videoModal, setVideoModal] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const allFilters: (GalleryCategory | "All")[] = [
    "All",
    ...galleryCategories,
  ];

  return (
    <section id="gallery-events" className="bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden bg-primary py-24 text-primary-foreground lg:py-32">
        <Image
          src="/hero.jpeg"
          alt="Gallery & Events"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/30 via-primary/70 to-primary" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 text-center lg:px-8">
          <AnimateIn direction="up">
            <p className="eyebrow text-accent">Gallery &amp; Events</p>
            <h1 className="mt-4 font-serif text-5xl font-bold leading-[.98] tracking-tight sm:text-6xl lg:text-8xl">
              Moments that
              <br />
              <span className="text-accent">Shape Us</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-primary-foreground/80">
              Photos and videos from our events, programs, and community
              activities. Every image tells a story of impact.
            </p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-background [clip-path:ellipse(70%_100%_at_50%_100%)]" />
      </div>

      {/* Filters + Grid */}
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <AnimateIn direction="up">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {allFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveCategory(filter)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  activeCategory === filter
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={200} direction="up">
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                onPlay={setVideoModal}
              />
            ))}
          </div>
        </AnimateIn>

        {filteredItems.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-lg text-muted-foreground">
              No items found for this category.
            </p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {videoModal && (
        <VideoModal
          item={videoModal}
          onClose={() => setVideoModal(null)}
        />
      )}
    </section>
  );
}

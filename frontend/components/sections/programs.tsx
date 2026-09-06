"use client";

import { useState, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { programs } from "./data";
import { AnimateIn } from "@/components/animate-in";

export function Programs() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <section
      id="programs"
      className="py-24 lg:py-32"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            d="M0 800 C200 800 180 650 400 600 C620 550 580 400 800 350 C1020 300 980 150 1200 100 C1320 70 1380 50 1440 0 L1440 800 Z"
            style={{ fill: "#002455" }}
          />
        </svg>
      </div>
      <div className="mx-auto max-w-400 px-5 lg:px-15" style={{ position: "relative", zIndex: 1 }}>
        <AnimateIn direction="up">
          <div className="text-center">
            <p className="eyebrow">What we do</p>
            <h2 className="section-title">
              Building the conditions for{" "}
              <span className="text-accent">greatness.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Our programs are designed around the whole person, turning support
              into confidence and confidence into possibility.
            </p>
                        <a
              href="#programs"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-accent/90"
            >
              View All Programs
            </a>
          </div>
        </AnimateIn>

        <AnimateIn delay={200} direction="up">
          <div className="relative mt-14">
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute -left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition hover:bg-muted lg:-left-6"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 lg:px-15 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {programs.map((program) => (
                <article
                  key={program.slug}
                  className="group flex min-w-115 min-h-120 max-w-115 flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-lg snap-start"
                >
                  <Link href={`/${program.slug}`}>
                    <div className="relative h-68 overflow-hidden bg-muted">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="mb-3 w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                        {program.badge}
                      </span>
                      <h3 className="font-serif text-xl font-bold leading-tight">
                        {program.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {program.description}
                      </p>
                      <div className="mt-4">
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-accent transition group-hover:gap-2">
                          Read More <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute -right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition hover:bg-muted lg:-right-6"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

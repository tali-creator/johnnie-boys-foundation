"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  interval?: number;
  className?: string;
  imageClassName?: string;
}

export function ImageCarousel({
  images,
  interval = 3000,
  className = "",
  imageClassName = "",
}: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`Slide ${i + 1}`}
          fill
          sizes="300px"
          className={`object-cover transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          } ${imageClassName}`}
        />
      ))}
    </div>
  );
}

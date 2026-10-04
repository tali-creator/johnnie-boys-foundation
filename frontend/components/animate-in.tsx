"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  scrollDelay?: number;
}

export function AnimateIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 300,
  scrollDelay = 300,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const directionMap: Record<string, string> = {
      up: "translateY(40px)",
      down: "translateY(-40px)",
      left: "translateX(40px)",
      right: "translateX(-40px)",
      none: "none",
    };

    el.style.transform = directionMap[direction];
    el.style.transition = `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // Check if element is already visible on page load
        // If top of element is above bottom of viewport, it's already visible
        const alreadyVisible = entry.boundingClientRect.top < window.innerHeight;
        
        // For elements already visible on load, reveal immediately.
        // For elements scrolled into view, add a small delay for effect.
        const waitTime = alreadyVisible ? 0 : scrollDelay;

        setTimeout(() => {
          setIsVisible(true);
          el.style.opacity = "1";
          el.style.transform = "none";
        }, waitTime);

        observer.unobserve(el);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, direction, duration, scrollDelay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { programs } from "@/components/sections/data";

export function Header() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);

  const aboutRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside (desktop)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
      if (programsRef.current && !programsRef.current.contains(e.target as Node)) {
        setProgramsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const aboutItems = [
    { title: "Our Story", href: "/about#who-we-are" },
    { title: "Our Team", href: "/about/team" },
    { title: "Our Values", href: "/about#values" },
    { title: "Join Our Team", href: "/about#get-involved" },
  ];

  function closeAll() {
    setOpen(false);
    setAboutOpen(false);
    setProgramsOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-3"
          aria-label="Johnnie Boy's Foundation home"
        >
          <Image
            src="/logo/logo.svg"
            alt="Johnnie Boy's Foundation"
            width={200}
            height={111}
            className="h-12 w-auto object-contain"
          />
          <span className="font-serif text-sm font-bold tracking-tight text-primary">
            JOHNNIE BOY&apos;S <br />{" "}
            <span className="text-accent">FOUNDATION</span>
          </span>
        </a>

        {/* Nav */}
        <nav
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-full flex-col gap-1 border-b border-border bg-background px-5 py-4 md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0`}
        >
          {/* About dropdown */}
          <div ref={aboutRef} className="relative">
            {/* Desktop: link navigates, hover shows dropdown */}
            <Link
              href="/about"
              onClick={closeAll}
              onMouseEnter={() => { setAboutOpen(true); setProgramsOpen(false); }}
              className="hidden items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold hover:text-accent md:flex"
            >
              About
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
              />
            </Link>

            {/* Mobile: button toggles dropdown inline */}
            <button
              onClick={() => { setAboutOpen((v) => !v); setProgramsOpen(false); }}
              className="flex w-full items-center justify-between gap-1 rounded-lg px-3 py-2.5 text-sm font-semibold hover:text-accent md:hidden"
              aria-expanded={aboutOpen}
            >
              About
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
              />
            </button>

            {aboutOpen && (
              <div
                onMouseLeave={() => setAboutOpen(false)}
                className="md:absolute md:left-0 md:top-full md:mt-1 md:min-w-[200px] md:rounded-xl md:border md:border-border md:bg-background md:shadow-lg"
              >
                {aboutItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={closeAll}
                    className="block px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-accent-foreground md:first:rounded-t-xl md:last:rounded-b-xl"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Programs dropdown */}
          <div ref={programsRef} className="relative">
            <button
              onClick={() => {
                setProgramsOpen((v) => !v);
                setAboutOpen(false);
              }}
              className="flex w-full items-center justify-between gap-1 rounded-lg px-3 py-2.5 text-sm font-semibold hover:text-accent md:w-auto md:py-2"
              aria-expanded={programsOpen}
            >
              Programs
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${programsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {programsOpen && (
              <div className="md:absolute md:left-0 md:top-full md:mt-1 md:min-w-[200px] md:rounded-xl md:border md:border-border md:bg-background md:shadow-lg">
                {programs.map((program) => (
                  <Link
                    key={program.slug}
                    href={`/${program.slug}`}
                    onClick={closeAll}
                    className="block px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-accent-foreground md:first:rounded-t-xl md:last:rounded-b-xl"
                  >
                    {program.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/initiatives"
            onClick={closeAll}
            className="rounded-lg px-3 py-2.5 text-sm font-semibold hover:text-accent md:py-2"
          >
            Initiatives
          </Link>
          <Link
            href="/impact"
            onClick={closeAll}
            className="rounded-lg px-3 py-2.5 text-sm font-semibold hover:text-accent md:py-2"
          >
            Impact
          </Link>
          <Link
            href="/gallery-events"
            onClick={closeAll}
            className="rounded-lg px-3 py-2.5 text-sm font-semibold hover:text-accent md:py-2"
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            onClick={closeAll}
            className="rounded-lg px-3 py-2.5 text-sm font-semibold hover:text-accent md:py-2"
          >
            Contact
          </Link>

          <Link
            href="/get-involved"
            onClick={closeAll}
            className="mt-2 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-bold text-primary-foreground transition hover:bg-accent hover:text-accent-foreground md:mt-0 md:ml-2"
          >
            Get involved
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          className="rounded-lg p-2 md:hidden"
          onClick={() => {
            setOpen((v) => !v);
            setAboutOpen(false);
            setProgramsOpen(false);
          }}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

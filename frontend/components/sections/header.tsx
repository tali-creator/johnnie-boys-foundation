"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { programs } from "@/components/sections/data";

export function Header() {
  const [open, setOpen] = useState(false);

  const aboutItems = [
    { title: "Our Story", href: "/about#who-we-are" },
    { title: "Our Team", href: "/about/team" },
    { title: "Our Values", href: "/about#values" },
    { title: "Join Our Team", href: "/about#get-involved" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a
          href="#top"
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
          <span className="font-serif text-lg font-bold tracking-tight text-primary">
            JOHNNIE BOY&apos;S <span className="text-accent">FOUNDATION</span>
          </span>
        </a>
        <nav
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-5 border-b border-border bg-background px-5 py-6 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
        >
          <div className="relative group">
            <Link
              href="/about"
              className="flex items-center gap-1 text-sm font-semibold hover:text-accent"
            >
              About <ChevronDown size={16} />
            </Link>
            <div className="absolute left-0 top-full hidden min-w-[200px] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-lg group-hover:block">
              {aboutItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-accent-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-semibold hover:text-accent">
              Programs <ChevronDown size={16} />
            </button>
            <div className="absolute left-0 top-full hidden min-w-[200px] flex-col overflow-hidden rounded-xl border border-border bg-background shadow-lg group-hover:flex">
              {programs.map((program) => (
                <Link
                  key={program.slug}
                  href={`/${program.slug}`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-accent-foreground"
                >
                  {program.title}
                </Link>
              ))}
            </div>
          </div>
          <a
            href="#impact"
            onClick={() => setOpen(false)}
            className="text-sm font-semibold hover:text-accent"
          >
            Impact
          </a>
          <Link
            href="/gallery-events"
            onClick={() => setOpen(false)}
            className="text-sm font-semibold hover:text-accent"
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="text-sm font-semibold hover:text-accent"
          >
            Contact
          </Link>
          <a
            href="/get-involved"
            onClick={() => setOpen(false)}
            className="rounded-full bg-primary px-5 py-2.5 text-center text-sm font-bold text-primary-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            Get involved
          </a>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

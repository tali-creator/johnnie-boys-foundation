import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/social-links";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/about/team" },
  { label: "Programs", href: "/mentorship" },
  { label: "Gallery", href: "/gallery-events" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Contact", href: "/contact" },
];

const programs = [
  { label: "Mentorship", href: "/mentorship" },
  { label: "Education Support", href: "/education-support" },
  { label: "Leadership Development", href: "/leadership-development" },
  { label: "Counseling", href: "/counseling" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/logo/logo.svg"
              alt="Johnnie Boy's Foundation"
              width={200}
              height={111}
              className="h-12 w-auto object-contain"
            />
            <p className="mt-4 max-w-xs text-sm leading-6 text-primary-foreground/60">
              Empowering boys and young men through education, mentorship, and
              community development in northern Nigeria.
            </p>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 transition hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Our Programs
            </h3>
            <ul className="mt-4 space-y-2.5">
              {programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 transition hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/60">
              <li>
                <p className="font-semibold text-primary-foreground/80">
                  Address
                </p>
                <p className="mt-1 leading-6">
                  No. 3 Mozambique Crescent,
                  <br />
                  Barnawa Shopping Complex,
                  <br />
                  Kaduna, Kaduna State,
                  <br />
                  Nigeria
                </p>
              </li>
              <li>
                <p className="font-semibold text-primary-foreground/80">
                  Email
                </p>
                <a
                  href="mailto:info@johnnieboysfoundation.org"
                  className="transition hover:text-primary-foreground"
                >
                  info@johnnieboysfoundation.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-primary-foreground/50">
              &copy; {new Date().getFullYear()} Johnnie Boy&apos;s Foundation.
              All rights reserved. Registered with the Corporate Affairs
              Commission (CAC).
            </p>
            <p className="text-xs text-primary-foreground/50">
              Little men, big dreams.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

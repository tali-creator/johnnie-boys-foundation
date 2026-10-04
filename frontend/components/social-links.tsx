"use client";

import { FaInstagram, FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const socialLinks = [
  {
    icon: MdEmail,
    label: "Email us",
    href: "mailto:Johnnieboysfoundation@gmail.com",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://instagram.com/Johnnieboysfoundation",
  },
  {
    icon: FaFacebook,
    label: "Facebook",
    href: "https://facebook.com/Johnnieboysfoundation",
  },
  {
    icon: FaXTwitter,
    label: "X (Twitter)",
    href: "https://twitter.com/Johnnieboysfoundation",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/2348131576436",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/johnnie-boys-foundation-084818297/",
  },
];

interface SocialLinksProps {
  /**
   * "light" → icons use primary color (dark, for light backgrounds)
   * "dark"  → icons are white (for dark/primary-color backgrounds)
   * Defaults to "dark" since the footer has a dark background.
   */
  variant?: "light" | "dark";
  iconSize?: number;
}

export function SocialLinks({ variant = "dark", iconSize = 20 }: SocialLinksProps) {
  const colorClass =
    variant === "dark"
      ? "text-white hover:text-accent"
      : "text-primary hover:text-accent";

  return (
    <div className="flex flex-wrap items-center gap-4">
      {socialLinks.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
          aria-label={label}
          className={`transition-colors duration-200 ${colorClass}`}
        >
          <Icon size={iconSize} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

import Image from "next/image";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between lg:px-8">
        <div>
          <Image
            src="/logo/logo.svg"
            alt="Johnnie Boy's Foundation"
            width={200}
            height={111}
            className="h-12 w-auto object-contain"
          />
          <p className="mt-2 text-sm text-primary-foreground/60">
            Guiding boys to greatness.
          </p>
          <SocialLinks />
        </div>
        <div className="text-left text-sm text-primary-foreground/60 sm:text-right">
          <p>Little men, big dreams.</p>
          <p className="mt-1">© 2026 Johnnie Boy&apos;s Foundation</p>
        </div>
      </div>
    </footer>
  );
}

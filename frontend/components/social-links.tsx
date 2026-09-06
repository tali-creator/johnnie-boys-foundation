import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  {
    image: "/svg-icons/gmail.svg",
    href: "Johnnieboysfoundation@gmail.com",
  },
  {
    image: "/svg-icons/Instagram.svg",
    href: "https://instagram.com/Johnnieboysfoundation",
  },
  {
    image: "/svg-icons/facebook.svg",
    href: "https://facebook.com/Johnnieboysfoundation",
  },
  {
    image: "/svg-icons/x.svg",
    href: "https://twitter.com/Johnnieboysfoundation",
  },
  {
    image: "/svg-icons/whatsApp.svg",
    href: "https://wa.me/2348131576436",
  },
  {
    image: "/svg-icons/linkedin.svg",
    href: "https://www.linkedin.com/in/johnnie-boys-foundation-084818297/"  }
];

export function SocialLinks() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
      {socialLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="inline-flex items-center gap-2 rounded-full p-1 font-bold transition hover:border hover:border-accent"
        >
          <Image
            src={link.image}
            alt={`Social Link ${index + 1}`}
            width={50}
            height={50}
            className="h-8 w-auto"
          />
        </Link>
      ))}
    </div>
  );
}

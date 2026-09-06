"use client";

import { usePathname } from "next/navigation";
import { Header, Footer } from "@/components/sections";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

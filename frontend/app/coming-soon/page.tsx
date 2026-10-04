import { ComingSoon } from "@/components/coming-soon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Soon | Johnnie Boy's Foundation",
  description: "This page is currently under construction. Check back soon!",
};

export default function ComingSoonPage() {
  return (
    <ComingSoon
      subtitle="Under Construction"
      title="Coming Soon"
      description="We're working hard to bring you something amazing. This page is currently under construction — check back soon for updates!"
    />
  );
}

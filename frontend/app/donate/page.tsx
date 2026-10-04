import { ComingSoon } from "@/components/coming-soon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate | Johnnie Boy's Foundation",
  description:
    "Support boys and young men in northern Nigeria through a donation to Johnnie Boy's Foundation.",
};

export default function DonatePage() {
  return (
    <ComingSoon
      subtitle="Make a Difference"
      title="Donate"
      description="Our online donation portal is coming soon. In the meantime, please reach out to us directly at info@johnnieboysfoundation.org and we will guide you on how to give."
    />
  );
}

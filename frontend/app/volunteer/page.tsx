import { ComingSoon } from "@/components/coming-soon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteer & Mentor | Johnnie Boy's Foundation",
  description:
    "Share your expertise and make an impact in the lives of boys and young men as a volunteer or mentor.",
};

export default function VolunteerPage() {
  return (
    <ComingSoon
      subtitle="Get Involved"
      title="Volunteer & Mentor"
      description="Our volunteer and mentor application portal is coming soon. If you'd like to get involved now, reach out to us at info@johnnieboysfoundation.org — all support is valued!"
    />
  );
}

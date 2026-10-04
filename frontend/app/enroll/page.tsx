import { ComingSoon } from "@/components/coming-soon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enroll a Boy | Johnnie Boy's Foundation",
  description:
    "Enroll a boy into our programs and give him the support, mentorship, and education he deserves.",
};

export default function EnrollPage() {
  return (
    <ComingSoon
      subtitle="Enroll a Boy"
      title="Enrolment"
      description="Our online enrolment form is coming soon. To enroll a boy into our programs right now, please contact us at info@johnnieboysfoundation.org and we'll be happy to assist."
    />
  );
}

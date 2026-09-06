import { ProgramDetail } from "@/components/program-detail";
import { programs } from "@/components/sections/data";

export default function MentorshipPage() {
  const program = programs.find((p) => p.slug === "mentorship");
  if (!program) return null;
  return <ProgramDetail program={program} />;
}
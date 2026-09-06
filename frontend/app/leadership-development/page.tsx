import { ProgramDetail } from "@/components/program-detail";
import { programs } from "@/components/sections/data";

export default function LeadershipDevelopmentPage() {
  const program = programs.find((p) => p.slug === "leadership-development");
  if (!program) return null;
  return <ProgramDetail program={program} />;
}
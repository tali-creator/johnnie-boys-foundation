import { ProgramDetail } from "@/components/program-detail";
import { programs } from "@/components/sections/data";

export default function EducationSupportPage() {
  const program = programs.find((p) => p.slug === "education-support");
  if (!program) return null;
  return <ProgramDetail program={program} />;
}
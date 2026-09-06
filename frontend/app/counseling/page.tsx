import { ProgramDetail } from "@/components/program-detail";
import { programs } from "@/components/sections/data";

export default function CounselingPage() {
  const program = programs.find((p) => p.slug === "counseling");
  if (!program) return null;
  return <ProgramDetail program={program} />;
}
import { Hero, Vision, Partner, Impact, Programs } from "@/components/sections";

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <Hero />
      <Programs />
      <Impact />
      <Vision />
      <Partner />
    </main>
  );
}

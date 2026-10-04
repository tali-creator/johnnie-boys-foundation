"use client";

import { useState, useEffect } from "react";
import { ProgramDetail, ProgramDetailLoader } from "@/components/program-detail";
import { programs as fallbackPrograms } from "@/components/sections/data";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function ProgramPage({ slug }: { slug: string }) {
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/programs/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setProgram(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to local data
        const local = fallbackPrograms.find((p) => p.slug === slug);
        if (local) {
          setProgram({
            slug: local.slug,
            title: local.title,
            description: local.description,
            badge: local.badge,
            imageUrl: local.image,
            fullCopy: local.fullCopy,
          });
        } else {
          setNotFound(true);
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <ProgramDetailLoader />;
  if (notFound || !program) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Program not found.</p>
      </div>
    );
  }

  return <ProgramDetail program={program} />;
}

"use client";

import { useState, useEffect } from "react";
import { useAdminFetch } from "@/lib/admin-auth";
import { Eye, Trash2, Mail, User, Calendar } from "lucide-react";

interface Submission {
  id: string;
  type: string;
  data: Record<string, any>;
  status: string;
  createdAt: string;
}

export default function AdminSubmissionsPage() {
  const fetcher = useAdminFetch();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [viewing, setViewing] = useState<Submission | null>(null);

  useEffect(() => {
    const q = filter !== "all" ? `?type=${filter}` : "";
    fetcher(`/api/admin/submissions${q}`)
      .then((r) => r.json())
      .then(setSubmissions)
      .finally(() => setLoading(false));
  }, [filter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    const res = await fetcher(`/api/admin/submissions/${id}`, { method: "DELETE" });
    if (res.ok) setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleMarkRead = async (id: string) => {
    await fetcher(`/api/admin/submissions/${id}/read`, { method: "PATCH" });
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status: "READ" } : s)));
  };

  const types = ["all", "CONTACT", "VOLUNTEER", "ENROLL", "DONATION"];
  const typeColors: Record<string, string> = {
    CONTACT: "bg-blue-100 text-blue-700",
    VOLUNTEER: "bg-green-100 text-green-700",
    ENROLL: "bg-purple-100 text-purple-700",
    DONATION: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold">Submissions</h1>
        <p className="mt-1 text-sm text-muted-foreground">Contact forms, volunteer sign-ups, and enrollments</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
              filter === t ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t === "all" ? "All" : t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Type</th>
              <th className="px-4 py-3 text-left font-semibold">Name / Email</th>
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : submissions.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No submissions found</td></tr>
            ) : submissions.map((s) => (
              <tr key={s.id} className={`border-t border-border ${s.status === "NEW" ? "bg-accent/5" : ""}`}>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${typeColors[s.type] || "bg-muted"}`}>{s.type}</span>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{s.data.name || s.data.fullName || "—"}</p>
                    <p className="text-xs text-muted-foreground">{s.data.email || "—"}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${s.status === "NEW" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => { setViewing(s); if (s.status === "NEW") handleMarkRead(s.id); }} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"><Eye size={16} /></button>
                    <button onClick={() => handleDelete(s.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewing(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${typeColors[viewing.type] || "bg-muted"}`}>{viewing.type}</span>
              <button onClick={() => setViewing(null)} className="rounded p-1 text-muted-foreground hover:bg-muted">✕</button>
            </div>
            <div className="space-y-3">
              {Object.entries(viewing.data).map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs font-bold uppercase text-muted-foreground">{key}</p>
                  <p className="text-sm">{String(value || "—")}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Submitted {new Date(viewing.createdAt).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

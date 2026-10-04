"use client";


import { useState, useEffect } from "react";
import { useAdminFetch } from "@/lib/admin-auth";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Program {
  id: string;
  slug: string;
  title: string;
  description: string;
  badge: string;
  imageUrl: string;
  fullCopy: string;
  order: number;
  isActive: boolean;
}

export default function AdminProgramsPage() {
  const fetcher = useAdminFetch();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Program | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetcher("/api/programs")
      .then((r) => r.json())
      .then((data) => {
        setPrograms(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setPrograms([]);
        setLoading(false);
      });
  }, []);

  const handleSave = async (data: Partial<Program>) => {
    const method = data.id ? "PUT" : "POST";
    const url = data.id ? `/api/admin/programs/${data.id}` : "/api/admin/programs";
    const res = await fetcher(url, { method, body: JSON.stringify(data) });
    if (res.ok) {
      const saved = await res.json();
      setPrograms((prev) => {
        const idx = prev.findIndex((p) => p.id === saved.id);
        return idx >= 0 ? prev.map((p) => (p.id === saved.id ? saved : p)) : [...prev, saved];
      });
      setShowForm(false);
      setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this program?")) return;
    const res = await fetcher(`/api/admin/programs/${id}`, { method: "DELETE" });
    if (res.ok) setPrograms((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Programs</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage foundation programs</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground transition hover:bg-accent/90">
          <Plus size={16} /> Add Program
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold">{editing ? "Edit Program" : "Add Program"}</h2>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="rounded p-1 text-muted-foreground hover:bg-muted"><X size={18} /></button>
          </div>
          <ProgramForm program={editing} onSave={handleSave} />
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold">Slug</th>
              <th className="px-4 py-3 text-left font-semibold">Badge</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : programs.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No programs yet</td></tr>
            ) : programs.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{p.slug}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-bold text-accent">{p.badge}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${p.isActive ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                    {p.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => { setEditing(p); setShowForm(true); }} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(p.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProgramForm({ program, onSave }: { program: Program | null; onSave: (d: Partial<Program>) => void }) {
  const [title, setTitle] = useState(program?.title || "");
  const [slug, setSlug] = useState(program?.slug || "");
  const [description, setDescription] = useState(program?.description || "");
  const [badge, setBadge] = useState(program?.badge || "");
  const [imageUrl, setImageUrl] = useState(program?.imageUrl || "");
  const [fullCopy, setFullCopy] = useState(program?.fullCopy || "");
  const [order, setOrder] = useState(program?.order || 0);
  const [isActive, setIsActive] = useState(program?.isActive ?? true);
  const ic = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent";

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <input value={title} onChange={(e) => { setTitle(e.target.value); setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")); }} className={ic} placeholder="Program title" />
        <input value={slug} onChange={(e) => setSlug(e.target.value)} className={ic} placeholder="slug" />
      </div>
      <input value={badge} onChange={(e) => setBadge(e.target.value)} className={ic} placeholder="Badge text (e.g. 'Ages 10-14')" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className={ic} placeholder="Short description" />
      <textarea value={fullCopy} onChange={(e) => setFullCopy(e.target.value)} rows={6} className={ic} placeholder="Full program copy / content" />
      <div className="grid grid-cols-2 gap-3">
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={ic} placeholder="Image URL" />
        <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className={ic} placeholder="Sort order" />
      </div>
      <label className="flex items-center gap-2 text-sm font-bold">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded" /> Active
      </label>
      <button onClick={() => onSave({ id: program?.id, title, slug, description, badge, imageUrl, fullCopy, order, isActive })} className="self-end rounded-lg bg-accent px-6 py-2 text-sm font-bold text-accent-foreground hover:bg-accent/90">Save</button>
    </div>
  );
}

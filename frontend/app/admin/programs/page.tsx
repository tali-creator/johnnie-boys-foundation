"use client";

import { useState, useEffect } from "react";
import { useAdminFetch } from "@/lib/admin-auth";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { ContentBlock } from "@/types/blocks";

interface Program {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  color: string;
  items: string[];
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
      .then(setPrograms)
      .finally(() => setLoading(false));
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

  const ic = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent";

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Programs</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage foundation programs and initiatives</p>
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
              <th className="px-4 py-3 text-left font-semibold">Items</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : programs.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No programs yet</td></tr>
            ) : programs.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{p.slug}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.items?.length || 0} items</td>
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
  const [image, setImage] = useState(program?.image || "");
  const [color, setColor] = useState(program?.color || "#00e676");
  const [items, setItems] = useState<string[]>(program?.items || []);
  const [newItem, setNewItem] = useState("");
  const ic = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent";

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <input value={title} onChange={(e) => { setTitle(e.target.value); setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")); }} className={ic} placeholder="Program title" />
        <input value={slug} onChange={(e) => setSlug(e.target.value)} className={ic} placeholder="slug" />
      </div>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={ic} placeholder="Description" />
      <div className="grid grid-cols-2 gap-3">
        <input value={image} onChange={(e) => setImage(e.target.value)} className={ic} placeholder="Image URL" />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 rounded-lg border border-border" />
      </div>
      <div>
        <p className="mb-2 text-sm font-bold">Program Items</p>
        {items.map((item, i) => (
          <div key={i} className="mb-2 flex gap-2">
            <input value={item} onChange={(e) => { const arr = [...items]; arr[i] = e.target.value; setItems(arr); }} className={ic} />
            <button onClick={() => setItems(items.filter((_, j) => j !== i))} className="shrink-0 rounded p-2 text-destructive hover:bg-destructive/10"><Trash2 size={14} /></button>
          </div>
        ))}
        <div className="flex gap-2">
          <input value={newItem} onChange={(e) => setNewItem(e.target.value)} className={ic} placeholder="New item" onKeyDown={(e) => { if (e.key === "Enter" && newItem.trim()) { setItems([...items, newItem.trim()]); setNewItem(""); } }} />
          <button onClick={() => { if (newItem.trim()) { setItems([...items, newItem.trim()]); setNewItem(""); } }} className="shrink-0 rounded-lg bg-muted px-3 text-sm font-bold hover:bg-muted/80">Add</button>
        </div>
      </div>
      <button onClick={() => onSave({ id: program?.id, title, slug, description, image, color, items })} className="self-end rounded-lg bg-accent px-6 py-2 text-sm font-bold text-accent-foreground hover:bg-accent/90">Save</button>
    </div>
  );
}

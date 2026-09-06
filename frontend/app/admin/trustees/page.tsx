"use client";

import { useState, useEffect } from "react";
import { useAdminFetch } from "@/lib/admin-auth";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Trustee {
  id: string;
  name: string;
  role: string;
  photo: string;
  sortOrder: number;
}

export default function AdminTrusteesPage() {
  const fetcher = useAdminFetch();
  const [trustees, setTrustees] = useState<Trustee[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Trustee | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetcher("/api/trustees")
      .then((r) => r.json())
      .then(setTrustees)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (data: Partial<Trustee>) => {
    const method = data.id ? "PUT" : "POST";
    const url = data.id ? `/api/admin/trustees/${data.id}` : "/api/admin/trustees";
    const res = await fetcher(url, { method, body: JSON.stringify(data) });
    if (res.ok) {
      const saved = await res.json();
      setTrustees((prev) => {
        const idx = prev.findIndex((t) => t.id === saved.id);
        return idx >= 0 ? prev.map((t) => (t.id === saved.id ? saved : t)) : [...prev, saved];
      });
      setShowForm(false);
      setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this trustee?")) return;
    const res = await fetcher(`/api/admin/trustees/${id}`, { method: "DELETE" });
    if (res.ok) setTrustees((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Trustees</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage Board of Trustees (name & role only)</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground transition hover:bg-accent/90">
          <Plus size={16} /> Add Trustee
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold">{editing ? "Edit Trustee" : "Add Trustee"}</h2>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="rounded p-1 text-muted-foreground hover:bg-muted"><X size={18} /></button>
          </div>
          <TrusteeForm trustee={editing} onSave={handleSave} />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : trustees.length === 0 ? (
          <p className="text-muted-foreground">No trustees yet</p>
        ) : trustees.map((t) => (
          <div key={t.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                {t.photo && <img src={t.photo} alt={t.name} className="h-full w-full object-cover" />}
              </div>
              <div className="flex-1">
                <p className="font-bold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => { setEditing(t); setShowForm(true); }} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"><Pencil size={14} /></button>
              <button onClick={() => handleDelete(t.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrusteeForm({ trustee, onSave }: { trustee: Trustee | null; onSave: (d: Partial<Trustee>) => void }) {
  const [name, setName] = useState(trustee?.name || "");
  const [role, setRole] = useState(trustee?.role || "");
  const [photo, setPhoto] = useState(trustee?.photo || "");
  const ic = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent";

  return (
    <div className="flex flex-col gap-3">
      <input value={name} onChange={(e) => setName(e.target.value)} className={ic} placeholder="Full name" />
      <input value={role} onChange={(e) => setRole(e.target.value)} className={ic} placeholder="Role (e.g. Board Chair)" />
      <input value={photo} onChange={(e) => setPhoto(e.target.value)} className={ic} placeholder="Photo URL" />
      <button onClick={() => onSave({ id: trustee?.id, name, role, photo })} className="self-end rounded-lg bg-accent px-6 py-2 text-sm font-bold text-accent-foreground hover:bg-accent/90">Save</button>
    </div>
  );
}

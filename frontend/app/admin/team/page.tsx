"use client";

import { useState, useEffect } from "react";
import { useAdminFetch } from "@/lib/admin-auth";
import { Plus, Pencil, Trash2, GripVertical, X } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  socialLinks: Record<string, string>;
  sortOrder: number;
}

export default function AdminTeamPage() {
  const fetcher = useAdminFetch();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetcher("/api/team")
      .then((r) => r.json())
      .then(setMembers)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (member: Partial<TeamMember>) => {
    const method = member.id ? "PUT" : "POST";
    const url = member.id ? `/api/admin/team/${member.id}` : "/api/admin/team";
    const res = await fetcher(url, { method, body: JSON.stringify(member) });
    if (res.ok) {
      const saved = await res.json();
      setMembers((prev) => {
        const idx = prev.findIndex((m) => m.id === saved.id);
        return idx >= 0 ? prev.map((m) => (m.id === saved.id ? saved : m)) : [...prev, saved];
      });
      setShowForm(false);
      setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    const res = await fetcher(`/api/admin/team/${id}`, { method: "DELETE" });
    if (res.ok) setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Team Members</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage public team profiles</p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground transition hover:bg-accent/90"
        >
          <Plus size={16} /> Add Member
        </button>
      </div>

      {showForm && (
        <TeamForm
          member={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Photo</th>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Role</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : members.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No team members yet</td></tr>
            ) : members.map((m) => (
              <tr key={m.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                    {m.photo && <img src={m.photo} alt={m.name} className="h-full w-full object-cover" />}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{m.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.role}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => { setEditing(m); setShowForm(true); }} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(m.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 size={16} /></button>
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

function TeamForm({
  member,
  onSave,
  onCancel,
}: {
  member: TeamMember | null;
  onSave: (m: Partial<TeamMember>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(member?.name || "");
  const [role, setRole] = useState(member?.role || "");
  const [bio, setBio] = useState(member?.bio || "");
  const [photo, setPhoto] = useState(member?.photo || "");

  const ic = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent";

  return (
    <div className="mb-6 rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-lg font-bold">{member ? "Edit Member" : "Add Member"}</h2>
        <button onClick={onCancel} className="rounded p-1 text-muted-foreground hover:bg-muted"><X size={18} /></button>
      </div>
      <div className="flex flex-col gap-3">
        <input value={name} onChange={(e) => setName(e.target.value)} className={ic} placeholder="Full name" />
        <input value={role} onChange={(e) => setRole(e.target.value)} className={ic} placeholder="Role (e.g. Executive Director)" />
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className={ic} placeholder="Bio" />
        <input value={photo} onChange={(e) => setPhoto(e.target.value)} className={ic} placeholder="Photo URL" />
        <button onClick={() => onSave({ id: member?.id, name, role, bio, photo })} className="self-end rounded-lg bg-accent px-6 py-2 text-sm font-bold text-accent-foreground hover:bg-accent/90">Save</button>
      </div>
    </div>
  );
}

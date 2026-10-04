"use client";


import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronUp,
  Loader2,
  GripVertical,
} from "lucide-react";
import { useAdminFetch } from "@/lib/admin-auth";

const ic =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent";

interface Initiative {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  status: "ACTIVE" | "FUNDRAISING" | "UPCOMING" | "COMPLETED";
  heroImage: string | null;
  stats: { label: string; value: string }[];
  content: unknown[];
  partners: { name: string; logoUrl?: string | null }[];
  progressCurrent: number | null;
  progressGoal: number | null;
  progressLabel: string | null;
  order: number;
  createdAt: string;
}

const emptyInitiative = {
  slug: "",
  name: "",
  tagline: "",
  summary: "",
  status: "UPCOMING" as "ACTIVE" | "FUNDRAISING" | "UPCOMING" | "COMPLETED",
  heroImage: "",
  stats: [] as { label: string; value: string }[],
  content: [] as unknown[],
  partners: [] as { name: string; logoUrl?: string | null }[],
  progressCurrent: null as number | null,
  progressGoal: null as number | null,
  progressLabel: "" as string | null,
  order: 0,
};

export default function AdminInitiativesPage() {
  const fetcher = useAdminFetch();
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Initiative | null>(null);
  const [form, setForm] = useState(emptyInitiative);
  const [saving, setSaving] = useState(false);

  // Stats helpers
  const [statLabel, setStatLabel] = useState("");
  const [statValue, setStatValue] = useState("");

  // Partner helpers
  const [partnerName, setPartnerName] = useState("");

  useEffect(() => {
    fetcher("/api/initiatives")
      .then((r) => r.json())
      .then((data) => {
        setInitiatives(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyInitiative);
    setShowForm(true);
  }

  function openEdit(init: Initiative) {
    setEditing(init);
    setForm({
      slug: init.slug,
      name: init.name,
      tagline: init.tagline,
      summary: init.summary,
      status: init.status,
      heroImage: init.heroImage || "",
      stats: init.stats || [],
      content: init.content || [],
      partners: init.partners || [],
      progressCurrent: init.progressCurrent,
      progressGoal: init.progressGoal,
      progressLabel: init.progressLabel || "",
      order: init.order,
    });
    setShowForm(true);
  }

  function addStat() {
    if (statLabel && statValue) {
      setForm({
        ...form,
        stats: [...form.stats, { label: statLabel, value: statValue }],
      });
      setStatLabel("");
      setStatValue("");
    }
  }

  function removeStat(index: number) {
    setForm({ ...form, stats: form.stats.filter((_, i) => i !== index) });
  }

  function addPartner() {
    if (partnerName) {
      setForm({
        ...form,
        partners: [...form.partners, { name: partnerName }],
      });
      setPartnerName("");
    }
  }

  function removePartner(index: number) {
    setForm({
      ...form,
      partners: form.partners.filter((_, i) => i !== index),
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      const body = {
        ...form,
        heroImage: form.heroImage || null,
        progressLabel: form.progressLabel || null,
      };

      const url = editing
        ? `/api/admin/initiatives/${editing.id}`
        : "/api/admin/initiatives";
      const method = editing ? "PUT" : "POST";

      const res = await fetcher(url, {
        method,
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const saved = await res.json();
        if (editing) {
          setInitiatives(
            initiatives.map((i) => (i.id === saved.id ? saved : i))
          );
        } else {
          setInitiatives([...initiatives, saved]);
        }
        setShowForm(false);
        setEditing(null);
        setForm(emptyInitiative);
      }
    } catch (e) {
      console.error("Save failed:", e);
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this initiative?")) return;
    const res = await fetcher(`/api/admin/initiatives/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setInitiatives(initiatives.filter((i) => i.id !== id));
    }
  }

  const statusColors: Record<string, string> = {
    ACTIVE: "bg-emerald-100 text-emerald-700",
    FUNDRAISING: "bg-amber-100 text-amber-700",
    UPCOMING: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-gray-100 text-gray-600",
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Initiatives</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage public initiative pages
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-foreground hover:bg-accent/90"
        >
          <Plus size={16} />
          New Initiative
        </button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">
              {editing ? "Edit Initiative" : "New Initiative"}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Name *</label>
              <input
                className={ic}
                value={form.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setForm({
                    ...form,
                    name,
                    slug: form.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
                  });
                }}
                placeholder="e.g. BLOOM"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Slug *</label>
              <input
                className={ic}
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="e.g. bloom"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">
                Tagline *
              </label>
              <input
                className={ic}
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="e.g. Upgrading Minds. Shaping Futures."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">
                Summary *
              </label>
              <textarea
                className={ic}
                rows={3}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                placeholder="Short description for index cards"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Status</label>
              <select
                className={ic}
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as any })
                }
              >
                <option value="ACTIVE">Active</option>
                <option value="FUNDRAISING">Fundraising</option>
                <option value="UPCOMING">Upcoming</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Order</label>
              <input
                type="number"
                className={ic}
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">
                Hero Image URL
              </label>
              <input
                className={ic}
                value={form.heroImage}
                onChange={(e) =>
                  setForm({ ...form, heroImage: e.target.value })
                }
                placeholder="https://... or /path/to/image.jpg"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">
              Stats (displayed on cards and detail page)
            </label>
            {form.stats.length > 0 && (
              <div className="mb-3 space-y-2">
                {form.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-sm font-bold text-accent">
                      {stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                    <button
                      onClick={() => removeStat(i)}
                      className="ml-auto text-destructive hover:underline text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                className={ic}
                value={statLabel}
                onChange={(e) => setStatLabel(e.target.value)}
                placeholder="Label (e.g. Students Reached)"
              />
              <input
                className={ic}
                value={statValue}
                onChange={(e) => setStatValue(e.target.value)}
                placeholder="Value (e.g. 2,867)"
              />
              <button
                onClick={addStat}
                className="shrink-0 rounded-lg bg-muted px-3 py-2 text-sm font-medium hover:bg-muted/80"
              >
                Add
              </button>
            </div>
          </div>

          {/* Partners */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium">Partners</label>
            {form.partners.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {form.partners.map((p, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                  >
                    {p.name}
                    <button
                      onClick={() => removePartner(i)}
                      className="ml-1 text-destructive hover:underline text-xs"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                className={ic}
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="Partner name"
              />
              <button
                onClick={addPartner}
                className="shrink-0 rounded-lg bg-muted px-3 py-2 text-sm font-medium hover:bg-muted/80"
              >
                Add
              </button>
            </div>
          </div>

          {/* Progress (Fundraising only) */}
          {form.status === "FUNDRAISING" && (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Progress Current
                </label>
                <input
                  type="number"
                  className={ic}
                  value={form.progressCurrent ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      progressCurrent: e.target.value
                        ? parseInt(e.target.value)
                        : null,
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Progress Goal
                </label>
                <input
                  type="number"
                  className={ic}
                  value={form.progressGoal ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      progressGoal: e.target.value
                        ? parseInt(e.target.value)
                        : null,
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Progress Label
                </label>
                <input
                  className={ic}
                  value={form.progressLabel ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, progressLabel: e.target.value })
                  }
                  placeholder="e.g. Raised so far"
                />
              </div>
            </div>
          )}

          {/* Content note */}
          <div className="mt-6 rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Content blocks are managed via the block
              editor. For now, content is stored as JSON. A full block editor
              for initiatives will be available in a future update.
            </p>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.name || !form.slug || !form.tagline}
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              {editing ? "Update" : "Create"}
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Tagline</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Stats</th>
              <th className="px-4 py-3 text-left font-medium">Order</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                </td>
              </tr>
            ) : initiatives.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No initiatives yet
                </td>
              </tr>
            ) : (
              initiatives.map((init) => (
                <tr key={init.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{init.name}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">
                    {init.tagline}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${statusColors[init.status]}`}
                    >
                      {init.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {init.stats.length} stats
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {init.order}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(init)}
                        className="rounded p-1 hover:bg-muted"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(init.id)}
                        className="rounded p-1 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

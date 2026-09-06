"use client";

import { useState, useEffect } from "react";
import { useAdminFetch } from "@/lib/admin-auth";
import { Save } from "lucide-react";

interface Settings {
  id: string;
  key: string;
  value: string;
}

const DEFAULT_SETTINGS = [
  { key: "site_name", label: "Site Name", value: "Johnnie Boy's Foundation" },
  { key: "site_description", label: "Site Description", value: "Empowering young men through education, mentorship, and community development." },
  { key: "contact_email", label: "Contact Email", value: "info@johnnieboysfoundation.org" },
  { key: "contact_phone", label: "Contact Phone", value: "+234 XXX XXX XXXX" },
  { key: "address", label: "Address", value: "" },
  { key: "facebook_url", label: "Facebook URL", value: "" },
  { key: "twitter_url", label: "Twitter URL", value: "" },
  { key: "instagram_url", label: "Instagram URL", value: "" },
  { key: "linkedin_url", label: "LinkedIn URL", value: "" },
  { key: "youtube_url", label: "YouTube URL", value: "" },
  { key: "bank_name", label: "Bank Name", value: "" },
  { key: "account_number", label: "Account Number", value: "" },
  { key: "account_name", label: "Account Name", value: "" },
];

export default function AdminSettingsPage() {
  const fetcher = useAdminFetch();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetcher("/api/admin/settings")
      .then((r) => r.json())
      .then((data: Settings[]) => {
        const map: Record<string, string> = {};
        data.forEach((s) => (map[s.key] = s.value));
        DEFAULT_SETTINGS.forEach((d) => {
          if (!map[d.key]) map[d.key] = d.value;
        });
        setSettings(map);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const entries = Object.entries(settings).map(([key, value]) => ({ key, value }));
      await fetcher("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify({ settings: entries }),
      });
      alert("Settings saved!");
    } catch {
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const update = (key: string, value: string) => setSettings((prev) => ({ ...prev, [key]: value }));
  const ic = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent";

  if (loading) return <div className="p-6"><p className="text-muted-foreground">Loading...</p></div>;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Site-wide configuration</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground transition hover:bg-accent/90 disabled:opacity-50">
          <Save size={16} /> {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-bold">General</h2>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              Site Name
              <input value={settings.site_name || ""} onChange={(e) => update("site_name", e.target.value)} className={ic} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              Site Description
              <textarea value={settings.site_description || ""} onChange={(e) => update("site_description", e.target.value)} rows={3} className={ic} />
            </label>
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-bold">Contact Info</h2>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              Email
              <input type="email" value={settings.contact_email || ""} onChange={(e) => update("contact_email", e.target.value)} className={ic} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              Phone
              <input value={settings.contact_phone || ""} onChange={(e) => update("contact_phone", e.target.value)} className={ic} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              Address
              <textarea value={settings.address || ""} onChange={(e) => update("address", e.target.value)} rows={2} className={ic} />
            </label>
          </div>
        </div>

        {/* Social Links */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-bold">Social Links</h2>
          <div className="flex flex-col gap-4">
            {["facebook_url", "twitter_url", "instagram_url", "linkedin_url", "youtube_url"].map((key) => (
              <label key={key} className="flex flex-col gap-1.5 text-sm font-bold">
                {key.replace("_url", "").charAt(0).toUpperCase() + key.replace("_url", "").slice(1)}
                <input value={settings[key] || ""} onChange={(e) => update(key, e.target.value)} className={ic} placeholder="https://..." />
              </label>
            ))}
          </div>
        </div>

        {/* Bank Details */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-serif text-lg font-bold">Donation Bank Details</h2>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              Bank Name
              <input value={settings.bank_name || ""} onChange={(e) => update("bank_name", e.target.value)} className={ic} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              Account Number
              <input value={settings.account_number || ""} onChange={(e) => update("account_number", e.target.value)} className={ic} />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-bold">
              Account Name
              <input value={settings.account_name || ""} onChange={(e) => update("account_name", e.target.value)} className={ic} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

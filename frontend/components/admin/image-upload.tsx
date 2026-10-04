"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { useAdminFetch } from "@/lib/admin-auth";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, label, className = "" }: ImageUploadProps) {
  const fetcher = useAdminFetch();
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = document.cookie.split("; ").find((c) => c.startsWith("jbf_admin_token="))?.split("=")[1];

      const res = await fetch(`${API_URL}/api/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        alert("Upload failed");
      }
    } catch {
      alert("Upload failed");
    }
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) upload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  };

  return (
    <div className={className}>
      {label && <p className="mb-1.5 text-sm font-bold">{label}</p>}

      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-border">
          <img src={value} alt="Uploaded" className="h-40 w-full object-cover" />
          <button
            onClick={() => onChange("")}
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition ${
            dragOver ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
          }`}
        >
          {uploading ? (
            <Loader2 size={24} className="animate-spin text-muted-foreground" />
          ) : (
            <>
              <Upload size={24} className="text-muted-foreground" />
              <p className="mt-2 text-xs text-muted-foreground">Click or drag to upload</p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Manual URL input */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
        placeholder="Or paste image URL"
      />
    </div>
  );
}

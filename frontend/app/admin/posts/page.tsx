"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAdminFetch } from "@/lib/admin-auth";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";

interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  publishedAt: string;
}

export default function AdminPostsPage() {
  const fetcher = useAdminFetch();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetcher("/api/posts")
      .then((r) => r.json())
      .then(setPosts)
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetcher(`/api/admin/posts/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage gallery &amp; event posts
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground transition hover:bg-accent/90"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  Loading...
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No posts yet. Create your first one!
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{post.title}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/gallery-events/${post.slug}`}
                        target="_blank"
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 size={16} />
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

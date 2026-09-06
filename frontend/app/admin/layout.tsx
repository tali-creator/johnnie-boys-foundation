"use client";

import { AuthProvider, AdminGuard, useAuth } from "@/lib/admin-auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Shield,
  GraduationCap,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/trustees", label: "Trustees", icon: Shield },
  { href: "/admin/programs", label: "Programs", icon: GraduationCap },
  { href: "/admin/submissions", label: "Submissions", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminSidebar() {
  const pathname = usePathname();
  const { admin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-primary p-2 text-white md:hidden"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <Link href="/admin/dashboard" className="font-serif text-lg font-bold">
            JBF <span className="text-accent">Admin</span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="md:hidden">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground">
            {admin?.name || admin?.email}
          </p>
          <button
            onClick={logout}
            className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminGuard>
        <AdminShellInner>{children}</AdminShellInner>
      </AdminGuard>
    </AuthProvider>
  );
}

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="md:ml-64">{children}</main>
    </div>
  );
}

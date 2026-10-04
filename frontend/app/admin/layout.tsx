export const dynamic = "force-dynamic";
export const revalidate = 0;

import AdminLayoutClient from "./admin-layout-client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}

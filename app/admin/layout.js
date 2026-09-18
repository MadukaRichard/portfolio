"use client";

import { usePathname } from "next/navigation";
import AdminNav from "@/components/AdminNav";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-neutral-950">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="flex flex-col sm:flex-row min-h-screen">
        <AdminNav />
        <main className="flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}

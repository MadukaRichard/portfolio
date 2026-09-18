"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/posts", label: "Posts" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-full sm:w-56 shrink-0 border-b sm:border-b-0 sm:border-r border-neutral-800">
      <div className="p-6 flex flex-col h-full">
        <p className="text-xs uppercase tracking-wide text-neutral-600 mb-4">
          Admin
        </p>
        <nav className="flex sm:flex-col gap-1 flex-wrap">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 hidden sm:block">
          <Link
            href="/"
            target="_blank"
            className="block text-xs text-neutral-500 hover:text-accent mb-3"
          >
            View site ↗
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs text-neutral-500 hover:text-red-400 transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}

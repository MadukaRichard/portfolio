import Link from "next/link";
import { getProfile, getProjects, getExperience, getPosts } from "@/lib/getData";

export const revalidate = 0;

export default async function AdminDashboard() {
  const [profile, projects, experience, posts] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperience(),
    getPosts(),
  ]);

  const cards = [
    { label: "Profile", value: profile.name, href: "/admin/profile" },
    { label: "Projects", value: projects.length, href: "/admin/projects" },
    { label: "Experience entries", value: experience.length, href: "/admin/experience" },
    { label: "Posts", value: posts.length, href: "/admin/posts" },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold text-neutral-100">Dashboard</h1>
      <p className="text-sm text-neutral-500 mt-1">
        Everything on your site is editable from here — nothing is hardcoded.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-neutral-800 p-5 hover:border-accent transition-colors"
          >
            <p className="text-xs uppercase tracking-wide text-neutral-500">
              {card.label}
            </p>
            <p className="text-2xl font-semibold text-neutral-100 mt-2">
              {card.value}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

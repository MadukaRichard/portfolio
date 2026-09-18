import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getProfile, getProjects } from "@/lib/getData";

export const revalidate = 0;

export default async function ProjectsPage() {
  const [profile, projects] = await Promise.all([
    getProfile(),
    getProjects(),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav logoName={profile.logoName} />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 pt-16 pb-20">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">
            Projects
          </h1>
          <p className="mt-2 text-neutral-500 text-sm">
            Things I have built and shipped.
          </p>

          {projects.length === 0 ? (
            <p className="mt-10 text-neutral-500 text-sm">
              Nothing here yet — add your first project from the admin dashboard.
            </p>
          ) : (
            <ul className="mt-10 space-y-8">
              {projects.map((project) => (
                <li
                  key={project.slug}
                  className="border-b border-neutral-900 pb-8 last:border-none"
                >
                  <Link
                    href={project.url || `/projects/${project.slug}`}
                    target={project.url ? "_blank" : undefined}
                    rel={project.url ? "noopener noreferrer" : undefined}
                    className="group block"
                  >
                    <h2 className="text-lg text-neutral-100 font-medium group-hover:text-accent transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-neutral-500 text-sm mt-1">
                      {project.summary}
                    </p>
                    {project.tags?.length > 0 && (
                      <p className="text-xs text-accent/70 mt-3">
                        {project.tags.join(" · ")}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Footer profile={profile} />
    </div>
  );
}

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
                  /* Added relative and group for the hover image */
                  className="relative group border-b border-neutral-900 pb-8 last:border-none"
                >
                  <Link
                    /* Forces internal routing */
                    href={`/projects/${project.slug}`}
                    /* Restricts width so text doesn't overlap hover image */
                    className="block sm:w-2/3 pr-4"
                  >
                    <h2 className="text-lg text-neutral-100 font-medium group-hover:text-accent transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-neutral-500 text-sm mt-1">
                      {project.summary}
                    </p>
                    
                    {/* Tech Stack Display */}
                    {project.stack && (
                      <p className="text-xs font-mono text-neutral-500 mt-3">
                        Stack: <span className="text-neutral-400">{project.stack}</span>
                      </p>
                    )}

                    {project.tags?.length > 0 && (
                      <p className="text-xs text-accent/70 mt-2">
                        {project.tags.join(" · ")}
                      </p>
                    )}
                  </Link>

                  {/* Hover Image Preview */}
                  {project.image && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-40 opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-4 z-10 hidden sm:block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={project.image} 
                        alt={`${project.title} preview`}
                        className="w-full h-full object-cover rounded-lg border border-neutral-800 shadow-2xl"
                      />
                    </div>
                  )}
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
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getProfile, getProject } from "@/lib/getData";

export const revalidate = 0;

export default async function ProjectDetailPage({ params }) {
  const [profile, project] = await Promise.all([
    getProfile(),
    getProject(params.slug),
  ]);

  if (!project) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Nav logoName={profile.logoName} />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 pt-16 pb-20">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">
            {project.title}
          </h1>
          {project.tags?.length > 0 && (
            <p className="text-xs text-accent/70 mt-3">
              {project.tags.join(" · ")}
            </p>
          )}

          <p className="mt-6 text-neutral-400 leading-relaxed whitespace-pre-line">
            {project.description || project.summary}
          </p>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 text-sm text-accent hover:text-accent transition-colors"
            >
              visit project →
            </a>
          )}
        </section>
      </main>

      <Footer profile={profile} />
    </div>
  );
}

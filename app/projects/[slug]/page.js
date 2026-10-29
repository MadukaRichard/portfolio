import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getProfile, getProject } from "@/lib/getData";

export const revalidate = 0;

export default async function ProjectDetailPage({ params }) {
  // 1. Explicitly await params to fix the Next.js 404 error
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const [profile, project] = await Promise.all([
    getProfile(),
    getProject(slug), // Pass the safely awaited slug here
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

        
        {project.stack && (
            <div className="flex flex-wrap gap-2 mt-4">
              {project.stack.split(',').map((tech, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center rounded-full border border-accent/40 bg-accent/5 px-3 py-1 text-xs font-mono text-accent"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          )}
          {project.tags?.length > 0 && (
            <p className="text-xs text-accent/70 mt-3">
              {project.tags.join(" · ")}
            </p>
          )}

          {/* New: Display the project image on the detail page */}
          {project.image && (
            <div className="mt-8 mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={project.image} 
                alt={`${project.title} screenshot`}
                className="w-full h-auto object-cover rounded-lg border border-neutral-800"
              />
            </div>
          )}

          <p className="mt-6 text-neutral-400 leading-relaxed whitespace-pre-line">
            {project.description || project.summary}
          </p>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-8 text-sm text-accent hover:text-accent transition-colors"
            >
              Visit live project →
            </a>
          )}
        </section>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
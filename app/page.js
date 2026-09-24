import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  getProfile,
  getProjects,
  getExperience,
  getPosts,
} from "@/lib/getData";

export const revalidate = 0;

function renderNameOnTwoLines(name) {
  if (!name) return name;

  const [firstWord, ...rest] = name.trim().split(/\s+/);

  if (rest.length === 0) return name;

  return (
    <>
      <span className="block">{firstWord}</span>
      <span className="block">{rest.join(" ")}</span>
    </>
  );
}

export default async function HomePage() {
  const [profile, projects, experience, posts] = await Promise.all([
    getProfile(),
    getProjects({ featuredOnly: true, limit: 4 }),
    getExperience({ limit: 1 }),
    getPosts({ limit: 4 }),
  ]);

  const whatsappUrl = profile.whatsappNumber
    ? `https://api.whatsapp.com/send/?phone=${profile.whatsappNumber.replace(
        /\D/g,
        ""
      )}&text=${encodeURIComponent(profile.whatsappMessage || "")}&type=phone_number&app_absent=0`
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Nav logoName={profile.logoName} />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-3xl px-6 pt-16 pb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-wide font-black tracking-tighter text-accent leading-none">
            {renderNameOnTwoLines(profile.name)}
          </h1>
          
          <p className="mt-2 text-lg">
            <span className="text-accent font-semibold">{profile.role}</span>
            {profile.level && (
              <span className="ml-2 text-slate-400 font-normal">{profile.level}</span>
            )}
          </p>

          <p 
            className="mt-6 text-neutral-400 leading-relaxed max-w-2xl"
            dangerouslySetInnerHTML={{ __html: profile.bio }}
          />
          {profile.bioSecondary && (
            <p 
              className="mt-4 text-neutral-400 leading-relaxed max-w-2xl"
              dangerouslySetInnerHTML={{ __html: profile.bioSecondary }}
            />
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={profile.ctaUrl || "/contact"}
              className="inline-flex items-center rounded-full border border-accent bg-transparent px-5 py-2 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
            >
              {profile.ctaLabel || "Get in touch"}
            </Link>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-border bg-transparent px-5 py-2 text-sm text-muted transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
              >
                WhatsApp
              </a>
            )}
            <Link
              href="/projects"
              className="inline-flex items-center rounded-full border border-border bg-transparent px-5 py-2 text-sm text-muted transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
            >
              /projects
            </Link>
          </div>
        </section>

        {/* Featured work */}
        {projects.length > 0 && (
          <section className="mx-auto max-w-3xl px-6 py-16 border-t border-neutral-800">
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500">
                Featured work
              </h2>
              <Link
                href="/projects"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                see all
              </Link>
            </div>
            <p className="text-neutral-500 text-sm mb-8">
              Platforms shipped and maintained in production — not demos.
            </p>

            <ul className="space-y-6">
              {projects.map((project) => (
                <li
                  key={project.slug}
                  className="relative group border-b border-neutral-900 pb-6 last:border-none"
                >
                  <Link
                    href={project.url || `/projects/${project.slug}`}
                    target={project.url ? "_blank" : undefined}
                    rel={project.url ? "noopener noreferrer" : undefined}
                    className="block sm:w-2/3 pr-4" 
                  >
                    <h3 className="text-neutral-100 font-medium group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-neutral-500 text-sm mt-1">
                      {project.summary}
                    </p>
                    
                    {/* 👇 NEW Tech Stack Display 👇 */}
                    {project.stack && (
                      <p className="text-xs font-mono text-neutral-500 mt-3">
                        Stack: <span className="text-neutral-400">{project.stack}</span>
                      </p>
                    )}
                  </Link>

                  {/* The Hover Image Preview */}
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
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mx-auto max-w-3xl px-6 py-16 border-t border-neutral-800">
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500">
                Experience
              </h2>
              <Link
                href="/experience"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                view more
              </Link>
            </div>
            <p className="text-neutral-500 text-sm mb-8">
              Roles where I owned delivery, not just tickets.
            </p>

            {experience.map((job) => (
              <div key={job._id} className="space-y-2">
                <h3 className="text-neutral-100 font-medium">{job.company}</h3>
                <p className="text-sm text-neutral-500">
                  {job.startDate} — {job.endDate}
                </p>
                <p className="text-accent text-sm font-medium">
                  {job.role}
                  {job.subRole ? ` · ${job.subRole}` : ""}
                </p>
                {job.context && (
                  <p className="text-neutral-500 text-sm">{job.context}</p>
                )}
                {job.bullets?.length > 0 && (
                  <ul className="mt-3 space-y-2 list-disc list-inside text-neutral-400 text-sm">
                    {job.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <Link
              href="/experience"
              className="inline-block mt-6 text-sm text-accent hover:text-accent transition-colors"
            >
              view full experience →
            </Link>
          </section>
        )}

        {/* Recent posts */}
        {posts.length > 0 && (
          <section className="mx-auto max-w-3xl px-6 py-16 border-t border-neutral-800">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500">
                Recent posts
              </h2>
              <Link
                href="/articles"
                className="text-sm text-muted hover:text-accent transition-colors"
              >
                see all
              </Link>
            </div>

            <ul className="space-y-6">
              {posts.map((post) => (
                <li
                  key={post._id}
                  className="border-b border-neutral-900 pb-6 last:border-none"
                >
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <p className="text-xs text-neutral-600 mb-1">
                      {post.readTime}
                      {post.publishedDate
                        ? ` · ${new Date(post.publishedDate).toLocaleDateString(
                            "en-US",
                            { day: "numeric", month: "short", year: "numeric" }
                          )}`
                        : ""}
                    </p>
                    <h3 className="text-neutral-100 font-medium group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-neutral-500 text-sm mt-1">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags?.length > 0 && (
                      <p className="text-xs text-accent/70 mt-2">
                        {post.tags.map((t) => `#${t}`).join(" ")}
                      </p>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>

      <Footer profile={profile} />
    </div>
  );
}
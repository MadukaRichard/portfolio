import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getProfile, getExperience } from "@/lib/getData";

export const revalidate = 0;

function renderJuniorNeutral(text) {
  if (!text) return text;

  return text.split(/(\(junior\))/i).map((part, index) =>
    /^(\(junior\))$/i.test(part) ? (
      <span key={`junior-${index}`} className="text-neutral-400">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default async function ExperiencePage() {
  const [profile, experience] = await Promise.all([
    getProfile(),
    getExperience(),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav logoName={profile.logoName} />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 pt-16 pb-20">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">
            Experience
          </h1>
          <p className="mt-2 text-neutral-500 text-sm">
            Where I have worked and what I owned.
          </p>

          {experience.length === 0 ? (
            <p className="mt-10 text-neutral-500 text-sm">
              Nothing here yet — add your first role from the admin dashboard.
            </p>
          ) : (
            <div className="mt-10 space-y-12">
              {experience.map((job) => (
                <div
                  key={job._id}
                  className="border-b border-neutral-900 pb-10 last:border-none"
                >
                  <h2 className="text-lg text-neutral-100 font-medium">
                    {job.company}
                  </h2>
                  <p className="text-sm text-neutral-500 mt-1">
                    {job.startDate} — {job.endDate}
                  </p>
                  <p className="text-accent text-sm font-medium mt-2">
                    {renderJuniorNeutral(job.role)}
                    {job.subRole ? ` · ${job.subRole}` : ""}
                  </p>
                  {job.context && (
                    <p className="text-neutral-500 text-sm mt-1">
                      {job.context}
                    </p>
                  )}
                  {job.bullets?.length > 0 && (
                    <ul className="mt-4 space-y-2 list-disc list-inside text-neutral-400 text-sm">
                      {job.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer profile={profile} />
    </div>
  );
}

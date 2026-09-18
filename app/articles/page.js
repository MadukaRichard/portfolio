import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getProfile, getPosts } from "@/lib/getData";

export const revalidate = 0;

export default async function ArticlesPage() {
  const [profile, posts] = await Promise.all([getProfile(), getPosts()]);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav logoName={profile.logoName} />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 pt-16 pb-20">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">
            Articles
          </h1>
          <p className="mt-2 text-neutral-500 text-sm">
            Things I have written.
          </p>

          {posts.length === 0 ? (
            <p className="mt-10 text-neutral-500 text-sm">
              Nothing here yet — add your first post from the admin dashboard.
            </p>
          ) : (
            <ul className="mt-10 space-y-8">
              {posts.map((post) => (
                <li
                  key={post._id}
                  className="border-b border-neutral-900 pb-8 last:border-none"
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
                    <h2 className="text-lg text-neutral-100 font-medium group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-neutral-500 text-sm mt-1">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags?.length > 0 && (
                      <p className="text-xs text-accent/70 mt-3">
                        {post.tags.map((t) => `#${t}`).join(" ")}
                      </p>
                    )}
                  </a>
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

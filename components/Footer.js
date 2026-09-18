import Link from "next/link";

export default function Footer({ profile }) {
  const socialLinks = profile?.socialLinks || [];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800">
      <div className="mx-auto max-w-3xl px-6 py-14 space-y-12">
        {socialLinks.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-neutral-500 mb-4">
              Find me elsewhere
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {profile?.resumeUrl && (
                <li>
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors"
                  >
                    resume/cv
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}

        <div>
          <h2 className="text-sm font-medium text-neutral-500 mb-4">Routes</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <Link href="/" className="text-muted hover:text-accent transition-colors">
                home
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-muted hover:text-accent transition-colors">
                projects
              </Link>
            </li>
            <li>
              <Link href="/articles" className="text-muted hover:text-accent transition-colors">
                articles
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted hover:text-accent transition-colors">
                contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-1 text-xs text-neutral-600 pt-4 border-t border-neutral-900">
          <p>
            © {year} {(profile?.name || "YOUR NAME").toUpperCase()}
          </p>
          {profile?.location && (
            <p>
              {profile.location.toUpperCase()}
              {profile?.utcOffset ? ` · ${profile.utcOffset}` : ""}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Nav({ logoName }) {
  return (
    <header className="border-b border-border/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 sm:px-6 py-5">
        
        <Link
          href="/"
          className=" font-logo text-lg font-semibold tracking-tight text-accent transition-colors shrink-0 mr-4"
        >
          {logoName || "Dhukar"}
        </Link>

        <nav className="flex items-center justify-end gap-2 sm:gap-5 text-sm text-muted">
          
          <Link href="/projects" className="whitespace-nowrap rounded-full border border-border px-3 py-1 text-xs sm:text-sm text-muted transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent">
            /projects
          </Link>
          <Link href="/articles" className="whitespace-nowrap rounded-full border border-border px-3 py-1 text-xs sm:text-sm text-muted transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent">
            /articles
          </Link>
          <Link href="/contact" className="whitespace-nowrap rounded-full border border-border px-3 py-1 text-xs sm:text-sm text-muted transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent">
            /contact
          </Link>
          
        </nav>
      </div>
    </header>
  );
}
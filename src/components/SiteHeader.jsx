import { Terminal, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-350 items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <Link to="/" className="group flex items-center gap-3">
            <span className="flex h-8 w-8 flex-none items-center justify-center border border-primary/60 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Terminal className="" aria-hidden="true" />
            </span>

            <span className="leading-none">
              <span className="block font-heading text-[15px] font-bold tracking-[0.22em] text-foreground">
                SECFORGE
              </span>

              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                SECURITY TOOL INDEX
              </span>
            </span>
          </Link>

          <nav
            aria-label="primary"
            className="hidden items-center gap-8 md:flex">
            <Link
              to="/tools"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground">
              Catalog
            </Link>

            <Link
              to="/"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground">
              Disciplines
            </Link>
          </nav>

          <Link
            to="/tools"
            className="group inline-flex items-center gap-2 border border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground">
            <span className="hidden sm:inline">Browse all</span>

            <span className="sm:hidden">Catalog</span>

            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </header>
    </>
  );
}

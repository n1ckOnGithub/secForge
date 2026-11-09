import { createFileRoute, Link } from "@tanstack/react-router";
import { getCategoryGuide } from "../lib/server-fns";
import { ArrowLeft, Check } from "lucide-react";
import CategoryIcon from "../components/CategoryIcon";

export const Route = createFileRoute("/categories/$categoryId")({
  loader: ({ params }) =>
    getCategoryGuide({ data: { slug: params.categoryId } }),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.category?.name ?? "Guide"} — Arsenal` },
      {
        name: "description",
        content:
          loaderData?.category?.summary ??
          "A practical guide to one discipline in the Arsenal security index.",
      },
    ],
  }),
  component: CategoryPage,
});

const JUMP_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "start", label: "Where to start" },
  { id: "tools", label: "Key tools" },
  { id: "reading", label: "Further reading" },
];

function CategoryPage() {
  const data = Route.useLoaderData();

  if (!data?.category) {
    return (
      <div className="mx-auto max-w-350 px-5 py-24 text-center sm:px-8 lg:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          Not found
        </p>

        <h1 className="mt-4 font-heading text-3xl font-medium tracking-tight text-foreground">
          No guide for that discipline.
        </h1>

        <Link
          to="/"
          hash="disciplines"
          className="mt-8 inline-flex items-center gap-2 border border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:text-primary">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Browse all disciplines
        </Link>
      </div>
    );
  }

  const { category, tools, categories } = data;
  const paragraphs = (category.overview || "").split("\n\n").filter(Boolean);

  const ordered = [...categories].sort(
    (a, b) => (a.index || 0) - (b.index || 0),
  );
  const position = ordered.findIndex((item) => item.slug === category.slug);
  const previous = position > 0 ? ordered[position - 1] : null;
  const next =
    position >= 0 && position < ordered.length - 1
      ? ordered[position + 1]
      : null;

  return (
    <div>
      <div className="tactical-grid border-b border-border">
        <div className="mx-auto max-w-350 px-5 pb-12 pt-10 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-primary">
              Index
            </Link>

            <span aria-hidden="true">/</span>

            <span>Guides</span>

            <span aria-hidden="true">/</span>

            <span className="text-foreground">{category.name}</span>
          </div>

          <div className="mt-6 flex items-start gap-4">
            <span className="mt-2 flex h-10 w-10 flex-none items-center justify-center border border-primary/50 bg-primary/10 text-primary">
              <CategoryIcon icon={category.icon} className="h-5 w-5" />
            </span>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                Discipline {String(category.index).padStart(2, "0")}
              </p>

              <h1 className="mt-3 max-w-3xl font-heading text-[clamp(2rem,5vw,3.6rem)] font-medium leading-none tracking-[-0.03em] text-foreground">
                {category.name}
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {category.summary}
          </p>

          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {tools.length} tools indexed in this discipline
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-350 px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-border bg-card/50 p-5">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                At a glance
              </h2>

              <ul className="mt-4 space-y-3">
                {(category.core_skills || []).map((skill) => (
                  <li
                    key={skill}
                    className="flex gap-2.5 text-sm leading-snug text-muted-foreground">
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 flex-none text-primary"
                      aria-hidden="true"
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <nav className="mt-6 hidden lg:block" aria-label="On this page">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                On this page
              </p>

              <ul className="mt-3 space-y-2">
                {JUMP_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="min-w-0">
            <section id="overview" className="scroll-mt-24">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                Overview
              </h2>

              <div className="mt-5 space-y-5">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="max-w-2xl text-[15px] leading-[1.75] text-muted-foreground sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section id="start" className="mt-14 scroll-mt-24">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                Where to start
              </h2>
              
              <ol className="mt-6 space-y-6">
                {(category.getting_started || []).map((step, index) => (
                  <li key={step} className="flex gap-5">
                    <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center border border-border font-mono text-[10px] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="max-w-2xl text-[15px] leading-[1.75] text-muted-foreground">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
